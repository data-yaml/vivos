import 'dotenv/config';
import { readFileSync } from 'fs';
import yaml from 'js-yaml';

export type KeyedConfig = {
  [key: string]: any;
};

export class Constants {

  public static DEFAULTS: { [key: string]: any } = {
    BENCHLING_API_FILE: './api/benchling.yaml',
    PETSTORE_API_FILE: './api/petstore.yaml',
    PETSTORE_API_URL: 'https://petstore.swagger.io/v2',
    TOWER_API_FILE: './api/tower.yaml',
    TOWER_API_URL: 'https://api.tower.nf',
    TOWER_TEST_PIPELINE: 'quiltdata/nf-quilt',
    VIVOS_CONFIG_FILE: './test/data/vivos.json',
  };

  public static loadObjectFile(filePath: string): KeyedConfig {
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

  private context: any;

  constructor(context: any) {
    this.context = context;
  }

  // get checks context, then process.env, then DEFAULT_CONFIG
  public get(key: string): any {
    if (this.context[key]) {
      return this.context[key];
    }
    if (process.env[key]) {
      return process.env[key];
    }
    if (Constants.DEFAULTS[key]) {
      return Constants.DEFAULTS[key];
    }
    return undefined;
  }

  public put(key: string, value: any): void {
    this.context[key] = value;
  }
}

export default Constants;
