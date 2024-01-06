/// PipeStackProps contain a list of Buckets to monitor
/// and an email address to notify
/// whenever a file with Constants.VIVOS_CONFIG_SUFFIX is uploaded
/// to one of the buckets.
/// NOTE: uses EventBridge events, not S3 events

import { Rule } from 'aws-cdk-lib/aws-events';
import { SnsTopic, LambdaFunction } from 'aws-cdk-lib/aws-events-targets';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { EmailSubscription } from 'aws-cdk-lib/aws-sns-subscriptions';
import { Construct } from 'constructs';
import { Pipe } from './pipe';
import { VivosStack, VivosStackProps } from './vivos-stack';

export interface PipeStackProps extends VivosStackProps {
  readonly buckets: string[];
  readonly log_email: string;
  readonly vivos_stem: string;
  readonly vivos_suffixes: string[];
}

export class PipeStack extends VivosStack {

  public static DefaultProps(context: any = {}): PipeStackProps {
    const pipe = new Pipe({}, context);
    const props = pipe.defaultProps();
    props.buckets = [
      pipe.get('CDK_DEFAULT_BUCKET').split('//')[1],
    ];
    props.log_email = pipe.get('CDK_LOG_EMAIL');
    props.vivos_stem = pipe.get('VIVOS_CONFIG_STEM');
    props.vivos_suffixes = pipe.get('VIVOS_CONFIG_SUFFIXES').split(',');
    console.info('PipeStackProps', props);
    return props as PipeStackProps;
  }

  public static MakeFilters(stem: string, suffixes: string[]): object[] {
    return suffixes.map(ext => {
      return { suffix: `${stem}.${ext}` };
    });
  }

  public props: PipeStackProps;
  constructor(scope: Construct, id: string, props: PipeStackProps) {
    super(scope, id, props);
    this.props = props;

    // Monitor EventBridge events from the buckets
    // matching suffix props.stem.{json,yaml,yml}
    // https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_events.EventPattern.html
    const filters = PipeStack.MakeFilters(props.vivos_stem, props.vivos_suffixes);
    const eventRule = this.makeEventRule('VivosLogRule', filters);
    // Send email whenever a matching file is uploaded
    const log_topic = new Topic(this, 'VivosLogTopic', {
      displayName: 'VIVOS Log Topic',
    });
    eventRule.addTarget(new SnsTopic(log_topic));
    if (props.email) {
      log_topic.addSubscription(new EmailSubscription(props.email));
    } else {
      console.warn('No `CDK_LOG_EMAIL` provided for log notifications');
    }

    const routerLambda = this.makeLambda('router', {}, this.lambdaRole, log_topic);
    eventRule.addTarget(new LambdaFunction(routerLambda));
  }

  public getBucketNames(): string[] {
    if (!this.props) {
      return super.getBucketNames();
    }
    const names = this.props.buckets.map(bucket => bucket.replace('s3://', ''));
    return super.getBucketNames().concat(names);

  }

  public makeEventRule(id: string, filters: object[]): Rule {
    return new Rule(this, id, {
      description: `${id}[ ${this.props.vivos_stem}] Rule`,
      eventPattern: {
        source: ['aws.s3'],
        resources: this.getBucketARNs(),
        detail: {
          object: { key: filters },
          reason: ['PutObject'],
        },
      },
    });
  }

};
