import { AxiosResponse } from 'axios';
import type { Client as TowerClient, Components } from './types/tower';
export type DescribeWorkflowResponse = Components.Schemas.DescribeWorkflowResponse;
export type ListWorkflowsElement = Components.Schemas.ListWorkflowsResponseListWorkflowsElement;
export type ListWorkflowsResponse = Components.Schemas.ListWorkflowsResponse;
export type ServiceInfo = Components.Schemas.ServiceInfo;
export type ServiceInfoResponse = Components.Schemas.ServiceInfoResponse;
export type SubmitWorkflowLaunchResponse = Components.Schemas.SubmitWorkflowLaunchResponse;
export type WorkflowLaunchRequest = Components.Schemas.WorkflowLaunchRequest;
import { Vivos } from './vivos';

export class VivosTower extends Vivos {

  public static env = [
    'TOWER_ACCESS_TOKEN',
    'TOWER_COMPUTE_ENV_ID',
    'TOWER_OUTPUT_BUCKET',
    'TOWER_WORKSPACE_ID',
  ];

  private workspaceId: string;
  private computeEnvId: string;

  constructor(event: any, context: any) {
    super(event, context);
    this.api_key = this.get('TOWER_ACCESS_TOKEN');
    this.workspaceId = this.get('TOWER_WORKSPACE_ID');
    this.computeEnvId = this.get('TOWER_COMPUTE_ENV_ID');
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

  public workflow_request(pipeline: string, bucket: string): WorkflowLaunchRequest {
    const options = {
      computeEnvId: this.computeEnvId,
      configProfiles: ['standard'],
      configText: "plugins = ['nf-quilt']",
      paramsText: `{\"outdir\":\"quilt+${bucket}#package=${pipeline}\"}`,
      pipeline: `https://github.com/${pipeline}`,
      revision: 'main',
      workDir: bucket,
    };
    return options;
  }

  public async launch(workflowRequest: WorkflowLaunchRequest): Promise<string> {
    try {
      const tower = await this.getTowerClient();
      const response = await tower.CreateWorkflowLaunch(
        this.workspaceId,
        { launch: workflowRequest },
      ) as AxiosResponse<SubmitWorkflowLaunchResponse>;
      const data = response.data as SubmitWorkflowLaunchResponse;
      return data.workflowId!;
    } catch (e: any) {
      console.error(workflowRequest, e);
      throw 'Failed to launch workflow';
    }
  }

  public async cancel(workflow: string): Promise<number> {
    try {
      const tower = await this.getTowerClient();
      const response = await tower.CancelWorkflow(workflow);
      return response.status;
    } catch (e: any) {
      console.error(e);
      throw 'Failed to cancel workflow';
    }
  }
}
