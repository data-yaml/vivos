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
import { Topic } from 'aws-cdk-lib/aws-sns';
import { EmailSubscription } from 'aws-cdk-lib/aws-sns-subscriptions';
import { Construct } from 'constructs';
import { Constants, KeyedConfig } from './constants';
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

  protected static PRINCIPAL_KEYS = ['events', 'lambda'];
  private readonly bucket: Bucket;
  private readonly bucketURI: string;
  private readonly lambdaRole: Role;
  private readonly principal: AccountPrincipal;
  private readonly principals: { [key: string]: ServicePrincipal };
  ;
  private readonly statusTopic: Topic;

  constructor(scope: Construct, id: string, props: DiaStackProps) {
    super(scope, id, props);
    this.bucketURI = props.bucketURI;
    const bucketName = this.bucketURI.split('/').pop()!;
    this.bucket = Bucket.fromBucketName(this, 'VivosOutputBucket', bucketName) as Bucket;
    this.principal = new AccountPrincipal(props.account);
    this.principals = Object.fromEntries(
      DiaStack.PRINCIPAL_KEYS.map(x => [x, new ServicePrincipal(`${x}.amazonaws.com`)]),
    );
    this.lambdaRole = this.makeLambdaRole(this.principals.lambda);

    this.statusTopic = new Topic(this, 'VivosStatusTopic', {
      displayName: 'VIVOS Status Topic',
    });
    this.statusTopic.addSubscription(
      new EmailSubscription(props.email),
    );
    this.statusTopic.grantPublish(this.principal);
    for (const principal of Object.values(this.principals)) {
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

  private makeLambda(name: string, env: object) {
    const default_env: KeyedConfig = {
      LOG_LEVEL: 'ALL',
      STATUS_TOPIC_ARN: this.statusTopic.topicArn,
      TOWER_OUTPUT_BUCKET: this.bucketURI,
    };
    // create merged env
    const final_env = {
      ...default_env,
      ...Constants.MapEnvars(VivosTower.ENVARS),
      ...Constants.MapEnvars(VivosBenchling.ENVARS),
      ...env,
    };
    return new NodejsFunction(this, name, {
      description: `VIVOS ${name} Lambda`,
      runtime: Runtime.NODEJS_18_X,
      role: this.lambdaRole,
      timeout: Duration.seconds(60),
      retryAttempts: 1,
      environment: final_env,
    });
  }

  private makeLambdaRole(lambdaPrincipal: ServicePrincipal) {
    if (!lambdaPrincipal) {
      throw new Error('lambdaPrincipal is required');
    }
    const APP_NAME = Constants.DEFAULTS.APP_NAME;
    const lambdaRole = new Role(this, `${APP_NAME}-lambda-role`, {
      assumedBy: lambdaPrincipal,
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName(
          'service-role/AWSLambdaBasicExecutionRole',
        ),
      ],
    });

    const lambdaS3Policy = new PolicyStatement({
      sid: 'VivosLambdaS3Policy',
      actions: ['s3:ListBucket', 's3:GetObject', 's3:PutObject'],
      resources: [
        this.bucket.bucketArn,
        this.bucket.bucketArn + '/*',
      ],
    });
    console.debug(lambdaS3Policy.sid);
    lambdaRole.addToPolicy(lambdaS3Policy);
    return lambdaRole;
  }

}
