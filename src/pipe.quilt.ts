import { BatchClient, SubmitJobCommand } from '@aws-sdk/client-batch';
import { KeyedConfig } from './constants';
import { Pipe } from './pipe';
import { PipeStack } from './pipe-stack';

export class PipeQuilt extends Pipe {

  public static QUILT_DEFAULTS = {
    QUILT_BATCH_SIZE: '1',
    QUILT_VPC: 'sales-production',
    QUILT_DOCKER: '850787717197.dkr.ecr.us-east-1.amazonaws.com/edp-container-registry:latest',
    QUILT_JOB: 'PipeQuiltPackagerJob',
    QUILT_QUEUE: 'PipeQuiltPackagerQueue',
    QUILT_NEXT: 'vivos-staging',
    QUILT_PROD: 'vivos-production',
  };

  public static getPrefix(): string {
    return 'quilt';
  }

  public static ExtendStack(stack: PipeStack) {
    const batchName = this.QUILT_DEFAULTS.QUILT_QUEUE;
    const batchSize = Number(this.QUILT_DEFAULTS.QUILT_BATCH_SIZE);
    const jobName = this.QUILT_DEFAULTS.QUILT_JOB;
    const vpcName = PipeQuilt.QUILT_DEFAULTS.QUILT_VPC;

    const batchQueue = stack.makeBatchQueue(batchName, vpcName, batchSize);
    const registry = PipeQuilt.QUILT_DEFAULTS.QUILT_DOCKER;
    const command = ['python', '/quilt_packager.py'];
    const job = stack.makeJobDefinition(jobName, registry, command, batchQueue.jobQueueArn);
    const environment = {
      QUILT_QUEUE: batchQueue.jobQueueName,
      QUILT_JOB: job.jobDefinitionName,
      QUILT_NEXT: stack.stageBucket.bucketName,
      QUILT_PROD: stack.prodBucket.bucketName,
    };
    return environment;
  }

  constructor(event: any, context: any) {
    super(event, context);
    // ensure event contains a config file
  }

  public async run(input: KeyedConfig): Promise<KeyedConfig> {
    console.debug('PipeQuilt.run(input)', JSON.stringify(input));
    const region = this.get('AWS_REGION');
    const job_queue = this.get('QUILT_QUEUE');
    const job_definition = this.get('QUILT_JOB');
    const raw_bucket = this.event_bucket;
    const next_bucket = this.get('QUILT_NEXT');
    const parent = this.event_path.parent();
    const environment = [
      { name: 'bucket', value: String(raw_bucket) },
      { name: 'prefix', value: parent.key },
      { name: 'next_bucket', value: next_bucket },
      // Add key values from input to environment
      ...Object.entries(input).map(([key, value]) => ({ name: key, value: String(value) })),
    ];
    console.debug('Environment:', JSON.stringify(environment));
    try {
      // Submit a job to the Batch job queue
      const client = new BatchClient({ region: region });
      const command = new SubmitJobCommand({
        jobDefinition: job_definition,
        jobName: 'pipequilt',
        jobQueue: job_queue,
        containerOverrides: {
          environment,
        },
      });
      const response = await client.send(command);
      console.log(response);

      // Return the response from the submit_job call
      return {
        statusCode: 200,
        body: response,
      };
    } catch (e) {
      // Handle exceptions and errors
      console.log(e);
      return {
        statusCode: 500,
        body: String(e),
      };
    }
  }

}
