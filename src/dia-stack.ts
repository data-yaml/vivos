import { S3EventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import {
  Bucket,
  EventType,
} from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { Constants, KeyedConfig } from './constants';
import { VivosStack, VivosStackProps } from './vivos-stack';
import { VivosBenchling } from './vivos.benchling';
import { VivosTower } from './vivos.tower';

export interface DiaStackProps extends VivosStackProps {
  readonly bucketURI: string;
}

export class DiaStack extends VivosStack {

  public static DefaultProps(context: any = {}): DiaStackProps {
    const cc = new Constants(context);
    const props = cc.defaultProps();
    props.bucketURI = cc.get('CDK_DEFAULT_BUCKET');
    console.info('DiaStackProps', props);
    return props as DiaStackProps;
  }

  private readonly bucket: Bucket;
  private readonly bucketURI: string;
  private readonly bucketName: string;


  constructor(scope: Construct, id: string, props: DiaStackProps) {
    super(scope, id, props);
    this.bucketURI = props.bucketURI;
    this.bucketName = this.bucketURI.split('/').pop()!;
    this.bucket = Bucket.fromBucketName(this, 'VivosOutputBucket', this.bucketName) as Bucket;

    const inputSource = new S3EventSource(this.bucket, {
      events: [EventType.OBJECT_CREATED],
      filters: [{ suffix: Constants.DEFAULTS.TOWER_INPUT_FILE }],
    });
    const launchLambda = this.makeLambda('launch', {}, this.lambdaRole, this.statusTopic);
    launchLambda.addEventSource(inputSource);

    const outputSource = new S3EventSource(this.bucket, {
      events: [EventType.OBJECT_CREATED],
      filters: [{ suffix: Constants.DEFAULTS.TOWER_OUTPUT_FILE }],
    });

    const successLambda = this.makeLambda('success', {}, this.lambdaRole, this.statusTopic);
    successLambda.addEventSource(outputSource);
  }

  public makeEnvars(env: object): KeyedConfig {
    const super_env = super.makeEnvars(env, this.statusTopic);
    // create merged env
    return {
      CDK_DEFAULT_BUCKET: this.bucketURI,
      ...super_env,
      ...Constants.MapEnvars(VivosTower.ENVARS),
      ...Constants.MapEnvars(VivosBenchling.ENVARS),
      ...env,
    };
  }

  public getBucketNames(): string[] {
    return [this.bucketName];
  }

}
