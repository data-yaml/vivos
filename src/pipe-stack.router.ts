import { Pipe } from './pipe';
import { PipeOmics } from './pipe.omics';
import { PipeQuilt } from './pipe.quilt';
import { PipeTower } from './pipe.tower';

export const PIPE_CLASSES = [PipeOmics, PipeQuilt, PipeTower, Pipe];

export function getSubclass(prefix: string) {
  for (const cls of PIPE_CLASSES) {
    if (cls.getPrefix() === prefix) {
      return cls;
    }
  }
  return undefined;
}

export async function handler(event: any, context: any) {
  const pipe = new Pipe(event, context);
  const subclass = getSubclass(pipe.findPrefix());
  if (!subclass) {
    return {
      status: 'error',
      message: `No subclass found for ${pipe.findPrefix()}`,
    };
  }
  const child: Pipe = new subclass(event, context);
  return child.exec();
}
