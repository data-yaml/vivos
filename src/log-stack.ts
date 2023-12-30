/// LogStackProps contain a list of Buckets to monitor
/// and an email address to notify
/// whenever a file with Constants.VIVOS_CONFIG_SUFFIX is uploaded
/// to one of the buckets.
/// NOTE: uses EventBridge events, not S3 events

import { Stack, type StackProps } from 'aws-cdk-lib';
import { Rule } from 'aws-cdk-lib/aws-events';
import { SnsTopic } from 'aws-cdk-lib/aws-events-targets';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { EmailSubscription } from 'aws-cdk-lib/aws-sns-subscriptions';
import { Construct } from 'constructs';
import { Constants } from './constants';


export interface LogStackProps extends StackProps {
  buckets: string[];
  email: string;
  suffix: string;
}

export class LogStack extends Stack {
  public static DefaultProps(context: any = {}): LogStackProps {
    const cc = new Constants(context);
    const props = cc.defaultProps();
    props.buckets = cc.get('TOWER_OUTPUT_BUCKET');
    props.email = cc.get('CDK_LOG_EMAIL');
    props.suffix = cc.get('VIVOS_CONFIG_SUFFIX');
    console.info('LogStackProps', props);
    return props as LogStackProps;
  }

  constructor(scope: Construct, id: string, props: LogStackProps) {
    super(scope, id, props);
    const bucketArnList = props.buckets.map(bucket => `arn:aws:s3:::${bucket}`);
    console.info('bucketArnList', bucketArnList);

    // Monitor EventBridge events from the buckets
    // matching suffix props.suffix
    const eventRule = new Rule(this, 'VivosLogBucketRule', {
      description: 'VIVOS Log Bucket Rule',
      eventPattern: {
        source: ['aws.s3'],
        detailType: ['AWS API Call via CloudTrail'],
        detail: {
          eventSource: ['s3.amazonaws.com'],
          eventName: ['PutObject'],
          requestParameters: {
            bucketName: props.buckets,
          },
          resources: {
            ARN: bucketArnList,
          },
        },
      },
    });

    // Send email whenever a matching file is uploaded
    const topic = new Topic(this, 'VivosLogTopic', {
      displayName: 'VIVOS Log Topic',
    });

    const emailSubscription = new EmailSubscription(props.email);
    topic.addSubscription(emailSubscription);

    // Link the topic to the eventRule
    eventRule.addTarget(new SnsTopic(topic));
  }
};
