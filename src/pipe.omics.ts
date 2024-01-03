import { Pipe } from './pipe';

export class PipeOmics extends Pipe {
  public static getPrefix(): string {
    return 'omics';
  }

  constructor(event: any, context: any) {
    super(event, context);
    // ensure event contains a config file
  }
}
