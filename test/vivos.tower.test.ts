import { IT, helpers } from './helpers';
import { VivosTower } from '../src/vivos.tower';

describe('VivosTower', () => {
  let vivos: VivosTower;
  let pipeline: string;
  let env: any;

  beforeEach(() => {
    env = {
      bucket: `s3://${helpers.get('TEST_BUCKET')}`,
      computeEnvId: 'ce-1234567890abcdef',
      TOWER_ORG: 'nf-core',
      TOWER_WORKSPACE: 'hackathon',
    };
    vivos = new VivosTower({ name: 'VivosTowerTest' }, env);
    pipeline = vivos.get('TOWER_DEFAULT_PIPELINE');
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

  describe('LoadPipeline', () => {
    it('should load the pipeline correctly', async () => {
      const result = await vivos.load_pipeline(pipeline, env);
      expect(result).toBeDefined();
      expect(result.pipeline).toContain(pipeline);
      expect(result.computeEnvId).toContain(env.computeEnvId);
      expect(result.paramsText).toContain(env.bucket);
    });
    it.skip('should throw an error if the pipeline is not found', async () => {
      const non_pipeline = 'nonexistent-pipeline';
      const action = async () => vivos.load_pipeline(non_pipeline, env);
      expect(action).toThrow();
    });
    it('should generate valid launch_options', async () => {
      const event = helpers.event_data_local();
      const evivos = new VivosTower(event, { BASE_CONFIG: './config' });
      const bucket = evivos.event_bucket;
      const launchOptions = await evivos.launch_options();
      expect(launchOptions).toBeDefined();
      expect(launchOptions.computeEnvId).toBe(evivos.get('TOWER_COMPUTE_ENV_ID'));
      expect(launchOptions.configProfiles).toEqual(['standard']);
      expect(launchOptions.configText).toBe("plugins = ['nf-quilt']");

      expect(launchOptions.revision).toBe('main');

      const params = launchOptions.paramsText!;
      if (helpers.get('GITHUB_ACTIONS') === undefined) {
        expect(launchOptions.pipeline).toContain(pipeline);
        expect(launchOptions.workDir).toContain(bucket);
        expect(params).toContain(bucket);
        expect(params).toContain(pipeline);
      }

      const status = await evivos.getStatus();
      expect(status).toBeDefined();

      const dict = evivos.toDict();
      expect(dict).toBeDefined();
      expect(dict.event).toEqual(event);
    });
  });


  // itif(hasOutput)
  IT.ifhas('LAUNCH_WORKFLOWS')('should launch a workflow', async () => {
    const bucket = vivos.get('CDK_DEFAULT_BUCKET');
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
