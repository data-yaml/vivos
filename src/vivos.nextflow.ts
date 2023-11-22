import type { Client as TowerClient } from './types/tower';
import { Vivos } from './vivos';

export class VivosNextFlow extends Vivos {

  public async getTowerClient(): Promise<TowerClient> {
    const api = this.loadApi('./api/tower.yaml');
    const tower = await api.init<TowerClient>();
    return tower;
  }

  public async call(workflow: string): Promise<any> {
    const tower = await this.getTowerClient();
    const response = await tower.CreateWorkflowLaunch(workflow);
    return response;
  }
}
