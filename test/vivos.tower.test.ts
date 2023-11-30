import { IT } from './helpers';
import { Constants } from '../src/constants';
import { VivosTower } from '../src/vivos.tower';

describe('VivosTower', () => {
  let vivos: VivosTower;

  beforeEach(() => {
    vivos = new VivosTower({
      name: 'VivosTowerTest',
    }, {
      TOWER_ORG: 'nf-core',
      TOWER_WORKSPACE: 'hackathon',
    });
  });

  it('should get the Tower URL', async () => {
    const id = '1234567890';
    const url = vivos.getTowerURL(id);
    expect(url).toBeDefined();
    expect(url).toEqual(`https://tower.nf/orgs/nf-core/workspaces/hackathon/watch/${id}`);
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

  IT.ifhas('TOWER_WORKFLOW_TEST')('should describe a workflow', async () => {
    const workflowId = vivos.get('TOWER_WORKFLOW_TEST');
    const description = await vivos.describe(workflowId);
    expect(description).toBeDefined();
    expect(description.workflow.id).toBe(workflowId);
  });

  it('should generate valid launch_options', async () => {
    const event = Constants.LoadObjectFile('test/data/event-entry.json');
    const evivos = new VivosTower(event, {});
    const pipeline = 'nf-core/hlatyping';
    const bucket = evivos.event_bucket;
    const launchOptions = await evivos.launch_options();
    expect(launchOptions).toBeDefined();
    expect(launchOptions.computeEnvId).toBe(evivos.get('TOWER_COMPUTE_ENV_ID'));
    expect(launchOptions.configProfiles).toEqual(['test_full']);
    expect(launchOptions.configText).toBe("plugins = ['nf-quilt']");
    expect(launchOptions.pipeline).toContain(pipeline);
    expect(launchOptions.revision).toBe('master');
    expect(launchOptions.workDir).toContain(bucket);

    const params = launchOptions.paramsText!;
    expect(params).toContain(bucket);
    expect(params).toContain(pipeline);

    const status = await evivos.getStatus();
    expect(status).toBeDefined();

    const dict = evivos.toDict();
    expect(dict).toBeDefined();
    expect(dict.event).toEqual(event);
  });

  // itif(hasOutput)
  IT.ifhas('LAUNCH_WORKFLOWS')('should launch a workflow', async () => {
    const pipeline = vivos.get('TOWER_DEFAULT_PIPELINE'); // 'nf-core/hlatyping'; // 'quiltdata/nf-quilt';
    const bucket = vivos.get('TOWER_OUTPUT_BUCKET');
    const launchOptions = await vivos.launch_options(pipeline, bucket);
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
