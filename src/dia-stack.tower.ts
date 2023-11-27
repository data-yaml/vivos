import { VivosTower } from './vivos.tower';

export async function handler(event: any, context: any) {
  const vivos = new VivosTower(event, context);

  try {
    // Submit the workflow using Axios
    const options = vivos.launch_options('nextflow', 's3://quilt-example');
    const workflowId = await vivos.launch(options);
    console.log(`Workflow ID: ${workflowId}`);
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
