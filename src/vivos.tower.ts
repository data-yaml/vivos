import type { Client as TowerClient } from './types/tower';
import { Vivos } from './vivos';

export class VivosTower extends Vivos {

  public static env = [
    'TOWER_ACCESS_TOKEN',
    'TOWER_WORKSPACE_ID',
    'TOWER_COMPUTE_ENV_ID',
  ];

  private _tower: Promise<TowerClient>;

  constructor(event: any, context: any) {
    super(event, context);
    this._tower = this.api.init<TowerClient>();
  }

  public async getTowerClient(): Promise<TowerClient> {
    return this._tower;
  }

  public async launch(workflow: string): Promise<any> {
    const tower = await this.getTowerClient();
    const response = await tower.CreateWorkflowLaunch(workflow);
    return response;
  }
}
