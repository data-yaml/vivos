import { readFileSync } from 'fs';
import yaml from 'js-yaml';
import { Document, OpenAPIClientAxios } from 'openapi-client-axios';
import Constants from './constants';

type KeyedConfig = {
  [key: string]: any;
};

export class Vivos {

  public static env = [
    'OPEN_API_FILE',
    'OPEN_API_KEY',
    'OPEN_API_URL',
  ];

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
  private api_key: string;
  private api_url: string;
  public api: OpenAPIClientAxios;

  constructor(event: any, context: any) {
    this.event = event;
    this.cc = new Constants(context);
    this.api_file = this.get('OPEN_API_FILE');
    this.api_key = this.cc.get('OPEN_API_KEY');
    this.api_url = this.cc.get('OPEN_API_URL');
    this.api = this.loadApi(this.api_file);
  }

  public get(key: string): string {
    const value = this.cc.get(key);
    if (typeof value !== 'string' || value === '') {
      throw new Error(`get[${key}] not a valid string: ${value}`);
    }
    return value;
  }

  public loadApi(filename: string): OpenAPIClientAxios {
    const yaml_doc = Vivos.loadConfig(filename) as Document;
    let options = {
      definition: yaml_doc,
      axiosConfigDefaults: {},
    };
    if (typeof this.api_key !== 'string') {
      options.axiosConfigDefaults= {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${this.api_key}`,
        },
      };
    }
    if (typeof this.api_url !== 'string') {
      return new OpenAPIClientAxios(options);
    } else {
      const server = {
        ...options,
        withServer: { url: this.api_url, description: `OPEN_API_URL for ${filename}` },
      };
      return new OpenAPIClientAxios(server);
    }
  }

  public async api_post(path: string, params: any): Promise<any> {
    const client = await this.api.getClient();
    try {
      const response = await client.post(path, params);
      return response;
    } catch (e) {
      console.log(this, e);
      throw `Failed to invoke POST ${path} with ${params}`;
    }
  }

  public async api_get(path: string): Promise<any> {
    const client = await this.api.getClient();
    try {
      const response = await client.get(path);
      return response;
    } catch (e) {
      console.log(this, e);
      throw `Failed to invoke GET ${path}`;
    }
  }

  public toDict(): any {
    return {
      event: this.event,
      api_file: this.api_file,
      api_key: this.api_key,
      api_url: this.api_url,
      api: this.api,
    };
  }

  public toString(): string {
    return JSON.stringify(this.toDict(), null, 2);
  }
}
