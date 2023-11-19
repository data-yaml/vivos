import 'dotenv/config';

class Constants {
  private context: any;

  public DEFAULTS: { [key: string]: any } = {
    VIVOS_CONFIG_FILE: './test/data/vivos.json',
  };

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
    if (this.DEFAULTS[key]) {
      return this.DEFAULTS[key];
    }
    return undefined;
  }
}

export default Constants;
