import { Pipe } from './pipe';
import { KeyedConfig } from './constants';
import { BatchClient, SubmitJobCommand } from "@aws-sdk/client-batch";

export class PipeQuilt extends Pipe {

  public static QUILT_DEFAULTS = {
    QUILT_VPC: 'sales-production',
    QUILT_DOCKER_IMAGE: '850787717197.dkr.ecr.us-east-1.amazonaws.com/edp-container-registry:latest',
    QUILT_JOB: 'N/A',
    QUILT_QUEUE: 'N/A',
  };

  public static QUILT_KEYS(): string[] {
    return Object.keys(PipeQuilt.QUILT_DEFAULTS);
  }

  public static getPrefix(): string {
    return 'quilt';
  }

  constructor(event: any, context: any) {
    super(event, context);
    // ensure event contains a config file
  }

  public async run(input: KeyedConfig): Promise<string> {
    const region = this.get('AWS_REGION');
    const job_queue = this.get('QUILT_QUEUE');
    const job_definition = this.get('QUILT_JOB');
    const raw_bucket = this.event_bucket;
    const prefix = this.findPrefix();
    const environment = [
      { name: 'bucket', value: String(raw_bucket) },
      { name: 'prefix', value: String(prefix) },
      // Add key values from input to environment
      ...Object.entries(input).map(([key, value]) => ({ name: key, value: String(value) }))
    ];

    try {
      // Submit a job to the Batch job queue
      const client = new BatchClient({ region: region });
      const command = new SubmitJobCommand({
        jobDefinition: job_definition,
        jobName: this.constructor.name,
        jobQueue: job_queue,
        containerOverrides: {
          environment
        }
      });
      const response = await client.send(command);
      console.log(response);

      // Return the response from the submit_job call
      return JSON.stringify({
        statusCode: 200,
        body: response
      });
    } catch (e) {
      // Handle exceptions and errors
      console.log(e);
      return JSON.stringify({
        statusCode: 500,
        body: String(e)
      });
    }
  }
    
}
