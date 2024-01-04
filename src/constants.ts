import 'dotenv/config';
import { UPath } from './upath';

export type KeyedConfig = {
  [key: string]: any;
};

const TEST_BUCKET = 'quilt-demos';
const TEST_OBJECT = 'vivos/test.pipe.json';
export class Constants {

  public static DEFAULTS: { [key: string]: any } = {
    APP_NAME: 'vivos',
    BASE_API: `s3://${TEST_BUCKET}/api`,
    BASE_CONFIG: `s3://${TEST_BUCKET}/config`,
    BENCHLING_API_FILE: 'benchling.yaml',
    BENCHLING_API_URL: 'https://quilt-dtt.benchling.com/api/v2',
    PETSTORE_API_FILE: 'petstore.yaml',
    PETSTORE_API_URL: 'https://petstore.swagger.io/v2',
    TEST_BUCKET: TEST_BUCKET,
    TEST_ENTRY_FILE: './test/data/PutObject.json',
    TEST_OBJECT: TEST_OBJECT,
    TOWER_API_FILE: 'tower.yaml',
    TOWER_API_URL: 'https://api.tower.nf',
    TOWER_DEFAULT_PIPELINE: 'quiltdata/nf-quilt',
    TOWER_INPUT_FILE: 'entry.json',
    TOWER_OUTPUT_FILE: 'nf-quilt/params.json',
    TOWER_REPORT_FILE: 'multiqc/multiqc_report.html',
    VIVOS_CONFIG_STEM: 'pipe',
  };

  public static GET(key: string): any {
    const cc = new Constants({});
    return cc.get(key);
  }

  public static MapEnvars(envars: string[]): KeyedConfig {
    const envs: KeyedConfig = {};
    envars.forEach((key: string) => {
      envs[key] = Constants.GET(key);
    });
    return envs;
  }

  public static GetPackageName(filePath: string): string {
    // first two components, joined by a slash
    const base = filePath.startsWith('/') ? 1 : 0;
    const components = filePath.split('/').slice(base, base+2);
    return components.join('/');
  }

  public static async LoadPipeline(pipeline: string, env: any = {}) {
    var base = './config';
    if (typeof env.package !== 'string' || env.package === '') {
      env.package = pipeline;
    }
    if (typeof env.base_config === 'string' && env.base_config !== '') {
      base = env.base_config;
    }
    const paramsFile = `${base}/${pipeline}/params.json`;
    const launchFile = `${base}/${pipeline}/launch.json`;
    const params = await UPath.LoadObjectURI(paramsFile, env);
    const launch = await UPath.LoadObjectURI(launchFile, env);
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
      const object = UPath.LoadObjectFile(filePath);
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
