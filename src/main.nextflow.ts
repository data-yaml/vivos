
import axios from 'axios';
import fs from 'fs';

export async function handler (event: any, _context: any) {
  try {
    console.debug('event', event);
    // Get the VIVOS_CONFIG_FILE environment variable
    console.debug('process.env.VIVOS_CONFIG_FILE', process.env.VIVOS_CONFIG_FILE);
    const configFilePath = process.env.VIVOS_CONFIG_FILE;

    // Check if the config file path is provided
    if (configFilePath === undefined) {
      throw new Error('VIVOS_CONFIG_FILE environment variable is not set');
    }

    // read config file
    console.debug('configFilePath', configFilePath);
    // readFileSync returns a Buffer
    const configData = fs.readFileSync(configFilePath, 'utf-8');
    const config = JSON.parse(configData);
    console.debug('config', config);

    // Submit the workflow using Axios
    const response = await axios.post(config.workflowEndpoint, config.workflowData);

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
};
