import 'dotenv/config';
import { readFileSync } from 'fs';
import { S3 } from 'aws-sdk';
import handlebars from 'handlebars';
import yaml from 'js-yaml';

export type KeyedConfig = {
  [key: string]: any;
};

export class Constants {

  public static DEFAULTS: { [key: string]: any } = {
    APP_NAME: 'vivos',
    BENCHLING_API_FILE: './api/benchling.yaml',
    PETSTORE_API_FILE: './api/petstore.yaml',
    PETSTORE_API_URL: 'https://petstore.swagger.io/v2',
    TEST_ENTRY_FILE: './test/data/entry.json',
    TOWER_API_FILE: './api/tower.yaml',
    TOWER_API_URL: 'https://api.tower.nf',
    TOWER_TEST_PIPELINE: 'quiltdata/nf-quilt',
    TOWER_INPUT_PREFIX: '.quilt/named_packages/benchling/',
    VIVOS_CONFIG_FILE: './test/data/vivos.json',
  };


  public static async loadObjectURI(uri: string, env: object = {}): Promise<KeyedConfig> {
    const split = uri.split('://');
    const scheme = split[0];
    if (!scheme || scheme === '' || scheme === 'file') {
      return Constants.loadObjectFile(uri, env);
    }
    if (scheme !== 's3') {
      throw new Error(`Unsupported scheme: ${scheme}`);
    }
    const paths = split[1].split('/');
    const s3 = new S3();
    const bucket = paths[0];
    const file = paths.slice(-1)[0];
    const key = paths.slice(1).join('/');
    console.log(`Loading ${file} from ${bucket} in ${key}`);
    const params = {
      Bucket: bucket,
      Key: key,
    };
    const data = await s3.getObject(params).promise();
    const extension = file.split('.').pop()?.toLowerCase();
    return Constants.loadObjectData(data.Body!.toString(), extension!, env);
  }

  public static loadObjectFile(filePath: string, env: object = {}): KeyedConfig {
    var fileData = readFileSync(filePath, 'utf-8');
    const fileExtension = filePath.split('.').pop()?.toLowerCase();
    return Constants.loadObjectData(fileData, fileExtension!, env);
  }

  public static loadObjectData(data: string, extension: string, env: object = {}): KeyedConfig {
    if (Object.keys(env).length > 0) {
      const template = handlebars.compile(data);
      data = template(env);
    }

    if (extension === 'yaml' || extension === 'yml') {
      return yaml.load(data) as KeyedConfig;
    } else if (extension === 'json') {
      return JSON.parse(data);
    } else {
      throw new Error(`Unsupported file extension: ${extension}`);
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

  public defaultProps() : KeyedConfig {
    return {
      account: this.get('CDK_DEFAULT_ACCOUNT'),
      region: this.get('CDK_DEFAULT_REGION'),
      email: this.get('CDK_DEFAULT_EMAIL'),
    };
  }
  public getKeyPathFromObject(object: any, keyPath: string): any {
    const keys = keyPath.split('.');
    let value = object;
    for (const key of keys) {
      value = value[key];
      if (value === undefined) {
        return undefined;
      }
    }
    return value;
  }

  public getKeyPathFromFile(filePath: string, keyPath: string): any {
    try {
      const object = Constants.loadObjectFile(filePath);
      return this.getKeyPathFromObject(object, keyPath);
    } catch (e: any) {
      console.error(e);
      return undefined;
    }
  }
}

export default Constants;
