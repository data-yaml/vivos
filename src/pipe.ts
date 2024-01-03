import { Vivos } from './vivos';

export class Pipe extends Vivos {
  public static getPrefix(): string {
    return 'test';
  }

  constructor(event: any, context: any) {
    super(event, context);
  }

  public findPrefix(): string {
    const parts = this.event_object.split('/');
    const filename = parts[parts.length - 1];
    const prefix = filename.split('.')[0];
    return prefix;
  }

  public async sentinel_newer(): Promise<boolean> {
    throw new Error('Not implemented');
  }

  public async write_sentinel(): Promise<void> {
    throw new Error('Not implemented');
  }

  public async exec(): Promise<any> {
    if (await this.sentinel_newer()) {
      console.error('Sentinel is newer');
      return;
    }
    await this.run();
    await this.write_sentinel();
  }

  public async run(): Promise<any> {
    throw new Error('Not implemented');
  }
}
