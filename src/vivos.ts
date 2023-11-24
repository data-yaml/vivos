import { readFileSync } from 'fs';
//import axios, { AxiosResponse } from 'axios';
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

  constructor(event: any, context: any) {
    this.event = event;
    this.cc = new Constants(context);
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

  public toString(): string {
    const vars = {
      event: this.event,
      context: this.cc,
    };
    return JSON.stringify(vars);
  }
}
