/// PipeStackProps contain a list of Buckets to monitor
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


export interface PipeStackProps extends StackProps {
  buckets: string[];
  email: string;
  vivos_stem: string;
}

export class PipeStack extends Stack {
  public static DefaultProps(context: any = {}): PipeStackProps {
    const cc = new Constants(context);
    const props = cc.defaultProps();
    props.buckets = [
      cc.get('TOWER_OUTPUT_BUCKET').split('//')[1],
    ];
    props.email = cc.get('CDK_LOG_EMAIL');
    props.vivos_stem = cc.get('VIVOS_CONFIG_STEM');
    console.info('PipeStackProps', props);
    return props as PipeStackProps;
  }

  public props: PipeStackProps;
  constructor(scope: Construct, id: string, props: PipeStackProps) {
    super(scope, id, props);
    this.props = props;
    const bucketArnList = props.buckets.map(bucket => `arn:aws:s3:::${bucket}`);

    // Monitor EventBridge events from the buckets
    // matching suffix props.stem.{json,yaml,yml}
    // https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_events.EventPattern.html
    const eventRule = new Rule(this, 'VivosLogBucketRule', {
      description: 'VIVOS Log Bucket Rule',
      eventPattern: {
        detailType: ['Object Created'],
        source: ['aws.s3'],
        resources: bucketArnList,
        detail: {
          object: {
            key: [
              { suffix: `${props.vivos_stem}.json` },
              { suffix: `${props.vivos_stem}.yaml` },
              { suffix: `${props.vivos_stem}.yml` },
            ],
          },
          reason: ['PutObject'],
        },
      },
    });

    // Send email whenever a matching file is uploaded
    const topic = new Topic(this, 'VivosLogTopic', {
      displayName: 'VIVOS Log Topic',
    });
    eventRule.addTarget(new SnsTopic(topic));
    if (props.email) {
      topic.addSubscription(new EmailSubscription(props.email));
    } else {
      console.warn('No `CDK_LOG_EMAIL` provided for log notifications');
    }
  }
};
