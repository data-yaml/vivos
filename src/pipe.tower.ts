import { Pipe } from './pipe';

export class PipeTower extends Pipe {
  public static getPrefix(): string {
    return 'tower';
  }

  constructor(event: any, context: any) {
    super(event, context);
    // ensure event contains a config file
  }
}
