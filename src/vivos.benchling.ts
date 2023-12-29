import { AxiosResponse } from 'axios';
import { Constants, KeyedConfig } from './constants';
import type { Client as BenchlingClient, Components } from './types/benchling';
import { Vivos } from './vivos';

export type Entry = Components.Schemas.Entry;
export type EntryById = Components.Schemas.EntryById;
export type EntrySchema = Components.Schemas.EntrySchema;
export type EntryUpdate = Components.Schemas.EntryUpdate;
export type Field = Components.Schemas.Field;
export type TokenResponse = Components.Schemas.TokenResponse;
export type KeyedFields = { [name: string]: Field };

export class VivosBenchling extends Vivos {

  public static ENVARS = [
    'BENCHLING_ACCESS_TOKEN',
    'BENCHLING_TENANT',
    'BENCHLING_OUTPUT_BUCKET',
    'QUILT_CATALOG_DOMAIN',
  ];

  public static readonly FLD_TOWER_URL = 'Tower URL';
  public static readonly FLD_STATUS = 'Status';
  public static readonly FLD_MULTIQC = 'MultiQC Report';

  constructor(event: any, context: any) {
    context.OPEN_API_FILE = Constants.DEFAULTS.BENCHLING_API_FILE;
    super(event, context);
    this.api_key = this.get('BENCHLING_ACCESS_TOKEN');
    this.api_url = `https://${this.get('BENCHLING_TENANT')}.benchling.com/api/v2`;
  }

  public async getBenchlingClient(): Promise<BenchlingClient> {
    const this_api = await this.api(true);
    const client = this_api.init<BenchlingClient>();
    return client;
  }

  public async getEventParams(): Promise<KeyedConfig> {
    if (this.event_object && this.event_object.includes(this.get('TOWER_OUTPUT_FILE'))) {
      return this.getEventObject();
    }
    throw `gegetEventParamstParams not found in: ${this.event_object}`;
  }

  public getReportURL(): string {
    const catalog = `https://${this.get('QUILT_CATALOG_DOMAIN')}`;
    const pkg = Constants.GetPackageName(this.event_object);
    return `${catalog}/b/${this.event_bucket}/packages/${pkg}/latest/tree/${this.get('TOWER_REPORT_FILE')}`;
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

  public mapFields(fields: KeyedConfig): KeyedFields {
    const values: KeyedFields = {};
    for (const key in fields) {
      const value = fields[key];
      const item = { value: value } as Field;
      values[key] = item;
    }
    return values;
  }

  public async updateEntry(entry_id: string, fields: KeyedConfig): Promise<Entry> {
    try {
      const client = await this.getBenchlingClient();
      const update: EntryUpdate = { fields: this.mapFields(fields) };
      const updated = await client.updateEntry(entry_id, update) as AxiosResponse<Entry>;
      return updated.data;
    } catch (e: any) {
      console.error(e);
      throw `Failed to update entry ${entry_id}`;
    }
  }

  public toDict() {
    // extend with new properties
    const dict = super.toDict();
    dict.event_bucket = this.event_bucket;
    dict.event_object = this.event_object;
    return dict;
  }
}
