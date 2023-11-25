import type { Client as TowerClient, Components } from './types/tower';
export type SubmitWorkflowLaunchResponse = Components.Schemas.SubmitWorkflowLaunchResponse;
export type ListWorkflowsResponse = Components.Schemas.ListWorkflowsResponse;
export type DescribeWorkflowResponse = Components.Schemas.DescribeWorkflowResponse;

import { Vivos } from './vivos';

export class VivosTower extends Vivos {

  public static env = [
    'TOWER_ACCESS_TOKEN',
    'TOWER_WORKSPACE_ID',
    'TOWER_COMPUTE_ENV_ID',
  ];

  private _tower: Promise<TowerClient>;
  private workspaceId: string;

  constructor(event: any, context: any) {
    super(event, context);
    this._tower = this.api.init<TowerClient>();
    this.workspaceId = this.get('TOWER_WORKSPACE_ID');
  }

  public async getTowerClient(): Promise<TowerClient> {
    return this._tower;
  }

  public async list(): Promise<ListWorkflowsResponse> {
    const tower = await this.getTowerClient();
    const response = await tower.ListWorkflows(this.workspaceId) as ListWorkflowsResponse;
    return response;
  }

  public async describe(workflow: string): Promise<DescribeWorkflowResponse> {
    const tower = await this.getTowerClient();
    const response = await tower.DescribeWorkflow(workflow);
    const data = response.data as DescribeWorkflowResponse;
    return data;
  }

  public async launch(workflow: string): Promise<SubmitWorkflowLaunchResponse> {
    const tower = await this.getTowerClient();
    const response = await tower.CreateWorkflowLaunch(workflow) as SubmitWorkflowLaunchResponse;
    return response;
  }
}
