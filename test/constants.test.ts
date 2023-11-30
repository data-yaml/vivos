import Constants from '../src/constants';

describe('Constants', () => {
  let constants: Constants;
  let pipeline: string;
  let param_file: string;
  let env: any;

  beforeEach(() => {
    constants = new Constants({});
    pipeline = Constants.DEFAULTS.TOWER_DEFAULT_PIPELINE;
    param_file = `./config/${pipeline}/params.json`;
    env = {
      bucket: 's3://quilt-example',
      computeEnvId: 'ce-1234567890abcdef',
    };
  });

  describe('GetPackageName', () => {
    it('should return the package name from an absolute path', () => {
      const filePath = '/GitHub/vivos/src/constants.ts';
      const packageName = Constants.GetPackageName(filePath);
      expect(packageName).toEqual('GitHub/vivos');
    });
    it('should return the package name from a relative path', () => {
      const filePath = 'GitHub/vivos/src/constants.ts';
      const packageName = Constants.GetPackageName(filePath);
      expect(packageName).toEqual('GitHub/vivos');
    });
  });
  describe('LoadObjectURI', () => {
    it('should load object URI correctly', async () => {
      const uri = 's3://quilt-example/akarve/covid-directory/vega.json';
      const result = await Constants.LoadObjectURI(uri);
      expect(result).toBeDefined();
      expect(result).toHaveProperty('config');
    });

    it('should throw an error if the object URI is invalid', async () => {
      const nonExistentURI = 'https://quilt-example.com';
      await expect(Constants.LoadObjectURI(nonExistentURI)).rejects.toThrow();
    });
  });

  describe('LoadObjectFile', () => {
    it('should load object file correctly', () => {
      const result = Constants.LoadObjectFile(param_file);
      expect(result.outdir).toContain('{{ bucket }}');
    });
    it('should expand environment variables', () => {
      const result = Constants.LoadObjectFile(param_file, env);
      expect(result.outdir).toContain(env.bucket);
    });
    it('should load the pipeline correctly', () => {
      const result = Constants.LoadPipeline(pipeline, env);
      expect(result).toBeDefined();
      expect(result.pipeline).toContain(pipeline);
      expect(result.computeEnvId).toContain(env.computeEnvId);
      expect(result.paramsText).toContain(env.bucket);
    });
    it('should throw an error if the pipeline is not found', () => {
      const non_pipeline = 'nonexistent-pipeline';
      const action = () => Constants.LoadPipeline(non_pipeline, env);
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

  describe('GetKeyPathFromFile', () => {
    function checkKeyPathValue(keyPath: string, value: string) {
      const filePath = Constants.DEFAULTS.TEST_ENTRY_FILE;
      const result = Constants.GetKeyPathFromFile(filePath, keyPath);
      expect(result).toEqual(value);
    }

    it('should return the value for a given key path', () => {
      checkKeyPathValue('id', 'etr_ehERLyf6');
      checkKeyPathValue('fields.Pipeline.value', 'nf-core/hlatyping');
    });

    it('should return undefined if the key path does not exist', () => {
      const filePath = Constants.DEFAULTS.TEST_ENTRY_FILE;
      const keyPath = 'undefined.Pipeline.value';
      const result = Constants.GetKeyPathFromFile(filePath, keyPath);
      expect(result).toBeUndefined();
    });

    it('should return undefined if the file does not exist', () => {
      const filePath = './test/data/nonExistentFile.json';
      const keyPath = 'id';
      const result = Constants.GetKeyPathFromFile(filePath, keyPath);
      expect(result).toBeUndefined();
    });
  });

});
