import { KeyedConfig } from './constants';
import { Pipe } from './pipe';
import { VivosTower } from './vivos.tower';

export class PipeTower extends Pipe {
  public static TOWER_DEFAULTS = {
    TOWER_DEFAULT_PIPELINE: 'nf-core/hlatyping',
  };

  public static getPrefix(): string {
    return 'tower';
  }

  readonly tower: VivosTower;
  constructor(event: any, context: any) {
    super(event, context);
    this.tower = new VivosTower(event, context);
    // ensure event contains a config file
  }

  public async run(input: KeyedConfig) {
    console.debug('PipeTower.run(input)', JSON.stringify(input));
    try {
      // Submit the workflow using NextFlow Tower
      const options = await this.tower.launch_options();
      const workflowId = await this.tower.launch(options);
      return {
        statusCode: 200,
        body: workflowId,
        url: this.tower.getTowerURL(workflowId),
        ...input,
      };
    } catch (error: any) {
      console.error(error);
      return {
        statusCode: 500,
        body: error.message,
      };
    }
  }
}
