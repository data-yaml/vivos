import Constants, { KeyedConfig } from '../src/constants';
import { UPath } from '../src/upath';

const TEST_CONSTANTS = {
  TEST_BUCKET: 'quilt-demos',
  TEST_KEY: 'test/data/test.pipe.json',
  TEST_EVENT: 'test/data/test.event.json',
  TEST_REGION: 'us-east-1',
  TEST_URI: 's3://quilt-example/akarve/vega-stocks/direct.json',
};

class Helpers extends Constants {
  public s3_upath(): UPath {
    return UPath.FromURI(this.pipe_uri_s3());
  }

  public local_upath(): UPath {
    return UPath.FromURI(this.pipe_uri_local());
  }

  public pipe_uri_s3(): string {
    return `s3://${this.get('TEST_BUCKET')}/${this.get('TEST_KEY')}`;
  }

  public pipe_uri_local(): string {
    return `file://${process.cwd()}/${this.get('TEST_KEY')}`;
  }

  public event_uri_local(): string {
    return `file://${process.cwd()}/${this.get('TEST_EVENT')}`;
  }

  public async event_load(bucket: string): Promise<KeyedConfig> {
    const env = {
      TEST_BUCKET: bucket,
      TEST_KEY: this.get('TEST_KEY'),
    };
    const region = this.get('TEST_REGION');
    return UPath.FromURI(this.event_uri_local(), env).parse(region);
  }

  public async event_data_s3(): Promise<KeyedConfig> {
    return this.event_load(this.get('TEST_BUCKET'));
  }

  public async event_data_local(): Promise<KeyedConfig> {
    return this.event_load('');
  }
}

export const helpers = new Helpers(TEST_CONSTANTS);
export module IT {
  export const has = (key: string) => helpers.has(key);
  export const ifis = (condition: boolean) => condition ? it : it.skip;
  export const ifhas = (key: string) => ifis(helpers.has(key));
}
