import { readFileSync } from 'fs';
import { GetObjectCommand, S3Client, GetObjectAttributesCommand, GetObjectAttributesRequest } from '@aws-sdk/client-s3';
import handlebars from 'handlebars';
import yaml from 'js-yaml';
import { Constants, KeyedConfig } from './constants';


export class UPath {
  public static DefaultS3(region: string = '') {
    if (region === '') {
      region = Constants.GET('AWS_DEFAULT_REGION');
    }
    const s3 = new S3Client({ region: region });
    return s3;
  }

  public static FromURI(uri: string, env: object = {}): UPath {
    const split = uri.split('://');
    const scheme = split[0];
    if (scheme === 'file') {
      return new UPath(split[1], '', scheme, env);
    }
    if (scheme === 's3') {
      const paths = split[1].split('/');
      const bucket = paths[0];
      const key = paths.slice(1).join('/');
      return new UPath(key, bucket, scheme, env);
    }
    if (!scheme || scheme === '' || scheme[0] === '/' || scheme[0] == '.') {
      return new UPath(scheme, '', 'file', env);
    }
    throw new Error(`Unsupported scheme: ${scheme}`);
  }

  public static async LoadObjectURI(uri: string, env: object = {}): Promise<KeyedConfig> {
    const upath = UPath.FromURI(uri, env);
    return upath.parse();
  }

  public static LoadObjectFile(filePath: string, env: object = {}): KeyedConfig {
    var fileData = readFileSync(filePath, 'utf-8');
    const fileExtension = filePath.split('.').pop()?.toLowerCase();
    return UPath.LoadObjectData(fileData, fileExtension!, env);
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

  readonly scheme: string;
  readonly bucket: string;
  readonly key: string;
  readonly params: object;

  constructor(key: string, bucket = '', scheme='file', params={}) {
    this.scheme = scheme;
    this.bucket = bucket;
    this.key = key;
    this.params = params;
  }

  public extension(): string {
    const split = this.key.split('.');
    return split.slice(-1)[0];
  }

  public async load(region = ''): Promise<string> {
    if (this.scheme === 's3') {
      return this.loadS3(region);
    } else if (this.scheme === 'file') {
      return this.loadLocal();
    } else {
      throw new Error(`Unsupported scheme: ${this.scheme}`);
    }
  }

  public async parse(region = ''): Promise<KeyedConfig> {
    const contents = await this.load(region);
    return UPath.LoadObjectData(contents, this.extension(), this.params);
  }

  public async loadS3(region = ''): Promise<string> {
    const s3 = UPath.DefaultS3(region);
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: this.key,
    });
    const response = await s3.send(command);
    const contents = await response.Body!.transformToString();
    return contents;
  }

  public async loadLocal(): Promise<string> {
    const contents = readFileSync(this.key, 'utf-8');
    return contents.toString();
  }

  public async getAttributes(region=''): Promise<KeyedConfig> {
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/command/GetObjectAttributesCommand/
    const options: GetObjectAttributesRequest = {
      Bucket: this.bucket,
      Key: this.key,
      ObjectAttributes: [ // ObjectAttributesList // required
        'ETag' || 'Checksum' || 'LastModified' || 'DeleteMarker' || 'ObjectSize' || 'VersionId',
      ],
    };
    const s3 = UPath.DefaultS3(region);
    const command = new GetObjectAttributesCommand(options);
    const response = await s3.send(command);
    return response;
  }
}
