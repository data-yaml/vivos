
import Constants, { KeyedConfig } from '../src/constants';

describe('Constants', () => {
  let constants: Constants;

  beforeEach(() => {
    constants = new Constants({});
  });

  it('should load object file correctly', () => {
    const filePath = './test/data/vivos.json';
    const expectedConfig: KeyedConfig = {
      apiUrl: 'https://api.example.com',
      apiKey: 'your-api-key',
      timeout: 5000,
    };

    const result = Constants.loadObjectFile(filePath);

    expect(result).toEqual(expectedConfig);
  });

  it('should get the correct value for a given key', () => {
    const key = 'TOWER_API_URL';
    const expectedValue = 'https://api.tower.nf';

    const result = constants.get(key);

    expect(result).toEqual(expectedValue);
  });

  it('should put a value for a given key', () => {
    const key = 'TOWER_API_URL';
    const value = 'https://api.example.com';

    constants.put(key, value);

    const result = constants.get(key);
    expect(result).toEqual(value);
  });
});
