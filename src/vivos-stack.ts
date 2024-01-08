import { Duration, RemovalPolicy, Stack, type StackProps } from 'aws-cdk-lib';
import {
  AccountPrincipal,
  ManagedPolicy,
  PolicyStatement,
  Role,
  ServicePrincipal,
} from 'aws-cdk-lib/aws-iam';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { BlockPublicAccess, Bucket, BucketEncryption } from 'aws-cdk-lib/aws-s3';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { EmailSubscription } from 'aws-cdk-lib/aws-sns-subscriptions';
import { Construct } from 'constructs';
import { Constants, KeyedConfig } from './constants';
import { Vivos } from './vivos';


export interface VivosStackProps extends StackProps {
  readonly env: {
    readonly account: string;
    readonly region: string;
  };
  readonly email: string;
}

export class VivosStack extends Stack {

  public static DefaultProps(context: any = {}): VivosStackProps {
    const vivos = new Vivos({}, context);
    const props = vivos.defaultProps();
    return props as VivosStackProps;
  }

  public static TrainCase(name: string): string {
    return name.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
  }

  protected static ASSET_KEYS = ['config', 'api'];
  protected static PRINCIPAL_KEYS = ['events', 'lambda'];
  protected readonly principal: AccountPrincipal;
  protected readonly principals: { [key: string]: ServicePrincipal };
  public readonly workBucket: Bucket;
  public readonly lambdaRole: Role;
  public readonly statusTopic: Topic;
  public readonly stack_name: string;

  constructor(scope: Construct, id: string, props: VivosStackProps) {
    super(scope, id, props);

    this.stack_name = VivosStack.TrainCase(this.constructor.name);

    this.statusTopic = new Topic(this, 'VivosStatusTopic', {
      displayName: 'VIVOS Status Topic',
    });

    this.principal = new AccountPrincipal(props.env.account);
    this.principals = Object.fromEntries(
      VivosStack.PRINCIPAL_KEYS.map(x => [x, new ServicePrincipal(`${x}.amazonaws.com`)]),
    );
    this.workBucket = this.makeBucket('vivos-pipes');

    this.statusTopic.addSubscription(
      new EmailSubscription(props.email),
    );
    this.statusTopic.grantPublish(this.principal);
    for (const principal of Object.values(this.principals)) {
      this.statusTopic.grantPublish(principal);
    }

    this.lambdaRole = this.makeServiceRole(this.principals.lambda, this.statusTopic);
  }

  public getBucketNames(): string[] {
    return [this.workBucket.bucketName];
  }

  public getBucketARNs(): string[] {
    const arns = this.getBucketNames().map(bucket => `arn:aws:s3:::${bucket}`);
    const stars = arns.map(arn => `${arn}/*`);
    return arns.concat(stars);
  }

  public makeBucket(name: string): Bucket {
    const bucketOptions = {
      bucketName: name,
      autoDeleteObjects: true,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      encryption: BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      eventBridgeEnabled: true,
      removalPolicy: RemovalPolicy.DESTROY,
      versioned: true,
    };
    const bucket = new Bucket(this, name, bucketOptions);
    bucket.grantDelete(this.principal);
    bucket.grantReadWrite(this.principal);
    return bucket;
  }

  public makeEnvars(env: object, topic: Topic): KeyedConfig {
    const default_env: KeyedConfig = {
      LOG_LEVEL: 'ALL',
      STATUS_TOPIC_ARN: topic.topicArn,
    };
    // create merged env
    return {
      ...default_env,
      ...Constants.MapEnvars(Vivos.ENVARS),
      ...env,
    };
  }

  public makeLambda(name: string, env: object, role: Role, topic: Topic) {
    return new NodejsFunction(this, name, {
      entry: `src/${this.stack_name}.${name}.ts`,
      description: `${this.stackName} ${name} Lambda`,
      runtime: Runtime.NODEJS_18_X,
      role: role,
      timeout: Duration.seconds(60),
      retryAttempts: 1,
      environment: this.makeEnvars(env, topic),
    });
  }

  public makeServiceRole(servicePrincipal: ServicePrincipal, topic: Topic) {
    const APP_NAME = Constants.DEFAULTS.APP_NAME;
    const serviceRole = new Role(this, `${APP_NAME}-${servicePrincipal.service}-role`, {
      assumedBy: servicePrincipal,
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName(
          'service-role/AWSLambdaBasicExecutionRole',
        ),
        ManagedPolicy.fromAwsManagedPolicyName(
          'AmazonSNSFullAccess',
        ),
      ],
    });
    const serviceSNSPolicy = new PolicyStatement({
      sid: 'VivosServiceSNSPolicy',
      actions: ['sns:Publish'],
      resources: [
        topic.topicArn,
      ],
    });
    serviceRole.addToPolicy(serviceSNSPolicy);

    const serviceS3Policy = new PolicyStatement({
      sid: 'VivosServiceS3Policy',
      actions: [
        's3:ListBucket',
        's3:GetObject*',
        's3:PutObject',
        'sns:Publish',
      ],
      resources: this.getBucketARNs(),
    });
    serviceRole.addToPolicy(serviceS3Policy);
    return serviceRole;
  }

}
