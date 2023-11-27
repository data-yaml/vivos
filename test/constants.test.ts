import Constants from '../src/constants';

describe('Constants', () => {
  let constants: Constants;
  let pipeline: string;
  let param_file: string;
  let env: any;

  beforeEach(() => {
    constants = new Constants({});
    pipeline = Constants.DEFAULTS.TOWER_TEST_PIPELINE;
    param_file = `./config/${pipeline}/params.json`;
    env = {
      bucket: 's3://quilt-example',
      computeEnvId: 'ce-1234567890abcdef',
    };
  });

  describe('loadObjectFile', () => {
    it('should load object file correctly', () => {
      const result = Constants.loadObjectFile(param_file);
      expect(result.outdir).toContain('{{ bucket }}');
    });
    it('should expand environment variables', () => {
      const result = Constants.loadObjectFile(param_file, env);
      expect(result.outdir).toContain(env.bucket);
    });
    it('should load the pipeline correctly', () => {
      const result = Constants.loadPipeline(pipeline, env);
      expect(result).toBeDefined();
      expect(result.pipeline).toContain(pipeline);
      expect(result.computeEnvId).toContain(env.computeEnvId);
      expect(result.paramsText).toContain(env.bucket);
    });
    it('should throw an error if the pipeline is not found', () => {
      const non_pipeline = 'nonexistent-pipeline';
      const action = () => Constants.loadPipeline(non_pipeline, env);
      expect(action).toThrow();
    });
  });

  it('should get the correct value for a given key', () => {
    const key = 'TOWER_API_URL';
    const expectedValue = 'https://api.tower.nf';

    const result = constants.get(key);
    expect(result).toEqual(expectedValue);
  });

  it('should put a value for a given key', () => {
    const key = 'TOWER_API_URL';
    const value = 'https://api.example.com';

    constants.put(key, value);

    const result = constants.get(key);
    expect(result).toEqual(value);
  });
});
