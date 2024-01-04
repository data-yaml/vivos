import fs from 'fs';
import Constants from '../src/constants';
import { UPath } from '../src/upath';

describe('Constants', () => {
  let bucket: string;
  let pipeline: string;
  let rel_uri: string;
  let env: any;
  let test_uri: string;

  beforeEach(() => {
    bucket = Constants.GET('TEST_BUCKET');
    pipeline = Constants.GET('TOWER_DEFAULT_PIPELINE');
    rel_uri = `./config/${pipeline}/params.json`;
    test_uri = `s3://${bucket}/${rel_uri}`;
    env = {
      bucket: `s3://${bucket}`,
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
      const result = UPath.FromURI(test_uri);
      expect(result).toBeDefined();
      expect(result.scheme).toEqual('s3');
      expect(result.bucket).toEqual(bucket);
      expect(rel_uri).toContain(result.key);
    });
    it('should return a valid UPath object for file uris', () => {
      const uri = 'file:///home/ubuntu/launch.json';
      const result = UPath.FromURI(uri);
      expect(result).toBeDefined();
      expect(result.scheme).toEqual('file');
      expect(result.key).toEqual('/home/ubuntu/launch.json');
    });
    it('should return a valid UPath object for relative file paths', () => {
      const result = UPath.FromURI(rel_uri);
      expect(result).toBeDefined();
      expect(result.scheme).toEqual('file');
      expect(result.key).toEqual(rel_uri);
    });
    it('should throw an error if the URI is invalid', () => {
      const nonExistentURI = 'https://quilt-example.com';
      const action = () => UPath.FromURI(nonExistentURI);
      expect(action).toThrow();
    });
  });

  describe('extension', () => {
    it('should return the correct extension', () => {
      const result = UPath.FromURI(rel_uri);
      expect(result).toBeDefined();
      expect(result.extension()).toEqual('json');
    });
    it('should replace the extension correctly', () => {
      const result = UPath.FromURI(rel_uri);
      expect(result).toBeDefined();
      expect(result.replaceExtension('yaml').extension()).toEqual('yaml');
    });
  });

  describe('LoadObjectURI', () => {
    it('should load s3 object URI correctly', async () => {
      const result = await UPath.LoadObjectURI(test_uri);
      expect(result).toBeDefined();
      expect(result).toHaveProperty('benchling');
    });
    it('should local relative path correctly', async () => {
      const result = await UPath.LoadObjectURI(rel_uri, { benchling: 'test_tenant' } );
      expect(result).toBeDefined();
      expect(result).toHaveProperty('benchling');
      expect(result.benchling).toEqual('test_tenant');
    });
    it('should throw an error if the object URI is invalid', async () => {
      const nonExistentURI = 'https://quilt-example.com';
      await expect(UPath.LoadObjectURI(nonExistentURI)).rejects.toThrow();
    });
  });

  describe('LoadObjectFile', () => {
    it('should load object file correctly', () => {
      const result = UPath.LoadObjectFile(rel_uri);
      expect(result.outdir).toContain('{{ bucket }}');
    });
    it('should expand environment variables', () => {
      const result = UPath.LoadObjectFile(rel_uri, env);
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

  describe('save', () => {
    it('should save contents to a local file', () => {
      const contents = 'Hello, world!';
      const temp_upath = UPath.TemporaryFile();
      temp_upath.saveLocal(contents);

      const savedContents = fs.readFileSync(temp_upath.key, 'utf8');
      expect(savedContents).toEqual(contents);
    });

    it('should throw an error if saving to an invalid S3 object', async () => {
      const bad_bucket = 'my-bucket';
      const key = 'nonexistent-object.txt';
      const contents = 'Hello, world!';
      const upath = new UPath(key, bad_bucket);

      await expect(upath.saveS3(contents)).rejects.toThrow();
    });
  });

});
