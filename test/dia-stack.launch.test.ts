// import { Constants } from '../src/constants';
import { IT } from './helpers';
import { handler } from '../src/dia-stack.launch';


describe('dia-stack.launch.handler', () => {
  IT.ifhas('LAUNCH_WORKFLOWS')('should return 200 when launched', async () => {
    // Mock the event and context objects
    const event = {};
    const context = { };

    const response = await handler(event, context);
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);
  });

  it.skip('should return 500 when not launched', async () => {
    // Not catching errors properly
    const event = {};
    const context = { TOWER_ACCESS_TOKEN: '' };

    const response = await handler(event, context);
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(500);
  });

});
