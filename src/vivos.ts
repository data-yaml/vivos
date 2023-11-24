import { readFileSync } from 'fs';
import yaml from 'js-yaml';
import { Document, OpenAPIClientAxios } from 'openapi-client-axios';
import Constants from './constants';

type KeyedConfig = {
  [key: string]: any;
};

export class Vivos {

  public static loadConfig(filePath: string): KeyedConfig {
    const fileData = readFileSync(filePath, 'utf-8');
    const fileExtension = filePath.split('.').pop()?.toLowerCase();

    if (fileExtension === 'yaml' || fileExtension === 'yml') {
      return yaml.load(fileData) as KeyedConfig;
    } else if (fileExtension === 'json') {
      return JSON.parse(fileData);
    } else {
      throw new Error(`Unsupported file extension: ${fileExtension}`);
    }
  }

  private event: any;
  private cc: Constants;
  private api_file: string;
  public api: OpenAPIClientAxios;

  constructor(event: any, context: any) {
    this.event = event;
    this.cc = new Constants(context);
    this.api_file = this.cc.get('OPEN_API_FILE');
    if (!this.api_file) {
      throw new Error('OPEN_API_FILE not provided');
    }
    this.api = this.loadApi(this.api_file);
  }

  public get(key: string): any {
    return this.cc.get(key);
  }

  public loadApi(filename: string): OpenAPIClientAxios {
    const yaml_doc = Vivos.loadConfig(filename) as Document;
    const api = new OpenAPIClientAxios({
      definition: yaml_doc,
    });
    return api;
  }

  public toDict(): any {
    return {
      event: this.event,
      context: this.cc,
      api_file: this.api_file,
      api: this.api,
    };
  }

  public toString(): string {
    return JSON.stringify(this.toDict(), null, 2);
  }
}
