import 'dotenv/config';
import { readFileSync } from 'fs';
import handlebars from 'handlebars';
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

  public static loadObjectFile(filePath: string, env: object = {}): KeyedConfig {
    var fileData = readFileSync(filePath, 'utf-8');

    if (Object.keys(env).length > 0) {
      const template = handlebars.compile(fileData);
      fileData = template(env);
    }

    const fileExtension = filePath.split('.').pop()?.toLowerCase();
    if (fileExtension === 'yaml' || fileExtension === 'yml') {
      return yaml.load(fileData) as KeyedConfig;
    } else if (fileExtension === 'json') {
      return JSON.parse(fileData);
    } else {
      throw new Error(`Unsupported file extension: ${fileExtension}`);
    }
  }

  public static loadPipeline(pipeline: string, env: any = {}) {
    if (typeof env.package !== 'string' || env.package === '') {
      env.package = pipeline;
    }
    const paramsFile = `./config/${pipeline}/params.json`;
    const launchFile = `./config/${pipeline}/launch.json`;
    const params = Constants.loadObjectFile(paramsFile, env);
    const launch = Constants.loadObjectFile(launchFile, env);
    launch.paramsText = JSON.stringify(params);
    return launch;
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
