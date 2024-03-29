import fs from 'fs';
import { helpers } from './helpers';
import Constants from '../src/constants';
import { UPath } from '../src/upath';

describe('UPath', () => {

  describe('DefaultS3', () => {
    it('should return a valid S3 client', () => {
      const s3 = UPath.DefaultS3();
      expect(s3).toBeDefined();
    });
  });

  describe('FromURI', () => {
    it('should return a valid UPath object for S3 uris', () => {
      const uri = helpers.pipe_uri_s3();
      const result = UPath.FromURI(uri);
      expect(result).toBeDefined();
      expect(result.scheme).toEqual('s3');
      expect(result.bucket).toEqual(helpers.get('TEST_BUCKET'));
      expect(result.key).toEqual(helpers.get('TEST_KEY'));
    });
    it('should return a valid UPath object for file uris', () => {
      const uri = helpers.pipe_uri_local();
      const result = UPath.FromURI(uri);
      expect(result).toBeDefined();
      expect(result.scheme).toEqual('file');
      expect(result.bucket).toEqual('');
      expect(result.key).toContain(helpers.get('TEST_KEY'));
    });
    it('should return a valid UPath object for relative file paths', () => {
      const uri = `./${helpers.get('TEST_KEY')}`;
      const result = UPath.FromURI(uri);
      expect(result).toBeDefined();
      expect(result.scheme).toEqual('file');
      expect(result.key).toEqual(uri);
    });
    it('should throw an error if the URI is invalid', () => {
      const invalidScheme = 'https://quilt-example.com';
      const action = () => UPath.FromURI(invalidScheme);
      expect(action).toThrow();
    });
  });

  describe('extension', () => {
    it('should return the correct extension', () => {
      const result = helpers.s3_upath();
      expect(result).toBeDefined();
      expect(result.extension()).toEqual('json');
    });
    it('should replace the extension correctly', () => {
      const result = helpers.s3_upath();
      expect(result).toBeDefined();
      const replaced = result.replaceExtension('yaml');
      expect(replaced).toBeDefined();
      expect(replaced.extension()).toEqual('yaml');
    });
  });

  describe('append', () => {
    it('should append the correct key', () => {
      const root = `s3://${helpers.get('TEST_BUCKET')}/${helpers.get('TEST_DIR')}`;
      const parent = helpers.s3_upath().parent();
      expect(parent).toBeDefined();
      expect(parent.toURI()).toEqual(root);
      const appended = parent.append('test.txt');
      expect(appended).toBeDefined();
      expect(appended.toURI()).toEqual(`${root}/test.txt`);
    });
  },

  );
  describe('toString()', () => {
    it('should return the correct string representation', () => {
      const result = helpers.s3_upath();
      expect(result).toBeDefined();
      expect(result.toString()).toContain(helpers.pipe_uri_s3());
    });
  });

  describe('parse', () => {
    // NOTE: requires network connection
    it('should parse s3 object data correctly', async () => {
      const result = await helpers.event_data_s3();
      expect(result).toBeDefined();
      const bucket = Constants.GetKeyPathFromObject(result, 'detail.bucket.name');
      expect(bucket).toEqual(helpers.get('TEST_BUCKET'));
    });
    it('should parse local data correctly', async () => {
      const result = await helpers.event_data_local();
      const bucket = Constants.GetKeyPathFromObject(result, 'detail.bucket');
      expect(bucket).toHaveProperty('name');
      const name = Constants.GetKeyPathFromObject(bucket, 'name');
      expect(name).toEqual('');
    });
  });

  describe('save', () => {
    // NOTE: SKIP S3.save to avoid network connection
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

  describe('getAttributes', () => {
    // Network Call; requires AWS credentials
    it('should return the correct S3 attributes', async () => {
      const result = await helpers.s3_upath().getAttributes();
      expect(result).toBeDefined();
      expect(result).toHaveProperty('ObjectSize');
      expect(result).toHaveProperty('LastModified');
      const timestamp = result.LastModified;
      expect(timestamp).toBeDefined();
      expect(timestamp).toBeInstanceOf(Date);
    });
    it('should return the correct attributes for a local file', async () => {
      const result = await helpers.local_upath().getAttributes();
      expect(result).toBeDefined();
      expect(result).toHaveProperty('ObjectSize');
      expect(result).toHaveProperty('LastModified');
      const timestamp = result.LastModified;
      expect(timestamp).toBeDefined();
      //expect(timestamp).toBeInstanceOf(Date); psuedo-Date?
    });
  });
});
