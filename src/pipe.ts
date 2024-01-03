import { Vivos } from './vivos';

export class Pipe extends Vivos {
  public static getPrefix(): string {
    return 'test';
  }

  constructor(event: any, context: any) {
    super(event, context);
  }


}
