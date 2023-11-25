import 'dotenv/config';

export class Constants {
  public static DEFAULTS: { [key: string]: any } = {
    VIVOS_CONFIG_FILE: './test/data/vivos.json',
    PETSTORE_API_FILE: './api/petstore.yaml',
    TOWER_API_FILE: './api/tower.yaml',
    BENCHLING_API_FILE: './api/benchling.yaml',
    TOWER_API_URL: 'https://api.tower.nf',
    PETSTORE_API_URL: 'https://petstore.swagger.io/v2',
  };

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
