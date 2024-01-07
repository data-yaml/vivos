import { Pipe } from './pipe';

export class PipeQuilt extends Pipe {
  public static getPrefix(): string {
    return 'quilt';
  }

  constructor(event: any, context: any) {
    super(event, context);
    // ensure event contains a config file
  }
}
