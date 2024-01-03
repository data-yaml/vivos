import { Pipe } from './pipe';
import { PipeOmics } from './pipe.omics';
import { PipeQuilt } from './pipe.quilt';
import { PipeTower } from './pipe.tower';

function getSubclass(pipe: Pipe) {
  const subclass = pipe.findPrefix();
  switch (subclass) {
    case 'omics':
      return PipeOmics;
    case 'quilt':
      return PipeQuilt;
    case 'tower':
      return PipeTower;
  }
  throw new Error('No subclass found');
}
export async function handler(event: any, context: any) {
  const pipe = new Pipe(event, context);
  const subclass = getSubclass(pipe);
  const child = new subclass(event, context);
  await child.exec();
}
