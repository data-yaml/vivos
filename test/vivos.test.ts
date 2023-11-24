import { Constants } from '../src/constants';
import { Vivos } from '../src/vivos';

describe('Vivos', () => {
  let vivos: Vivos;

  beforeEach(() => {
    const ctx = { OPEN_API_FILE: Constants.DEFAULTS.PETSTORE_API_FILE };
    vivos = new Vivos({ name: 'VivosTest' }, ctx);
  });

  it('should error if OPEN_API_FILE not provided', () => {
    expect(() => {
      new Vivos({ name: 'VivosTest' }, {});
    }).toThrow('OPEN_API_FILE not provided');
  });
  it('should load the config from a file', () => {
    const config = Vivos.loadConfig(Constants.DEFAULTS.PETSTORE_API_FILE);
    // print keys of config
    for (const key in config) {
      console.log(key);
      console.log(config[key]);
    }

    // Assert that the config is loaded correctly
    expect(config.info.title).toContain('Petstore');
  });
  it('should load the API definition', () => {
    expect(vivos.api).toBeDefined();
  });
  it('should return a string representation of the Vivos instance', () => {
    const str = vivos.toString();

    // Assert that the string representation is correct
    expect(str).toContain('VivosTest');
    expect(str).toContain(Constants.DEFAULTS.PETSTORE_API_FILE);
  });
});
