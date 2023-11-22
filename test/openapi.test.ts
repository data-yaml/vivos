import { readFileSync } from 'fs';
import yaml from 'js-yaml';
import { Document, OpenAPIClientAxios } from 'openapi-client-axios';
import type { Client as BenchlingClient } from '../src/types/benchling';
import type { Client as PetStoreClient } from '../src/types/petstore';
import type { Client as TowerClient } from '../src/types/tower';

describe('OpenAPI', () => {
  test('should init PetStore Client', async () => {
    const api = new OpenAPIClientAxios({
      definition: 'https://petstore3.swagger.io/api/v3/openapi.json',
    });
    try {
      const client = await api.init<PetStoreClient>();
      expect(client).toBeDefined();
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
      const client = await api.init<BenchlingClient>();
      expect(client).toBeDefined();
      // const result = await client.listEntries();
      //expect(result.status).toBe(200);

    } catch (e) {
      console.log(e);
      expect(e).toBeUndefined();
    }
  });
  test('should init Tower Client', async () => {
    const TOWER_YAML = './api/tower.yaml';
    const yaml_doc = yaml.load(readFileSync(TOWER_YAML, 'utf8')) as Document;
    const api = new OpenAPIClientAxios({
      definition: yaml_doc,
    });
    expect(api).toBeDefined();
    try {
      const client = await api.init<TowerClient>();
      expect(client).toBeDefined();
    } catch (e) {
      console.log(e);
      expect(e).toBeUndefined();
    }
  });
});
