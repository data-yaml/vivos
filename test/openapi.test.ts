//import type { Client as PetStoreClient } from '../src/types/petstore';
import { OpenAPIClientAxios } from 'openapi-client-axios';

describe('OpenAPI', () => {
  test('should init PetStore Client', async () => {
    const api = new OpenAPIClientAxios({
      definition: 'https://petstore.swagger.io/v2/swagger.json',
    });
    expect(api).toBeDefined();
    try {
      await api.init();
    } catch (e) {
      console.log(e);
      expect(e).toBeUndefined();
    }
  });
  test('should init Benchling Client', async () => {
    const api = new OpenAPIClientAxios({
      definition: 'https://benchling.com/api/v2/openapi.yaml',
    });
    expect(api).toBeDefined();
    try {
      await api.init();
    } catch (e) {
      console.log(e);
      expect(e).toBeUndefined();
    }
  });
});
