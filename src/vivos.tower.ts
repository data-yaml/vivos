import { AxiosResponse } from 'axios';
import { Constants } from './constants';
import type { Client as TowerClient, Components } from './types/tower';
import { Vivos } from './vivos';

export type DescribeWorkflowResponse = Components.Schemas.DescribeWorkflowResponse;
export type ListWorkflowsElement = Components.Schemas.ListWorkflowsResponseListWorkflowsElement;
export type ListWorkflowsResponse = Components.Schemas.ListWorkflowsResponse;
export type ServiceInfo = Components.Schemas.ServiceInfo;
export type ServiceInfoResponse = Components.Schemas.ServiceInfoResponse;
export type SubmitWorkflowLaunchResponse = Components.Schemas.SubmitWorkflowLaunchResponse;
export type WorkflowLaunchRequest = Components.Schemas.WorkflowLaunchRequest;

export class VivosTower extends Vivos {

  public static env = [
    'TOWER_ACCESS_TOKEN',
    'TOWER_COMPUTE_ENV_ID',
    'TOWER_OUTPUT_BUCKET',
    'TOWER_WORKSPACE_ID',
  ];

  private workspaceId: string;
  private computeEnvId: string;
  private event_bucket: string;
  private event_object: string;

  constructor(event: any, context: any) {
    super(event, context);
    this.api_key = this.get('TOWER_ACCESS_TOKEN');
    this.workspaceId = this.get('TOWER_WORKSPACE_ID');
    this.computeEnvId = this.get('TOWER_COMPUTE_ENV_ID');
    this.event_bucket = this.cc.getKeyPathFromObject(event, 'Records[0].s3.bucket.name');
    this.event_object = this.cc.getKeyPathFromObject(event, 'Records[0].s3.object.key');
  }

  public async getTowerClient(): Promise<TowerClient> {
    const client = await this.api(true).init<TowerClient>();
    return client;
  }

  public async info(): Promise<ServiceInfo> {
    try {
      const tower = await this.getTowerClient();
      const response = await tower.Info() as AxiosResponse<ServiceInfoResponse>;
      const data = response.data as ServiceInfoResponse;
      return data.serviceInfo!;
    } catch (e: any) {
      console.error(e);
      throw 'Failed to retrieve service info';
    }
  }

  public async list(): Promise<ListWorkflowsElement[]> {
    try {
      const tower = await this.getTowerClient();
      const response = await tower.ListWorkflows(this.workspaceId) as AxiosResponse<ListWorkflowsResponse>;
      const data = response.data as ListWorkflowsResponse;
      return data.workflows!;
    } catch (e: any) {
      console.error(e);
      throw 'Failed to list workflows';
    }
  }

  public async describe(workflow: string): Promise<DescribeWorkflowResponse> {
    try {
      const tower = await this.getTowerClient();
      const response = await tower.DescribeWorkflow(workflow) as AxiosResponse<DescribeWorkflowResponse>;
      const data = response.data as DescribeWorkflowResponse;
      return data;
    } catch (e: any) {
      console.error(e);
      throw 'Failed to describe workflow';
    }
  }

  public getPackageFromFilename(filename: string): string {
    // extract a/b from '.quilt/named_packages/a/b/c'
    const parts = filename.split('/');
    const packageParts = parts.slice(2, 4);
    const packageName = packageParts.join('/');
    return packageName;
  }

  public getPipeline(bucket: string): string {
    const packageName = this.getPackageFromFilename(this.event_object);
    const entry_uri = `s3://${bucket}/${packageName}/entry.json`;
    const pipeline = this.cc.getKeyPathFromFile(entry_uri, 'fields.Pipeline.value');
    return pipeline;
  }

  public launch_options(pipeline: string = '', bucket: string = ''): WorkflowLaunchRequest {
    if (bucket === '') {
      bucket = this.get('TOWER_OUTPUT_BUCKET');
    };
    if (pipeline === '') {
      pipeline = this.getPipeline(bucket);
      if (pipeline === '') {
        console.warn('Pipeline not specified');
        return {} as WorkflowLaunchRequest;
      }
    }
    const env = {
      bucket: bucket,
      computeEnvId: this.computeEnvId,
      workspaceId: this.workspaceId,
    };
    return Constants.loadPipeline(pipeline, env) as WorkflowLaunchRequest;
  }

  public async launch(launchOptions: WorkflowLaunchRequest): Promise<string> {
    try {
      const tower = await this.getTowerClient();
      const response = await tower.CreateWorkflowLaunch(
        this.workspaceId,
        { launch: launchOptions },
      ) as AxiosResponse<SubmitWorkflowLaunchResponse>;
      const data = response.data as SubmitWorkflowLaunchResponse;
      const workflow = data.workflowId!;
      return workflow;
    } catch (e: any) {
      console.error(launchOptions, e);
      throw 'Failed to launch workflow';
    }
  }

  public async cancel(workflow: string): Promise<number> {
    try {
      const tower = await this.getTowerClient();
      const options = { workspaceId: parseInt(this.workspaceId) };
      // const response = await tower.CancelWorkflow(workflow, JSON.stringify(options)) as AxiosResponse<number>;
      const response = await tower.post(`/workflows/${workflow}/cancel`, JSON.stringify(options), {
        headers: {
          'Content-Type': 'application/json',
        },
      }) as AxiosResponse;
      return response.status;
    } catch (e: any) {
      console.error(e);
      throw 'Failed to cancel workflow';
    }
  }

  public toDict() {
    // extend with new properties
    const dict = super.toDict();
    dict.workspaceId = this.workspaceId;
    dict.computeEnvId = this.computeEnvId;
    dict.event_bucket = this.event_bucket;
    dict.event_object = this.event_object;
    return dict;
  }
}
