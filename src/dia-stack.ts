import * as path from 'path';
import { Duration, Stack, type StackProps } from 'aws-cdk-lib';
import {
  AccountPrincipal,
  ManagedPolicy,
  PolicyStatement,
  Role,
  ServicePrincipal,
} from 'aws-cdk-lib/aws-iam';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { S3EventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import {
  Bucket,
  EventType,
} from 'aws-cdk-lib/aws-s3';
import { Asset } from 'aws-cdk-lib/aws-s3-assets';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { EmailSubscription } from 'aws-cdk-lib/aws-sns-subscriptions';
import { Construct } from 'constructs';
import { Constants, KeyedConfig } from './constants';
import { Vivos } from './vivos';
import { VivosBenchling } from './vivos.benchling';
import { VivosTower } from './vivos.tower';

export interface DiaStackProps extends StackProps {
  readonly account: string;
  readonly region: string;
  readonly bucketURI: string;
  readonly email: string;
}

export class DiaStack extends Stack {

  public static DefaultProps(context: any = {}): DiaStackProps {
    const cc = new Constants(context);
    const props = cc.defaultProps();
    props.bucketURI = cc.get('TOWER_OUTPUT_BUCKET');
    return props as DiaStackProps;
  }

  protected static ASSET_KEYS = ['config', 'api'];
  protected static PRINCIPAL_KEYS = ['events', 'lambda'];
  private readonly bucket: Bucket;
  private readonly bucketURI: string;
  private readonly lambdaRole: Role;
  private readonly principal: AccountPrincipal;
  public readonly principals: { [key: string]: ServicePrincipal };
  public readonly assets: { [key: string]: Asset };
  public readonly statusTopic: Topic;

  constructor(scope: Construct, id: string, props: DiaStackProps) {
    super(scope, id, props);

    this.assets = Object.fromEntries(
      DiaStack.ASSET_KEYS.map(x => [x, new Asset(this, `Vivos_${x}_Asset`, {
        path: path.join(__dirname, '..', x),
      })]),
    );

    this.bucketURI = props.bucketURI;
    const bucketName = this.bucketURI.split('/').pop()!;
    this.bucket = Bucket.fromBucketName(this, 'VivosOutputBucket', bucketName) as Bucket;

    this.statusTopic = new Topic(this, 'VivosStatusTopic', {
      displayName: 'VIVOS Status Topic',
    });
    this.principal = new AccountPrincipal(props.account);
    this.principals = Object.fromEntries(
      DiaStack.PRINCIPAL_KEYS.map(x => [x, new ServicePrincipal(`${x}.amazonaws.com`)]),
    );
    this.lambdaRole = this.makeLambdaRole(this.principals.lambda);

    this.statusTopic.addSubscription(
      new EmailSubscription(props.email),
    );
    this.statusTopic.grantPublish(this.principal);
    for (const principal of Object.values(this.principals)) {
      console.debug(`statusTopic.grantPublish ${principal.service}`);
      this.statusTopic.grantPublish(principal);
    }

    const inputSource = new S3EventSource(this.bucket, {
      events: [EventType.OBJECT_CREATED],
      filters: [{ suffix: Constants.DEFAULTS.TOWER_INPUT_FILE }],
    });
    const launchLambda = this.makeLambda('launch', {});
    launchLambda.addEventSource(inputSource);

    const outputSource = new S3EventSource(this.bucket, {
      events: [EventType.OBJECT_CREATED],
      filters: [{ suffix: Constants.DEFAULTS.TOWER_OUTPUT_FILE }],
    });

    const successLambda = this.makeLambda('success', {});
    successLambda.addEventSource(outputSource);
  }

  public makeEnvars(env: object): KeyedConfig {
    const default_env: KeyedConfig = {
      LOG_LEVEL: 'ALL',
      STATUS_TOPIC_ARN: this.statusTopic.topicArn,
      TOWER_OUTPUT_BUCKET: this.bucketURI,
    };
    const asset_env: KeyedConfig = Object.fromEntries(
      DiaStack.ASSET_KEYS.map(x => [`BASE_${x.toUpperCase()}`, this.assets[x].s3ObjectUrl]),
    );
    // create merged env
    return {
      ...default_env,
      ...Constants.MapEnvars(Vivos.ENVARS),
      ...Constants.MapEnvars(VivosTower.ENVARS),
      ...Constants.MapEnvars(VivosBenchling.ENVARS),
      ...asset_env,
      ...env,
    };
  }

  public makeLambda(name: string, env: object) {
    return new NodejsFunction(this, name, {
      description: `VIVOS ${name} Lambda`,
      runtime: Runtime.NODEJS_18_X,
      role: this.lambdaRole,
      timeout: Duration.seconds(60),
      retryAttempts: 1,
      environment: this.makeEnvars(env),
    });
  }

  public makeLambdaRole(lambdaPrincipal: ServicePrincipal) {
    if (!lambdaPrincipal) {
      throw new Error('lambdaPrincipal is required');
    }
    const APP_NAME = Constants.DEFAULTS.APP_NAME;
    const lambdaRole = new Role(this, `${APP_NAME}-${lambdaPrincipal.service}-role`, {
      assumedBy: lambdaPrincipal,
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName(
          'service-role/AWSLambdaBasicExecutionRole',
        ),
      ],
    });
    console.log(this.statusTopic);
    const lambdaSNSPolicy = new PolicyStatement({
      sid: 'VivosLambdaSNSPolicy',
      actions: ['sns:Publish'],
      resources: [this.statusTopic.topicArn],
    });
    lambdaRole.addToPolicy(lambdaSNSPolicy);
    const lambdaS3Policy = new PolicyStatement({
      sid: 'VivosLambdaS3Policy',
      actions: ['s3:ListBucket', 's3:GetObject', 's3:PutObject', 'SNS:Publish'],
      resources: [
        this.bucket.bucketArn,
        this.bucket.bucketArn + '/*',
      ],
    });
    lambdaRole.addToPolicy(lambdaS3Policy);
    return lambdaRole;
  }

}
