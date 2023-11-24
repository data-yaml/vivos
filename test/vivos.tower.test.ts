/**
 * This file contains tests for the VivosNextFlow class.
 */
import { VivosTower } from '../src/vivos.tower';

describe('VivosNextFlow', () => {
  let vivos: VivosTower;

  beforeEach(() => {
    vivos = new VivosTower({ name: 'VivosTowerTest' }, { api: './api/tower.yaml' });
  });

  it('should get the Tower client', async () => {
    const towerClient = await vivos.getTowerClient();
    // Add your assertions here
    expect(towerClient).toBeDefined();
  });

  it('should be able to get envars', async () => {
    for (const key of VivosTower.env) {
      expect(vivos.get(key)).toBeDefined();
    }
  });

  it.skip('should call a workflow', async () => {
    const workflow = 'exampleWorkflow';
    const result = await vivos.launch(workflow);
    // Add your assertions here
    expect(result).toBeDefined();
  });
});
