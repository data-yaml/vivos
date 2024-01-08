/// PipeStackProps contain a list of Buckets to monitor
/// and an email address to notify
/// whenever a file with Constants.VIVOS_CONFIG_SUFFIX is uploaded
/// to one of the buckets.
/// NOTE: uses EventBridge events, not S3 events

import { Size } from 'aws-cdk-lib';
import {
  FargateComputeEnvironment,
  EcsJobDefinition,
  EcsFargateContainerDefinition,
  JobQueue,
} from 'aws-cdk-lib/aws-batch';
import { SubnetType, Vpc } from 'aws-cdk-lib/aws-ec2';
import { ContainerImage } from 'aws-cdk-lib/aws-ecs';
import { Rule } from 'aws-cdk-lib/aws-events';
import { SnsTopic, LambdaFunction } from 'aws-cdk-lib/aws-events-targets';
import { ManagedPolicy, ServicePrincipal, Role, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { EmailSubscription } from 'aws-cdk-lib/aws-sns-subscriptions';
import { Construct } from 'constructs';
import { KeyedConfig } from './constants';
import { Pipe } from './pipe';
import { PipeQuilt } from './pipe.quilt';
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
    // https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_events.EventPattern.html
    const filters = PipeStack.MakeFilters(props.vivos_stem, props.vivos_suffixes);
    const eventRule = this.makeEventRule('VivosLogRule', filters);
    // Send email whenever a matching file is uploaded
    const log_topic = new Topic(this, 'VivosLogTopic', {
      displayName: 'VIVOS Log Topic',
    });
    eventRule.addTarget(new SnsTopic(log_topic));
    if (props.log_email) {
      log_topic.addSubscription(new EmailSubscription(props.log_email));
    } else {
      console.warn('No `CDK_LOG_EMAIL` provided for log notifications');
    }

    const jobEnv = PipeQuilt.ExtendStack(this);
    const routerLambda = this.makeLambda('router', jobEnv, this.lambdaRole, log_topic);
    eventRule.addTarget(new LambdaFunction(routerLambda));
  }

  // TODO: automatically normalize handling of bucket names vs URIs
  public getBucketNames(): string[] {
    if (!this.props) {
      return super.getBucketNames();
    }
    const names = this.props.buckets.map(bucket => bucket.replace('s3://', ''));
    return super.getBucketNames().concat(names);

  }

  // TODO: make more generic
  public makeEnvars(env: object): KeyedConfig {
    const super_env = super.makeEnvars(env, this.statusTopic);
    return {
      ...super_env,
      ...Pipe.PIPE_DEFAULTS,
      ...PipeQuilt.QUILT_DEFAULTS,
      ...env,
    };
  }

  public makeEventRule(id: string, filters: object[]): Rule {
    return new Rule(this, id, {
      description: `${id}[${this.props.vivos_stem}] Rule`,
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

  public makeJobRole(): Role {
    const ecs_tasks = new ServicePrincipal('ecs-tasks.amazonaws.com');
    const role = this.makeServiceRole(ecs_tasks, this.statusTopic);

    const policyNames = ['service-role/AmazonECSTaskExecutionRolePolicy', 'AmazonEC2ContainerRegistryReadOnly'];
    for (const policyName of policyNames) {
      role.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName(policyName));
    }

    return role;
  }

  public makeBatchQueue(batchName: string, vpcName: string, batchSize: number): JobQueue {
    // This resource alone will create a private / public subnet in each AZ as well as nat / internet gateway(s)
    const vpc = Vpc.fromLookup(this, 'vivos-pipe-vpc', { vpcName: vpcName });
    // Create AWS Batch Job Queue
    const batchQueue = new JobQueue(this, batchName);

    // For loop to create Batch Compute Environments
    for (let i = 0; i < batchSize; i++) {
      const name = `${batchName}FargateEnv${i}`;
      const fargateSpotEnvironment = new FargateComputeEnvironment(this, name, {
        vpc: vpc,
        vpcSubnets: { subnetType: SubnetType.PRIVATE_WITH_EGRESS },
      });

      batchQueue.addComputeEnvironment(fargateSpotEnvironment, i);
    }
    return batchQueue;
  }

  // TODO: allow Pipe to override any parameters to EcsFargateContainerDefinition
  public makeJobDefinition(job_definition: string, registry: string, command: string[], queueARN: string): EcsJobDefinition {

    const job_role = this.makeJobRole();
    // Create Job Definition to submit job in batch job queue.
    const batchJobDef = new EcsJobDefinition(this, job_definition, {
      container: new EcsFargateContainerDefinition(this, 'FargateCDKJobDef', {
        image: ContainerImage.fromRegistry(registry),
        command: command,
        memory: Size.mebibytes(512),
        cpu: 0.25,
        executionRole: job_role,
        jobRole: job_role, // TODO: split out as separate role
      }),
    });

    // This removes the version appendage from the ARN for the Job Definition as required by IAM
    const jobDefinitionArnWithoutVersion = `arn:aws:batch:${this.region}:${this.account}:job-definition/${batchJobDef.jobDefinitionName}`;

    // Define the policy statement
    const jobDefinitionPolicyStatement = new PolicyStatement({
      actions: ['batch:SubmitJob'], // Specify the action(s) you want to allow
      resources: [jobDefinitionArnWithoutVersion], // Specify the ARN of the resource
    });

    // Define the policy statement
    const jobQueuePolicyStatement = new PolicyStatement({
      actions: ['batch:SubmitJob'], // Specify the action(s) you want to allow
      resources: [queueARN], // Specify the ARN of the resource
    });
    this.lambdaRole.addToPolicy(jobDefinitionPolicyStatement);
    this.lambdaRole.addToPolicy(jobQueuePolicyStatement);

    return batchJobDef;
  }
};
