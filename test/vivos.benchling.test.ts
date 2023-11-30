import { IT } from './helpers';
import Constants from '../src/constants';
import { VivosBenchling, Entry } from '../src/vivos.benchling';


describe('VivosBenchling', () => {
  let vivos: VivosBenchling;
  let entry: Entry;

  beforeEach(() => {
    vivos = new VivosBenchling({}, {});
    entry = Constants.LoadObjectFile(Constants.DEFAULTS.TEST_ENTRY_FILE);
  });

  describe('getEntry', () => {
    IT.ifhas('BENCHLING_ACCESS_TOKEN')('should return an entry by id', async () => {
      const new_entry = await vivos.getEntry(entry.id!);
      expect(new_entry.apiURL).toEqual(entry.apiURL);
    });
  });

  describe('updateEntry', () => {
    IT.ifhas('BENCHLING_ACCESS_TOKEN')('should update an entry with the given fields', async () => {
      const timestamp = new Date().toISOString();
      const updatedEntry = await vivos.updateEntry(entry.id!, { Status: timestamp });
      const status = updatedEntry.fields?.Status?.value;
      expect(status).toEqual(timestamp);
    });
  });

});
