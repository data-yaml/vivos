import { IT } from './helpers';
import Constants from '../src/constants';
import { VivosBenchling, Entry } from '../src/vivos.benchling';


describe('VivosBenchling', () => {
  let vivos: VivosBenchling;
  let entry: Entry;

  beforeEach(() => {
    const event = Constants.LoadObjectFile('test/data/event-params.json');
    vivos = new VivosBenchling(event, {});
    entry = Constants.LoadObjectFile(Constants.DEFAULTS.TEST_ENTRY_FILE);
  });

  IT.ifhas('BENCHLING_ACCESS_TOKEN')('should getEventParams', async () => {
    const params = await vivos.getEventParams();
    expect(params).toBeDefined();
    expect(params).toHaveProperty('outdir');
  });

  IT.ifhas('BENCHLING_ACCESS_TOKEN')('should getReportURL', () => {
    const url = vivos.getReportURL();
    expect(url).toBeDefined();
    expect(url).toEqual('https://demo.quiltdata.com/b/nf-core-gallery/packages/quiltdata/nf-quilt/latest/tree/multiqc/multiqc_report.html');
  });

  IT.ifhas('BENCHLING_ACCESS_TOKEN')('should return toDict', () => {
    const dict = vivos.toDict();
    expect(dict).toBeDefined();
    expect(dict).toHaveProperty('event_object');
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
