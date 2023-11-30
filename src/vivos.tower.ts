import { AxiosResponse } from 'axios';
import { Constants, KeyedConfig } from './constants';
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

  public static ENVARS = [
    'TOWER_ACCESS_TOKEN',
    'TOWER_COMPUTE_ENV_ID',
    'TOWER_OUTPUT_BUCKET',
    'TOWER_ORG',
    'TOWER_WORKSPACE',
    'TOWER_WORKSPACE_ID',
  ];

  private workspaceId: string;
  private computeEnvId: string;
  private event_bucket: string;
  private event_object: string;
  public readonly entry: KeyedConfig;


  constructor(event: any, context: any) {
    context.OPEN_API_FILE = Constants.DEFAULTS.TOWER_API_FILE;
    super(event, context);
    this.api_key = this.get('TOWER_ACCESS_TOKEN');
    this.api_url = this.get('TOWER_API_URL');
    this.workspaceId = this.get('TOWER_WORKSPACE_ID');
    this.computeEnvId = this.get('TOWER_COMPUTE_ENV_ID');
    this.event_bucket = Constants.GetKeyPathFromObject(event, 'Records[0].s3.bucket.name');
    this.event_object = Constants.GetKeyPathFromObject(event, 'Records[0].s3.object.key');
    const entry_uri = `s3://${this.event_bucket}/${this.event_object}`;
    this.entry = this.event_object ? Constants.LoadObjectURI(entry_uri) : {};
  }

  public async getTowerClient(): Promise<TowerClient> {
    const client = await this.api(true).init<TowerClient>();
    return client;
  }

  public getTowerURL(workflowId: string): string {
    const org = this.get('TOWER_ORG');
    const workspace = this.get('TOWER_WORKSPACE');
    return `https://tower.nf/orgs/${org}/workspaces/${workspace}/watch/${workflowId}`;
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

  public getPipeline(): string {
    const pipeline = Constants.GetKeyPathFromObject(this.entry, 'fields.Pipeline.value');
    return pipeline || this.get('TOWER_DEFAULT_PIPELINE');
  }

  public getStatus(): string {
    const status = Constants.GetKeyPathFromObject(this.entry, 'fields.Status.value');
    return status || 'unknown';
  }

  public launch_options(pipeline: string = '', bucket: string = ''): WorkflowLaunchRequest {
    if (bucket === '') {
      bucket = this.get('TOWER_OUTPUT_BUCKET');
    };
    if (pipeline === '') {
      pipeline = this.getPipeline();
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
    return Constants.LoadPipeline(pipeline, env) as WorkflowLaunchRequest;
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
    return {
      ...super.toDict(),
      workspaceId: this.workspaceId,
      computeEnvId: this.computeEnvId,
      event_bucket: this.event_bucket,
      event_object: this.event_object,
      entry_data: this.entry,
    };
  }
}
