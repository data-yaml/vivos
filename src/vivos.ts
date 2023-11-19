import fs from 'fs';
import axios, { AxiosResponse } from 'axios';
import Constants from './constants';

export class Vivos {
  private event: any;
  private cc: Constants;
  private vivos: { [key: string]: any };

  constructor(event: any, context: any) {
    this.event = event;
    this.cc = new Constants(context);
    this.vivos = this.loadVivosConfig();
  }

  public loadVivosConfig(): { [key: string]: any } {
    const configFilePath = this.cc.get('VIVOS_CONFIG_FILE');
    if (configFilePath === undefined) {
      throw new Error('VIVOS_CONFIG_FILE environment variable is not set');
    }
    const configData = fs.readFileSync(configFilePath, 'utf-8');
    const config = JSON.parse(configData);
    return config;
  }

  public async call(key: string): Promise<AxiosResponse> {
    if (this.vivos[key]) {
      const project: any = this.vivos[key];
      const response = await axios.post(project.url, project.data);
      return response;
    }
    throw new Error(`Project ${key} not found in VIVOS config`);
  }

  public toString(): string {
    const vars = {
      event: this.event,
      context: this.cc,
    };
    return JSON.stringify(vars);
  }
}
