import { helpers } from './helpers';
import { getSubclass, handler, PIPE_CLASSES } from '../src/pipe-stack.router';

describe('getSubclass', () => {
  it('should return the correct subclass based on the pipe type', () => {
    for (const cls of PIPE_CLASSES) {
      const prefix = cls.getPrefix();
      expect(getSubclass(prefix)).toBe(cls);
    }
  });
});

describe('handler', () => {
  it('should return error if invalid data', async () => {
    const result = await handler({}, {});
    expect(result.status).toBe('error');
  });

  it('should handle the event and context correctly', async () => {
    const event = helpers.event_data_local();
    const context = { /* mock context data */ };

    // You can add your own assertions here to test the behavior of the handler function
    const result = await handler(event, context);
    expect(result.status).toBe('success');
  });
});
