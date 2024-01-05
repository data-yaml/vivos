import { Duration, Stack, type StackProps } from 'aws-cdk-lib';
import {
  AccountPrincipal,
  ManagedPolicy,
  PolicyStatement,
  Role,
  ServicePrincipal,
} from 'aws-cdk-lib/aws-iam';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { EmailSubscription } from 'aws-cdk-lib/aws-sns-subscriptions';
import { Construct } from 'constructs';
import { Constants, KeyedConfig } from './constants';
import { Vivos } from './vivos';

export interface VivosStackProps extends StackProps {
  readonly account: string;
  readonly region: string;
  readonly email: string;
}

export class VivosStack extends Stack {

  public static DefaultProps(context: any = {}): VivosStackProps {
    const cc = new Constants(context);
    const props = cc.defaultProps();
    console.info('VivosStackProps', props);
    return props as VivosStackProps;
  }

  protected static ASSET_KEYS = ['config', 'api'];
  protected static PRINCIPAL_KEYS = ['events', 'lambda'];
  protected readonly lambdaRole: Role;
  protected readonly principal: AccountPrincipal;
  protected readonly principals: { [key: string]: ServicePrincipal };
  protected readonly statusTopic: Topic;

  constructor(scope: Construct, id: string, props: VivosStackProps) {
    super(scope, id, props);

    this.statusTopic = new Topic(this, 'VivosStatusTopic', {
      displayName: 'VIVOS Status Topic',
    });

    this.principal = new AccountPrincipal(props.account);
    this.principals = Object.fromEntries(
      VivosStack.PRINCIPAL_KEYS.map(x => [x, new ServicePrincipal(`${x}.amazonaws.com`)]),
    );

    this.statusTopic.addSubscription(
      new EmailSubscription(props.email),
    );
    this.statusTopic.grantPublish(this.principal);
    for (const principal of Object.values(this.principals)) {
      this.statusTopic.grantPublish(principal);
    }

    this.lambdaRole = this.makeLambdaRole(this.principals.lambda, this.statusTopic);
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

  public getBucketNames(): string[] {
    return [];
  }

  public getBucketARNs(): string[] {
    const arns = this.getBucketNames().map(bucket => `arn:aws:s3:::${bucket}`);
    const stars = arns.map(arn => `${arn}/*`);
    return arns.concat(stars);
  }

  public makeLambda(name: string, env: object, role: Role, topic: Topic) {
    return new NodejsFunction(this, name, {
      description: `VIVOS ${name} Lambda`,
      runtime: Runtime.NODEJS_18_X,
      role: role,
      timeout: Duration.seconds(60),
      retryAttempts: 1,
      environment: this.makeEnvars(env, topic),
    });
  }

  public makeLambdaRole(lambdaPrincipal: ServicePrincipal, topic: Topic) {
    const APP_NAME = Constants.DEFAULTS.APP_NAME;
    const lambdaRole = new Role(this, `${APP_NAME}-${lambdaPrincipal.service}-role`, {
      assumedBy: lambdaPrincipal,
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName(
          'service-role/AWSLambdaBasicExecutionRole',
        ),
        ManagedPolicy.fromAwsManagedPolicyName(
          'AmazonSNSFullAccess',
        ),
      ],
    });
    const lambdaSNSPolicy = new PolicyStatement({
      sid: 'VivosLambdaSNSPolicy',
      actions: ['sns:Publish'],
      resources: [
        topic.topicArn,
      ],
    });
    lambdaRole.addToPolicy(lambdaSNSPolicy);

    const lambdaS3Policy = new PolicyStatement({
      sid: 'VivosLambdaS3Policy',
      actions: ['s3:ListBucket', 's3:GetObject', 's3:PutObject', 'SNS:Publish'],
      resources: this.getBucketARNs(),
    });
    lambdaRole.addToPolicy(lambdaS3Policy);
    return lambdaRole;
  }

}
