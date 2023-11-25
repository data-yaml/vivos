import { Constants } from '../src/constants';
import { VivosTower } from '../src/vivos.tower';

describe('VivosTower', () => {
  let vivos: VivosTower;

  beforeEach(() => {
    const ctx = {
      OPEN_API_FILE: Constants.DEFAULTS.TOWER_API_FILE,
      OPEN_API_URL: Constants.DEFAULTS.TOWER_API_URL,
    };
    vivos = new VivosTower({ name: 'VivosTowerTest' }, ctx);
  });

  it('should be able to get envars', async () => {
    for (const key of VivosTower.env) {
      expect(vivos.get(key)).toBeDefined();
    }
  });

  it('should get the Tower client', async () => {
    const towerClient = await vivos.getTowerClient();
    expect(towerClient).toBeDefined();
  });

  it('should get service info', async () => {
    const info = await vivos.info();
    expect(info).toBeDefined();
    expect(info.version).toBe('Tower');
  });

  it.skip('should list workflows', async () => {
    const workflows = await vivos.list();
    expect(workflows).toBeDefined();
  });

  it.skip('should call a workflow', async () => {
    const workflow = 'exampleWorkflow';
    const result = await vivos.launch(workflow);
    // Add your assertions here
    expect(result).toBeDefined();
  });
});
