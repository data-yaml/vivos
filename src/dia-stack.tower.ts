import { VivosTower } from './vivos.tower';

async function launch(vivos: VivosTower) {
  try {
    // Submit the workflow using Axios
    const options = vivos.launch_options();
    await vivos.log(`VivosTower.handler.options: ${JSON.stringify(options)}`);

    const workflowId = await vivos.launch(options);
    await vivos.log(`VivosTower.handler.workflowId: ${workflowId}`);
    // Return the response
    return {
      statusCode: 200,
      body: workflowId,
    };
  } catch (error: any) {
    // Return the error
    console.error(error);
    return {
      statusCode: 500,
      body: error.message,
    };
  }
}

export async function handler(event: any, context: any) {
  const vivos = new VivosTower(event, context);
  await vivos.log(`VivosTower.handler.event: ${JSON.stringify(event)}`);
  const status = vivos.getStatus();
  if (status === '' || status[0] === 'N') {
    console.warn(`VivosTower.not_launched.status=${status}\n${vivos}`);
    return {
      statusCode: 204,
      body: status,
    };
  }
  await launch(vivos).catch((error: any) => {
    console.error(error);
    return {
      statusCode: 500,
      body: error.message,
    };
  }).then((response: any) => {
    console.debug(`VivosTower.handler.response: ${JSON.stringify(response)}`);
    return response;
  });
  return {
    statusCode: 200,
    body: 'Launched',
  };
}
