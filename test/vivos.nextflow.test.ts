/**
 * This file contains tests for the VivosNextFlow class.
 */
import { VivosNextFlow } from '../src/vivos.nextflow';

describe('VivosNextFlow', () => {
  let vivosNextFlow: VivosNextFlow;

  beforeEach(() => {
    vivosNextFlow = new VivosNextFlow({ name: 'VivosNextFlowTest' }, { file: './api/tower.yaml' });
  });

  it('should get the Tower client', async () => {
    const towerClient = await vivosNextFlow.getTowerClient();
    // Add your assertions here
    expect(towerClient).toBeDefined();
  });

  it.skip('should call a workflow', async () => {
    const workflow = 'exampleWorkflow';
    const result = await vivosNextFlow.launch(workflow);
    // Add your assertions here
    expect(result).toBeDefined();
  });
});
