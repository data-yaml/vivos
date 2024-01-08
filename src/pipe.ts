/// Parent class for all pipes
/// Pipes are triggered by a file being uploaded to S3
/// and end by writing a sentinel file (to prevent re-running)
/// (including for non-retriable errors)

import { KeyedConfig } from './constants';
import { UPath } from './upath';
import { Vivos } from './vivos';

export class Pipe extends Vivos {

  public static ENV_DEFAULTS = {
    VIVOS_CONFIG_STEM: 'pipe',
    VIVOS_CONFIG_SUFFIXES: 'json,yaml,yml',
    VIVOS_VPC: 'sales-production',
    VIVOS_BATCH_SIZE: '1',
  };

  public static ENV_KEYS(): string[] {
    return Object.keys(Pipe.ENV_DEFAULTS);
  }

  public static getPrefix(): string {
    return 'test';
  }

  public event_sentinel: UPath;

  constructor(event: any, context: any) {
    super(event, context);
    this.event_sentinel = this.event_path.replaceExtension('md');
  }

  public env_defaults(): KeyedConfig {
    return Pipe.ENV_DEFAULTS;
  }

  public findPrefix(): string {
    const parts = this.event_object.split('/');
    const filename = parts[parts.length - 1];
    const prefix = filename.split('.')[0];
    return prefix;
  }

  public async sentinel_newer(): Promise<boolean> {
    try {
      const event_attr = await this.event_path.getAttributes();
      const sentinel_attr = await this.event_sentinel.getAttributes();
      if (sentinel_attr.LastModified > event_attr.LastModified) {
        return true;
      }
    } catch (error) {
      console.warn(`File(s) not found: ${this.event_sentinel} < ${this.event_path}`);
    }
    return false;
  }

  public async write_sentinel(output: string): Promise<void> {
    await this.event_sentinel.save(output);
    return;
  }

  public async exec(): Promise<any> {
    if (await this.sentinel_newer()) {
      return {
        status: 'ignore',
        message: 'Sentinel file newer than event file',
      };
    }
    const input: KeyedConfig = this.getEventObject();
    this.cc.updateContext(input);
    
    const output = await this.run(input);
    await this.write_sentinel(output);
    return { status: 'success' };
  }

  public async run(input: KeyedConfig): Promise<string> {
    return input.toString();
  }
}
