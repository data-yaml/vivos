import { Vivos } from './vivos';

export async function handler(event: any, context: any) {
  const vivos = new Vivos(event, context);

  try {
    // Submit the workflow using Axios
    const response = await vivos.call('nextflow');
    // Return the response
    return {
      statusCode: response.status,
      body: response.data,
    };
  } catch (error: any) {
    // Handle any errors
    return {
      statusCode: 500,
      body: error.message,
    };
  }
}
