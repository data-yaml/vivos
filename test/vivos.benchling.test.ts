// import { IT } from './helpers';
import Constants from '../src/constants';
import { UPath } from '../src/upath';
import { VivosBenchling, Entry } from '../src/vivos.benchling';

describe.skip('VivosBenchling', () => {
  let vivos: VivosBenchling;
  let entry: Entry;

  beforeEach(() => {
    const event = UPath.LoadObjectFile('test/data/event-params.json');
    entry = UPath.LoadObjectFile(helpers.get('TEST_EVENT_FILE'));
    vivos = new VivosBenchling(event, {});
  });

  it('should getEventParams', async () => {
    const params = await vivos.getEventParams();
    expect(params).toBeDefined();
    expect(params).toHaveProperty('outdir');
  });

  it('should getReportURL', () => {
    const url = vivos.getReportURL();
    expect(url).toBeDefined();
    expect(url).toEqual('https://demo.quiltdata.com/b/quilt-demos/packages/config/quiltdata/latest/tree/multiqc/multiqc_report.html');
  });

  it('should return toDict', () => {
    const dict = vivos.toDict();
    expect(dict).toBeDefined();
    expect(dict).toHaveProperty('event_object');
  });

  describe('getEntry', () => {
    it('should return an entry by id', async () => {
      const new_entry = await vivos.getEntry(entry.id!);
      expect(new_entry.apiURL).toEqual(entry.apiURL);
    });
  });

  describe('updateEntry', () => {
    it('should update an entry with the given fields', async () => {
      const timestamp = new Date().toISOString();
      const updatedEntry = await vivos.updateEntry(entry.id!, { Status: timestamp });
      const status = updatedEntry.fields?.Status?.value;
      expect(status).toEqual(timestamp);
    });
  });

});
