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

  it('reads the event object', async () => {
    const obj = await pipe.getEventObject();
    console.log(obj);
    expect(obj).toBeDefined();
    expect(obj.user).toBe('ernest');
  });

  it('newer sentinel file ignores execution', async () => {
    await pipe.write_sentinel('output');
    const isNewer = await pipe.sentinel_newer();
    expect(isNewer).toBe(true);
    const result = await pipe.exec();
    expect(result.status).toEqual('ignore');
  });

  it('missing sentinel file enables execution', async () => {
    await pipe.event_sentinel.delete();
    const isNewer = await pipe.sentinel_newer();
    expect(isNewer).toBe(false);
    const result = await pipe.exec();
    expect(result.status).toEqual('success');
  });


  it('should run the pipe with input configuration', async () => {
    const output = await pipe.run(input);
    // Add your assertions here
    expect(output).toBe(input);
  });
});
