import { AxiosResponse } from 'axios';
import { Constants, KeyedConfig } from './constants';
import type { Client as BenchlingClient, Components } from './types/benchling';
import { Vivos } from './vivos';

export type Entry = Components.Schemas.Entry;
export type EntryById = Components.Schemas.EntryById;
export type EntrySchema = Components.Schemas.EntrySchema;
export type Field = Components.Schemas.Field;
export type TokenResponse = Components.Schemas.TokenResponse;

export class VivosBenchling extends Vivos {

  public static ENVARS = [
    'BENCHLING_ACCESS_TOKEN',
    'BENCHLING_TENANT',
    'BENCHLING_OUTPUT_BUCKET',
  ];

  private event_bucket: string;
  private event_object: string;

  constructor(event: any, context: any) {
    context.OPEN_API_FILE = Constants.DEFAULTS.BENCHLING_API_FILE;
    super(event, context);
    this.api_key = this.cc.get('BENCHLING_ACCESS_TOKEN');
    this.api_url = `https://${this.cc.get('BENCHLING_TENANT')}.benchling.com/api/v2`;
    this.event_bucket = Constants.GetKeyPathFromObject(event, 'Records[0].s3.bucket.name');
    this.event_object = Constants.GetKeyPathFromObject(event, 'Records[0].s3.object.key');
  }

  public async getBenchlingClient(): Promise<BenchlingClient> {
    const client = await this.api(true).init<BenchlingClient>();
    return client;
  }

  protected tokenType(): string {
    return 'Basic';
  }

  // get an entry by id
  public async getEntry(id: string): Promise<Entry> {
    try {
      const client = await this.getBenchlingClient();
      const response = await client.getEntry(id) as AxiosResponse<EntryById>;
      return response.data.entry!;
    } catch (e: any) {
      console.error(e);
      throw `Failed to retrieve entry ${id}`;
    }
  }

  public async updateEntry(entry: Entry, fields: KeyedConfig): Promise<Entry> {
    const client = await this.getBenchlingClient();
    const updated = await client.updateEntry(entry.id, fields) as AxiosResponse<Entry>;
    return updated.data;
  }

  public toDict() {
    // extend with new properties
    const dict = super.toDict();
    dict.event_bucket = this.event_bucket;
    dict.event_object = this.event_object;
    return dict;
  }
}
