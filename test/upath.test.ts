import Constants from '../src/constants';
import { UPath } from '../src/upath';

describe('Constants', () => {
  let pipeline: string;
  let param_file: string;
  let env: any;

  beforeEach(() => {
    pipeline = Constants.DEFAULTS.TOWER_DEFAULT_PIPELINE;
    param_file = `./config/${pipeline}/params.json`;
    env = {
      bucket: 's3://quilt-example',
      computeEnvId: 'ce-1234567890abcdef',
    };
  });

  describe('DefaultS3', () => {
    it('should return a valid S3 client', () => {
      const s3 = UPath.DefaultS3();
      expect(s3).toBeDefined();
    });
  });

  describe('FromURI', () => {
    it('should return a valid UPath object for S3 uris', () => {
      const uri = 's3://quilt-demos/config/quiltdata/nf-quilt/launch.json';
      const result = UPath.FromURI(uri);
      expect(result).toBeDefined();
      expect(result.scheme).toEqual('s3');
      expect(result.bucket).toEqual('quilt-demos');
      expect(result.key).toEqual('config/quiltdata/nf-quilt/launch.json');
    });
    it('should return a valid UPath object for file uris', () => {
      const uri = 'file:///home/ubuntu/launch.json';
      const result = UPath.FromURI(uri);
      expect(result).toBeDefined();
      expect(result.scheme).toEqual('file');
      expect(result.key).toEqual('/home/ubuntu/launch.json');
    });
    it('should return a valid UPath object for relative file paths', () => {
      const uri = './test/data/entry.json';
      const result = UPath.FromURI(uri);
      expect(result).toBeDefined();
      expect(result.scheme).toEqual('file');
      expect(result.key).toEqual('./test/data/entry.json');
    });
    it('should throw an error if the URI is invalid', () => {
      const nonExistentURI = 'https://quilt-example.com';
      const action = () => UPath.FromURI(nonExistentURI);
      expect(action).toThrow();
    });
  });

  describe('extension', () => {
    it('should return the correct extension', () => {
      const uri = 's3://quilt-demos/config/quiltdata/nf-quilt/launch.json';
      const result = UPath.FromURI(uri);
      expect(result).toBeDefined();
      expect(result.extension()).toEqual('json');
    });
    it('should replace the extension correctly', () => {
      const uri = 's3://quilt-demos/config/quiltdata/nf-quilt/launch.json';
      const result = UPath.FromURI(uri);
      expect(result).toBeDefined();
      expect(result.replaceExtension('yaml').extension()).toEqual('yaml');
    });
  });

  describe('LoadObjectURI', () => {
    it('should load object URI correctly', async () => {
      const uri = 's3://quilt-demos/config/quiltdata/nf-quilt/launch.json';
      const result = await UPath.LoadObjectURI(uri);
      expect(result).toBeDefined();
      expect(result).toHaveProperty('revision');
    });
    it('should local relative path correctly', async () => {
      const uri = './test/data/entry.json';
      const result = await UPath.LoadObjectURI(uri);
      expect(result).toBeDefined();
      expect(result).toHaveProperty('id');
    });
    it('should throw an error if the object URI is invalid', async () => {
      const nonExistentURI = 'https://quilt-example.com';
      await expect(UPath.LoadObjectURI(nonExistentURI)).rejects.toThrow();
    });
  });

  describe('LoadObjectFile', () => {
    it('should load object file correctly', () => {
      const result = UPath.LoadObjectFile(param_file);
      expect(result.outdir).toContain('{{ bucket }}');
    });
    it('should expand environment variables', () => {
      const result = UPath.LoadObjectFile(param_file, env);
      expect(result.outdir).toContain(env.bucket);
    });
    it('should load the pipeline correctly', async () => {
      const result = await Constants.LoadPipeline(pipeline, env);
      expect(result).toBeDefined();
      expect(result.pipeline).toContain(pipeline);
      expect(result.computeEnvId).toContain(env.computeEnvId);
      expect(result.paramsText).toContain(env.bucket);
    });
    it.skip('should throw an error if the pipeline is not found', async () => {
      const non_pipeline = 'nonexistent-pipeline';
      const action = async () => Constants.LoadPipeline(non_pipeline, env);
      expect(action).toThrow();
    });
  });

});
