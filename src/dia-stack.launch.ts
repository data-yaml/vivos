import { VivosBenchling } from './vivos.benchling';
import { VivosTower } from './vivos.tower';

async function launch(tower: VivosTower) {
  try {
    // Submit the workflow using NextFlow Tower
    const options = tower.launch_options();
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
  return {
    'VivosBenchling.FLD_TOWER_URL': response.url,
    'VivosBenchling.FLD_STATUS': 'Launched',
  };
}

export async function handler(event: any, context: any) {
  const tower = new VivosTower(event, context);
  await tower.log(`VivosTower.handler.event: ${JSON.stringify(event)}`);
  const status = tower.getStatus();
  if (status !== '' && status[0] !== 'N') {
    // Do NOT run unless status is empty or New/No
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
  }).then((response: any) => {
    const benchling = new VivosBenchling(event, context);
    const updates = update_options(response);
    const entry_id = tower.entry.id;
    const updated = benchling.updateEntry(entry_id, updates);
    response.updated = updated;
    return response;
  });
  // This should never happen
  return {
    statusCode: 100,
    body: 'Passed',
  };
}
