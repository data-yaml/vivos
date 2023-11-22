import { Vivos } from '../src/vivos';

const YAML_API = './api/petstore.yaml';

describe('Vivos', () => {
  let vivos: Vivos;

  beforeEach(() => {
    vivos = new Vivos({ name: 'VivosTest' }, { file: YAML_API });
  });

  describe('loadConfig', () => {
    it('should load the config from a file', () => {
      const config = Vivos.loadConfig(YAML_API);
      // print keys of config
      for (const key in config) {
        console.log(key);
        console.log(config[key]);
      }

      // Assert that the config is loaded correctly
      expect(config.info.title).toContain('Petstore');
    });
  });

  describe('loadApi', () => {
    it('should load the API definition', () => {
      const api = vivos.loadApi(YAML_API);

      // Assert that the API is loaded correctly
      expect(api).toBeDefined();
    });
  });

  describe('toString', () => {
    it('should return a string representation of the Vivos instance', () => {
      const str = vivos.toString();

      // Assert that the string representation is correct
      expect(str).toContain('VivosTest');
      expect(str).toContain(YAML_API);
    });
  });
});
