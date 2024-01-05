import { helpers } from './helpers';
import { Constants } from '../src/constants';
import { UPath } from '../src/upath';
import { Vivos } from '../src/vivos';

const PETINFO = {
  id: 1,
  category: {
    id: 1,
    name: 'dogs',
  },
  name: 'Fido',
  tags: [
    {
      id: 1,
      name: 'dog',
    },
  ],
  status: 'available',
};
describe('Vivos', () => {
  let vivos: Vivos;

  beforeEach(() => {
    const ctx = {
      OPEN_API_FILE: Constants.DEFAULTS.PETSTORE_API_FILE,
    };
    vivos = new Vivos({ name: 'VivosTest' }, ctx);
  });

  it.skip('should error if OPEN_API_FILE not provided', () => {
    expect(() => {
      new Vivos({ name: 'VivosTest' }, {});
    }).toThrow('get[OPEN_API_FILE] not a valid string: undefined');
  });

  it('should load the config from a file', async () => {
    const api_path = `${Constants.DEFAULTS.BASE_API}/${Constants.DEFAULTS.PETSTORE_API_FILE}`;
    const config = await UPath.LoadObjectURI(api_path, { region: 'us-east-1' });
    // Assert that the config is loaded correctly
    expect(config.info.title).toContain('Petstore');
  });

  it('should load the API definition', () => {
    expect(vivos.api).toBeDefined();
  });

  it('should return the event folder', async () => {
    const test_bucket = helpers.get('TEST_BUCKET');
    const test_object = helpers.get('TEST_EVENT_FILE');
    const event = helpers.get('TEST_S3_EVENT');
    const evivos = new Vivos(event, {});
    const uri = evivos.getEventObjectURI();
    expect(uri).toBe(`s3://${test_bucket}/${test_object}`);

    const path = evivos.event_path;
    expect(path).toBeDefined();
    expect(path.bucket).toBe(test_bucket);
    expect(path.key).toBe(test_object);

    const timestamp = (await evivos.getEventObjectAttributes()).LastModified;
    expect(timestamp).toBeDefined();
  });

  it('should return a string representation of the Vivos instance', () => {
    const str = vivos.toString();

    // Assert that the string representation is correct
    expect(str).toContain('VivosTest');
    expect(str).toContain(Constants.DEFAULTS.PETSTORE_API_FILE);
  });

  it('should call the API', async () => {
    const petId = 1;
    const pet = await vivos.api_post('/pet', PETINFO);
    // Assert that the pet is loaded correctly
    expect(pet.data.id).toBe(petId);

    const petById = await vivos.api_get(`/pet/${petId}`);
    // Assert that the pet is loaded correctly
    expect(petById.data.id).toBe(petId);
  });
});
