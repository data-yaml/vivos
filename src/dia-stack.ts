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
import { Constants } from './constants';


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

  private readonly bucket: Bucket;
  private readonly bucketURI: string;
  private readonly lambdaRole: Role;
  private readonly principal: AccountPrincipal;
  private readonly statusTopic: Topic;

  constructor(scope: Construct, id: string, props: DiaStackProps) {
    super(scope, id, props);
    this.bucketURI = props.bucketURI;
    const bucketName = this.bucketURI.split('/').pop()!;
    this.bucket = Bucket.fromBucketName(this, 'VivosOutputBucket', bucketName) as Bucket;
    this.lambdaRole = this.makeLambdaRole();
    this.principal = new AccountPrincipal(props.account);

    this.statusTopic = new Topic(this, 'VivosStatusTopic', {
      displayName: 'VIVOS Status Topic',
    });
    this.statusTopic.addSubscription(
      new EmailSubscription(props.email),
    );
    const servicePrincipal = new ServicePrincipal('events.amazonaws.com');
    this.statusTopic.grantPublish(servicePrincipal);
    this.statusTopic.grantPublish(this.principal);

    const eventSource = new S3EventSource(this.bucket, {
      events: [EventType.OBJECT_CREATED],
      filters: [{ suffix: Constants.DEFAULTS.TOWER_INPUT_FILE }],
    });
    const towerLambda = this.makeLambda('tower', {});
    towerLambda.addEventSource(eventSource);
  }

  private makeLambda(name: string, env: object) {
    const default_env = {
      STATUS_TOPIC_ARN: this.statusTopic.topicArn,
      TOWER_OUTPUT_BUCKET: this.bucketURI,
      LOG_LEVEL: 'ALL',
    };
    // create merged env
    const final_env = Object.assign(default_env, env);
    return new NodejsFunction(this, name, {
      runtime: Runtime.NODEJS_18_X,
      role: this.lambdaRole,
      timeout: Duration.seconds(60),
      retryAttempts: 1,
      environment: final_env,
    });
  }

  private makeLambdaRole() {
    const APP_NAME = Constants.DEFAULTS.APP_NAME;
    const lambdaRole = new Role(this, `${APP_NAME}-lambda-role`, {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
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
    //lambdaRole.addToPolicy(lambdaS3Policy);
    return lambdaRole;
  }

}
