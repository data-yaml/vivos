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
  readonly bucket: Bucket;
  readonly email: string;
}

export class DiaStack extends Stack {

  public static defaultProps(context: any = {}): DiaStackProps {
    const cc = new Constants(context);
    return cc.defaultProps() as DiaStackProps;
  }

  private readonly lambdaRole: Role;
  private readonly bucket: Bucket;
  private readonly principal: AccountPrincipal;

  constructor(scope: Construct, id: string, props: DiaStackProps) {
    super(scope, id, props);
    this.bucket = props.bucket;
    this.lambdaRole = this.makeLambdaRole();
    this.principal = new AccountPrincipal(props.account);

    const statusTopic = new Topic(this, 'VivosStatusTopic', {
      displayName: 'VIVOS Status Topic',
    });
    statusTopic.addSubscription(
      new EmailSubscription(props.email),
    );
    const servicePrincipal = new ServicePrincipal('events.amazonaws.com');
    statusTopic.grantPublish(servicePrincipal);
    statusTopic.grantPublish(this.principal);

    const eventSource = new S3EventSource(props.bucket, {
      events: [EventType.OBJECT_CREATED],
      filters: [{ prefix: '/.quilt/named_packages/' }],
    });
    const towerLamdba = this.makeLambda('tower', {});
    console.debug(towerLamdba.stack.templateFile);
    console.debug(eventSource);
    //towerLamdba.addEventSource(eventSource);
  }

  private makeLambda(name: string, env: object) {
    const default_env = {
      TOWER_OUTPUT_BUCKET: 's3://' + this.bucket.bucketName + '/outputs',
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
      actions: ['s3:ListBucket', 's3:GetObject', 's3:PutObject'],
      resources: [
        this.bucket.bucketArn,
        this.bucket.bucketArn + '/*',
      ],
    });
    console.debug(lambdaS3Policy);
    //lambdaRole.addToPolicy(lambdaS3Policy);
    return lambdaRole;
  }

}
