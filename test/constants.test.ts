import Constants from '../src/constants';

describe('Constants', () => {
  let constants: Constants;

  beforeEach(() => {
    constants = new Constants({});
  });

  describe('GetPackageName', () => {
    it('should return the package name from an absolute path', () => {
      const filePath = '/GitHub/vivos/src/constants.ts';
      const packageName = Constants.GetPackageName(filePath);
      expect(packageName).toEqual('GitHub/vivos');
    });
    it('should return the package name from a relative path', () => {
      const filePath = 'GitHub/vivos/src/constants.ts';
      const packageName = Constants.GetPackageName(filePath);
      expect(packageName).toEqual('GitHub/vivos');
    });
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

  describe('GetKeyPathFromFile', () => {
    function checkKeyPathValue(keyPath: string, value: any) {
      const filePath = Constants.DEFAULTS.TEST_ENTRY_FILE;
      const result = Constants.GetKeyPathFromFile(filePath, keyPath);
      expect(result).toEqual(value);
    }

    it('should return the value for a given key path', () => {
      checkKeyPathValue('version', '0');
      checkKeyPathValue('detail.object.size', 39500);
    });

    it('should return undefined if the key path does not exist', () => {
      const filePath = Constants.DEFAULTS.TEST_ENTRY_FILE;
      const keyPath = 'undefined.Pipeline.value';
      const result = Constants.GetKeyPathFromFile(filePath, keyPath);
      expect(result).toBeUndefined();
    });

    it('should return undefined if the file does not exist', () => {
      const filePath = './test/data/nonExistentFile.json';
      const keyPath = 'id';
      const result = Constants.GetKeyPathFromFile(filePath, keyPath);
      expect(result).toBeUndefined();
    });
  });

});
