import axios from 'axios';
import { Constants } from '../src/constants';
import { handler } from '../src/dia-stack.tower';

describe('handler', () => {
  it('should return a response', async () => {
    // Mock the event and context objects
    const event = {};
    const context = { OPEN_API_FILE: Constants.DEFAULTS.TOWER_API_FILE };

    // Call the handler function
    const response = await handler(event, context);

    // Assert that the response is not null or undefined
    expect(response).toBeDefined();
  });

  it.skip('should make an axios request', async () => {
    // Mock the event and context objects
    const event = {};
    const context = {
      VIVOS_CONFIG_FILE: './test/data/vivos.json',
    };

    // Spy on the axios request method
    const axiosSpy = jest.spyOn(axios, 'request');

    // Call the handler function
    const response = await handler(event, context);
    expect(response.statusCode).toEqual(200);

    // Assert that the axios request method was called
    expect(axiosSpy).toHaveBeenCalled();
  });

  // Add more test cases to cover different scenarios of the handler function
});
