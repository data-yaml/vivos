/// Parent class for all pipes
/// Pipes are triggered by a file being uploaded to S3
/// and end by writing a sentinel file (to prevent re-running)
/// (including for non-retriable errors)

// TODO: implement "test" pipe that just writes a sentinel file

import { KeyedConfig } from './constants';
import { Vivos } from './vivos';

export class Pipe extends Vivos {
  public static getPrefix(): string {
    return 'test';
  }

  public event_sentinel: string;

  constructor(event: any, context: any) {
    super(event, context);
    this.event_sentinel = Vivos.getStem(this.event_object) + '.md';
  }

  public findPrefix(): string {
    const parts = this.event_object.split('/');
    const filename = parts[parts.length - 1];
    const prefix = filename.split('.')[0];
    return prefix;
  }

  public async sentinel_newer(): Promise<boolean> {
    return false;
  }

  public async write_sentinel(output: string): Promise<void> {
    console.log(output);
    return;
  }

  public async exec(): Promise<any> {
    if (await this.sentinel_newer()) {
      return {
        status: 'ignore',
        message: 'Sentinel file newer than event file',
      };
    }
    const input = this.getEventObject();
    const output = await this.run(input);
    await this.write_sentinel(output);
    return { status: 'success' };
  }

  public async run(input: KeyedConfig): Promise<string> {
    return input.toString();
  }
}
