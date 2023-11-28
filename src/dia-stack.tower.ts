import { VivosTower } from './vivos.tower';
export async function handler(event: any, context: any) {
  const vivos = new VivosTower(event, context);
  await vivos.log(`VivosTower.handler.event: ${JSON.stringify(event)}`);

  try {
    // Submit the workflow using Axios
    const options = vivos.launch_options('quiltdata/nf-quilt', vivos.get('TOWER_OUTPUT_BUCKET'));
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
    return {
      statusCode: 500,
      body: error.message,
    };
  }
}
