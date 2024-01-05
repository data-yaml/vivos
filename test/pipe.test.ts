import { helpers } from './helpers';
import { Constants, KeyedConfig } from '../src/constants';
import { Pipe } from '../src/pipe';

describe('Pipe', () => {
  let event: KeyedConfig;
  let pipe: Pipe;
  let input: object;

  beforeEach( async() => {
    event = await helpers.event_data_local();
    pipe = new Pipe(event, {});
    input = { key: 'value' };
  });

  it('should create a valid pipe', () => {
    const event_key = Constants.GetKeyPathFromObject(event, 'detail.object.key');
    expect(event_key).toEqual(helpers.get('TEST_KEY'));
    expect(pipe.event_object).toEqual(event_key);
    const path = pipe.event_path;
    expect(path).toBeDefined();
    expect(path.bucket).toBe('');
    expect(path.scheme).toBe('file');
  });

  it('should return the correct prefix', () => {
    const prefix = Pipe.getPrefix();
    expect(prefix).toBe('test');
  });

  it('should find the correct prefix', () => {
    const prefix = pipe.findPrefix();
    expect(prefix).toBe('test');
  });

  it('should check if the sentinel file is newer', async () => {
    const isNewer = await pipe.sentinel_newer();
    expect(isNewer).toBe(false);
  });

  it('should write the sentinel file', async () => {
    await pipe.write_sentinel('output');
    // Add your assertions here
  });

  it('should execute the pipe', async () => {
    const result = await pipe.exec();
    expect(result).toEqual({ status: 'success' });
    // Add your assertions here

  });

  it('should run the pipe with input configuration', async () => {
    const output = await pipe.run(input);
    // Add your assertions here
    expect(output).toBe(input.toString());
  });
});
