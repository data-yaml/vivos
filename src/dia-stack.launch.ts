import { KeyedConfig } from './constants';
import { VivosBenchling } from './vivos.benchling';
import { VivosTower } from './vivos.tower';

async function launch(tower: VivosTower) {
  try {
    // Submit the workflow using NextFlow Tower
    const options = await tower.launch_options();
    await tower.log(`VivosTower.handler.options: ${JSON.stringify(options)}`);
    const workflowId = await tower.launch(options);
    return {
      statusCode: 200,
      body: workflowId,
      url: tower.getTowerURL(workflowId),
    };
  } catch (error: any) {
    console.error(error);
    return {
      statusCode: 500,
      body: error.message,
    };
  }
}

function update_options(response: any) {
  const result: KeyedConfig = {};
  const tower_url = VivosBenchling.FLD_TOWER_URL;
  const status = VivosBenchling.FLD_STATUS;
  result[tower_url] = response.url;
  result[status] = 'Launched';
  return result;
}

export async function handler(event: any, context: any) {
  const tower = new VivosTower(event, context);
  await tower.log(`VivosTower.handler.event: ${JSON.stringify(event)}`);
  const status = await tower.getStatus();
  const entry = await tower.getEventEntry();
  if (status !== '' && status[0] !== 'N' && status[0] !== '2') {
    // Do NOT run unless status is empty or New/No (and not test Timestamp)
    console.warn(`VivosTower.not_launched.status=${status}\n${tower}`);
    return {
      statusCode: 204,
      body: status,
    };
  }
  await launch(tower).catch((error: any) => {
    console.error(error);
    return {
      statusCode: 500,
      body: error.message,
    };
  }).then(async (response: any) => {
    const benchling = new VivosBenchling(event, context);
    const updates = update_options(response);
    const entry_id: string = entry!.id! as string; // Explicitly cast entry_id to string
    const updated = await benchling.updateEntry(entry_id, updates); // Await the updateEntry method
    response.updated = updated;
    return response;
  });
  // This should never happen
  return {
    statusCode: 100,
    body: 'Passed',
  };
}
