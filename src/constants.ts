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
    BENCHLING_API_URL: 'https://quilt-dtt.benchling.com/api/v2',
    PETSTORE_API_FILE: './api/petstore.yaml',
    PETSTORE_API_URL: 'https://petstore.swagger.io/v2',
    TEST_ENTRY_FILE: './test/data/entry.json',
    TOWER_API_FILE: './api/tower.yaml',
    TOWER_API_URL: 'https://api.tower.nf',
    TOWER_DEFAULT_PIPELINE: 'quiltdata/nf-quilt',
    TOWER_INPUT_FILE: 'entry.json',
    TOWER_OUTPUT_FILE: 'nf-quilt/params.json',
    TOWER_REPORT_FILE: 'multiqc/multiqc_report.html',
    VIVOS_CONFIG_FILE: './test/data/vivos.json',
  };

  public static MapEnvars(envars: string[]): KeyedConfig {
    const cc = new Constants({});
    const envs: KeyedConfig = {};
    envars.forEach((key: string) => {
      envs[key] = cc.get(key);
    });
    return envs;
  }

  public static GetPackageName(filePath: string): string {
    // first two components, joined by a slash
    const base = filePath.startsWith('/') ? 1 : 0;
    const components = filePath.split('/').slice(base, base+2);
    return components.join('/');
  }

  public static async LoadObjectURI(uri: string, env: object = {}): Promise<KeyedConfig> {
    const split = uri.split('://');
    const scheme = split[0];
    if (!scheme || scheme === '' || scheme === 'file') {
      return Constants.LoadObjectFile(uri, env);
    }
    if (scheme !== 's3') {
      throw new Error(`Unsupported scheme: ${scheme}`);
    }
    const paths = split[1].split('/');
    const s3 = new S3();
    const bucket = paths[0];
    const file = paths.slice(-1)[0];
    const key = paths.slice(1).join('/');
    console.info(`Loading ${file} from ${bucket} in ${key}`);
    const params = {
      Bucket: bucket,
      Key: key,
    };
    const data = await s3.getObject(params).promise();
    const extension = file.split('.').pop()?.toLowerCase();
    return Constants.LoadObjectData(data.Body!.toString(), extension!, env);
  }

  public static LoadObjectFile(filePath: string, env: object = {}): KeyedConfig {
    var fileData = readFileSync(filePath, 'utf-8');
    const fileExtension = filePath.split('.').pop()?.toLowerCase();
    return Constants.LoadObjectData(fileData, fileExtension!, env);
  }

  public static LoadObjectData(data: string, extension: string, env: object = {}): KeyedConfig {
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

  public static LoadPipeline(pipeline: string, env: any = {}) {
    if (typeof env.package !== 'string' || env.package === '') {
      env.package = pipeline;
    }
    const paramsFile = `./config/${pipeline}/params.json`;
    const launchFile = `./config/${pipeline}/launch.json`;
    const params = Constants.LoadObjectFile(paramsFile, env);
    const launch = Constants.LoadObjectFile(launchFile, env);
    launch.paramsText = JSON.stringify(params);
    return launch;
  }

  public static GetKeyPathFromObject(object: any, keyPath: string): any {
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

  public static GetKeyPathFromFile(filePath: string, keyPath: string): any {
    try {
      const object = Constants.LoadObjectFile(filePath);
      return Constants.GetKeyPathFromObject(object, keyPath);
    } catch (e: any) {
      console.error(e.message);
      return undefined;
    }
  }

  private context: any;

  constructor(context: any) {
    this.context = context;
    this.updateContext(process.env);
    this.updateContext(Constants.DEFAULTS);
  }

  public updateContext(envs: KeyedConfig) {
    Object.keys(envs).forEach(env => {
      if (this.context[env] === undefined) {
        // console.debug(`Setting ${env} to ${envs[env]}`)
        this.context[env] = envs[env];
      }
    });
  }

  // get checks context, then process.env, then DEFAULT_CONFIG
  public get(key: string): any {
    return this.context[key];
  }

  public has(key: string): boolean {
    return this.get(key) !== undefined;
  }

  public put(key: string, value: any): void {
    this.context[key] = value;
  }

  public defaultProps(): KeyedConfig {
    return {
      account: this.get('CDK_DEFAULT_ACCOUNT'),
      region: this.get('CDK_DEFAULT_REGION'),
      email: this.get('CDK_DEFAULT_EMAIL'),
    };
  }
}

export default Constants;
