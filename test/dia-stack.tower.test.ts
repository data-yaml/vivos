import { Constants } from '../src/constants';
import { handler } from '../src/dia-stack.tower';

describe('dia-stack.tower.handler', () => {
  it('should return a response', async () => {
    // Mock the event and context objects
    const event = {};
    const context = { OPEN_API_FILE: Constants.DEFAULTS.TOWER_API_FILE };

    // Call the handler function
    const response = await handler(event, context);

    // Assert that the response is not null or undefined
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(500);
  });
});
