import { Constants } from '../src/constants';
import { VivosTower } from '../src/vivos.tower';

const itif = (condition: boolean) => condition ? it : it.skip;
const itifhas = (key: string) => itif(process.env[key] !== undefined);

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

  itifhas('TOWER_TEST_WORKFLOW_ID')('should describe a workflow', async () => {
    const workflowId = vivos.get('TOWER_TEST_WORKFLOW_ID');
    const description = await vivos.describe(workflowId);
    expect(description).toBeDefined();
    expect(description.workflow.id).toBe(workflowId);
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

  // itif(hasOutput)
  it.skip('should launch a workflow', async () => {
    const pipeline = vivos.get('TOWER_TEST_PIPELINE');
    const bucket = vivos.get('TOWER_OUTPUT_BUCKET');
    const launchOptions = vivos.workflow_request(pipeline, bucket);
    const workflowId = await vivos.launch(launchOptions);
    expect(workflowId).toBeDefined();
    console.debug(`Launched workflow: ${workflowId}`);
    /*
    const status = await vivos.cancel(workflowId);
    expect(status).toBeDefined();
    expect(status).toBe(204);
    */
  });
});
