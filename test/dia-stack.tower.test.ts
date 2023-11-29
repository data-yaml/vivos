// import { Constants } from '../src/constants';
import { handler } from '../src/dia-stack.tower';

describe('dia-stack.tower.handler', () => {
  it.skip('should return 200 when launched', async () => {
    // Mock the event and context objects
    const event = {};
    const context = { };

    // Call the handler function
    const response = await handler(event, context);

    // Assert that the response is not null or undefined
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);
  });

  it.skip('should return 500 when not launched', async () => {
    // Mock the event and context objects
    const event = {};
    const context = { TOWER_ACCESS_TOKEN: '' };

    // Call the handler function
    const response = await handler(event, context);

    // Assert that the response is not null or undefined
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(500);
  });

});
