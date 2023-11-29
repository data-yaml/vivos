import { VivosTower } from '../src/vivos.tower';

const itif = (condition: boolean) => condition ? it : it.skip;
const itifhas = (key: string) => itif(process.env[key] !== undefined);

describe('VivosTower', () => {
  let vivos: VivosTower;

  beforeEach(() => {
    vivos = new VivosTower({ name: 'VivosTowerTest' }, {});
  });

  it('should be able to get envars', async () => {
    for (const key of VivosTower.ENVARS) {
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

  it('should generate valid launch_options', async () => {
    const pipeline = vivos.get('TOWER_DEFAULT_PIPELINE');
    const bucket = 's3://quilt-example';
    const launchOptions = vivos.launch_options(pipeline, bucket);
    expect(launchOptions).toBeDefined();
    expect(launchOptions.computeEnvId).toBe(vivos.get('TOWER_COMPUTE_ENV_ID'));
    expect(launchOptions.configProfiles).toEqual(['standard']);
    expect(launchOptions.configText).toBe("plugins = ['nf-quilt']");
    expect(launchOptions.pipeline).toContain(pipeline);
    expect(launchOptions.revision).toBe('main');
    expect(launchOptions.workDir).toEqual(bucket);

    const params = launchOptions.paramsText!;
    expect(params).toContain(bucket);
    expect(params).toContain(pipeline);
  });

  // itif(hasOutput)
  it.skip('should launch a workflow', async () => {
    const pipeline = vivos.get('TOWER_DEFAULT_PIPELINE'); // 'nf-core/hlatyping'; // 'quiltdata/nf-quilt';
    const bucket = vivos.get('TOWER_OUTPUT_BUCKET');
    const launchOptions = vivos.launch_options(pipeline, bucket);
    const workflowId = await vivos.launch(launchOptions);
    expect(workflowId).toBeDefined();
    console.info(`Launched workflow: ${workflowId}`);
    /*
    const status = await vivos.cancel(workflowId);
    expect(status).toBeDefined();
    expect(status).toBe(204);
    */
  });
});
