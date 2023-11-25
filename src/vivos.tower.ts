import { AxiosResponse } from 'axios';
import type { Client as TowerClient, Components } from './types/tower';
export type SubmitWorkflowLaunchResponse = Components.Schemas.SubmitWorkflowLaunchResponse;
export type ListWorkflowsResponse = Components.Schemas.ListWorkflowsResponse;
export type DescribeWorkflowResponse = Components.Schemas.DescribeWorkflowResponse;
export type ServiceInfoResponse = Components.Schemas.ServiceInfoResponse;
export type ServiceInfo = Components.Schemas.ServiceInfo;

import { Vivos } from './vivos';

export class VivosTower extends Vivos {

  public static env = [
    'TOWER_ACCESS_TOKEN',
    'TOWER_WORKSPACE_ID',
    'TOWER_COMPUTE_ENV_ID',
  ];

  private workspaceId: string;
  private computeEnvId: string;

  constructor(event: any, context: any) {
    super(event, context);
    this.cc.put('OPEN_API_KEY', this.get('TOWER_ACCESS_TOKEN'));
    this.workspaceId = this.get('TOWER_WORKSPACE_ID');
    this.computeEnvId = this.get('TOWER_COMPUTE_ENV_ID');
  }

  public async getTowerClient(): Promise<TowerClient> {
    try {
      const client = await this.api().init<TowerClient>();
      return client;
    } catch (e: any) {
      console.error(e);
      throw 'Failed to initialize Tower client';
    }
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

  public async list(): Promise<ListWorkflowsResponse> {
    try {
      const tower = await this.getTowerClient();
      const response = await tower.ListWorkflows(this.workspaceId) as AxiosResponse<ListWorkflowsResponse>;
      const data = response.data as ListWorkflowsResponse;
      return data;

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

  public async launch(workflow: string): Promise<SubmitWorkflowLaunchResponse> {
    const options = {
      workspaceId: this.workspaceId,
      computeEnvId: this.computeEnvId,
    };
    try {
      const tower = await this.getTowerClient();
      const response = await tower.CreateWorkflowLaunch(workflow) as AxiosResponse<SubmitWorkflowLaunchResponse>;
      const data = response.data as SubmitWorkflowLaunchResponse;
      return data;
    } catch (e: any) {
      console.error(options);
      console.error(e.code);
      throw 'Failed to launch workflow';
    }
  }
}
