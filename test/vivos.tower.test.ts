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
    expect(info.landingUrl).toBe('https://cloud.tower.nf');
  });

  it('should list workflows', async () => {
    const workflows = await vivos.list();
    expect(workflows).toBeDefined();
    expect(workflows.length).toBeGreaterThan(0);
  });

  it('should describe a workflow', async () => {
    try {
      const workflowId = vivos.get('TOWER_TEST_WORKFLOW_ID');
      const description = await vivos.describe(workflowId);
      expect(description).toBeDefined();
      expect(description.workflow.id).toBe(workflowId);
    } catch (error) {
      console.warn('Skipping test: TOWER_WORKFLOW_ID envar not set');
    }
  });

  it('should generate valid workflow_request', async () => {
    const pipeline = vivos.get('TOWER_TEST_PIPELINE');
    const bucket = 's3://quilt-example';
    const workflowRequest = vivos.workflow_request(pipeline, bucket);
    expect(workflowRequest).toBeDefined();
    expect(workflowRequest.computeEnvId).toBe(vivos.get('TOWER_COMPUTE_ENV_ID'));
    expect(workflowRequest.configProfiles).toEqual(['standard']);
    expect(workflowRequest.configText).toBe("plugins = ['nf-quilt']");
    expect(workflowRequest.pipeline).toContain(pipeline);
    expect(workflowRequest.revision).toBe('main');
    expect(workflowRequest.workDir).toEqual(bucket);

    const params = workflowRequest.paramsText!;
    expect(params).toContain(bucket);
    expect(params).toContain(pipeline);
  });

  it.skip('should launch a workflow', async () => {
    try {
      const pipeline = vivos.get('TOWER_TEST_PIPELINE');
      const bucket = vivos.get('TOWER_OUTPUT_BUCKET');
      const launchOptions = vivos.workflow_request(pipeline, bucket);
      const result = await vivos.launch(launchOptions);
      expect(result).toBeDefined();
    } catch (error) {
      console.error('Error launching workflow: TOWER_OUTPUT_BUCKET not found?', error);
    }
  });
});
