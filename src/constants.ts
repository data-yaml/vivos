import 'dotenv/config';

export type KeyedConfig = {
  [key: string]: any;
};

export class Constants {

  public static DEFAULTS: { [key: string]: any } = {
    APP_NAME: 'vivos',
    BENCHLING_API_FILE: 'benchling.yaml',
    BENCHLING_API_URL: 'https://quilt-dtt.benchling.com/api/v2',
    TOWER_INPUT_FILE: 'entry.json',
    TOWER_OUTPUT_FILE: 'nf-quilt/params.json',
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

  public static GetKeyPathFromObject(object: KeyedConfig, keyPath: string): any {
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

  public context: any;

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

}

export default Constants;
