import { KeyedConfig } from './constants';
import { VivosBenchling } from './vivos.benchling';

function update_options(benchling: VivosBenchling) {
  const options: KeyedConfig = {};
  options[VivosBenchling.FLD_STATUS] = 'Success';
  options[VivosBenchling.FLD_MULTIQC] = benchling.getReportURL();
  return options;
}

export async function handler(event: any, context: any) {
  const benchling = new VivosBenchling(event, context);
  const updates = update_options(benchling);
  const params = await benchling.getEventParams();
  const entry_id = params.benchling!.id!;
  const updated = await benchling.updateEntry(entry_id, updates);
  return {
    statusCode: 200,
    body: updated,
  };
}
