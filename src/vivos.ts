import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { Document, OpenAPIClientAxios, OpenAPIClient } from 'openapi-client-axios';
import { Constants } from './constants';

export class Vivos {

  public static ENVARS = [
    'OPEN_API_FILE',
    'OPEN_API_KEY',
    'OPEN_API_URL',
    'STATUS_TOPIC_ARN',
  ];

  protected event: any;
  protected cc: Constants;
  protected api_file: string;
  protected api_key: string;
  protected api_url: string;
  protected sns_client: SNSClient;
  private _api: OpenAPIClientAxios | undefined;

  constructor(event: any, context: any) {
    this.event = event;
    this.cc = new Constants(context);
    this._api = undefined;
    this.api_file = this.get('OPEN_API_FILE');
    this.api_key = this.cc.get('OPEN_API_KEY');
    this.api_url = this.cc.get('OPEN_API_URL');
    this.sns_client = new SNSClient({});
  }

  public api(reset: boolean = false): OpenAPIClientAxios {
    if (reset || this._api === undefined) {
      this._api = this.loadApi(this.api_file);
    }
    return this._api;
  }

  public client(): Promise<OpenAPIClient> {
    return this.api().getClient();
  }

  // log message to STATUS_TOPIC_ARN if defined
  public async log(message: string): Promise<void> {
    if (typeof message !== 'string' || message === '') {
      return;
    }
    console.debug(`log[${message}]`);
    const topic_arn = this.cc.get('STATUS_TOPIC_ARN');
    if (typeof topic_arn !== 'string' || topic_arn === '') {
      return;
    }
    const params = {
      Message: message,
      TopicArn: topic_arn,
    };
    const command = new PublishCommand(params);
    await this.sns_client.send(command);
  }

  public get(key: string): string {
    const value = this.cc.get(key);
    if (typeof value !== 'string' || value === '') {
      throw new Error(`get[${key}] not a valid string: ${value}`);
    }
    return value;
  }

  protected tokenType(): string {
    return 'Bearer';
  }

  public loadApi(filename: string): OpenAPIClientAxios {
    const yaml_doc = Constants.LoadObjectFile(filename) as Document;
    let options = {
      definition: yaml_doc,
      axiosConfigDefaults: {},
    };
    if (typeof this.api_key === 'string') {
      options.axiosConfigDefaults= {
        withCredentials: true,
        headers: {
          Authorization: `${this.tokenType()} ${this.api_key}`,
        },
      };
    }
    if (typeof this.api_url !== 'string') {
      return new OpenAPIClientAxios(options);
    } else {
      const server = {
        ...options,
        withServer: { url: this.api_url, description: `OPEN_API_URL for ${filename}` },
      };
      return new OpenAPIClientAxios(server);
    }
  }

  public async api_post(path: string, params: any): Promise<any> {
    const client = await this.client();
    try {
      const response = await client.post(path, params);
      return response;
    } catch (e: any) {
      console.error(this, e);
      throw `Failed to invoke POST ${path} with ${params}`;
    }
  }

  public async api_get(path: string): Promise<any> {
    const client = await this.client();
    try {
      const response = await client.get(path);
      return response;
    } catch (e: any) {
      console.error(this, e);
      throw `Failed to invoke GET ${path}`;
    }
  }

  public toDict(): any {
    return {
      event: this.event,
      api_file: this.api_file,
      api_key: this.api_key,
      api_url: this.api_url,
      api: this._api,
    };
  }

  public toString(): string {
    return JSON.stringify(this.toDict(), null, 2);
  }
}
