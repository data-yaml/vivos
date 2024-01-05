import { helpers } from './helpers';
import { Pipe } from '../src/pipe';
import { UPath } from '../src/upath';

describe('Pipe', () => {
  let pipe: Pipe;
  let input: object;

  beforeEach(() => {
    const event = helpers.event_data_local();
    pipe = new Pipe(event, {});
    input = { key: 'value' };
  });

  it('should return the correct prefix', () => {
    const prefix = Pipe.getPrefix();
    expect(prefix).toBe('ett');
  });

  it('should find the correct prefix', () => {
    const prefix = pipe.findPrefix();
    expect(prefix).toBe('prefix');
  });

  it('should check if the sentinel file is newer', async () => {
    const isNewer = await pipe.sentinel_newer();
    expect(isNewer).toBe(true);
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
