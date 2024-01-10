import { KeyedConfig } from './constants';
import { Pipe } from './pipe';
import { PipeQuilt } from './pipe.quilt';
import { VivosTower } from './vivos.tower';

export class PipeTower extends Pipe {
  public static TOWER_DEFAULTS = {
    TOWER_DEFAULT_PIPELINE: 'nf-core/hlatyping',
  };

  public static getPrefix(): string {
    return 'tower';
  }

  readonly tower: VivosTower;
  readonly quilt: PipeQuilt;
  readonly sourceURI: string;
  readonly destURI: string;

  constructor(event: any, context: any) {
    super(event, context);
    this.tower = new VivosTower(event, context);
    this.quilt = new PipeQuilt(event, context);
    const packageName = this.quilt.packageName();
    const sourceBucket = this.quilt.get('QUILT_NEXT');
    const destBucket = this.quilt.get('QUILT_PROD');
    this.sourceURI = `quilt+s3://${sourceBucket}#package=${packageName}`;
    this.destURI = `quilt+s3://${destBucket}#package=${packageName}`;

    // ensure event contains a config file
  }

  // Create samplesheet.csv from files matching pattern in folder
  public async createSamplesheet(pattern: string) {
    const HEADER = 'sample,fastq_1,fastq_2,bam,seq_type\nSAMPLE_FASTQ,';
    const FOOTER = ',,dna';
    const parent = this.event_path.parent();
    const files = await parent.matchingS3(pattern);
    const uris = files.map((file) => file.toURI()).join(',');
    const rows = HEADER + uris + FOOTER;
    const samplesheet = parent.append('samplesheet.csv');
    await samplesheet.save(rows);
  }

  public async run(input: KeyedConfig) {
    console.debug('PipeTower.run(input)', JSON.stringify(input));
    if (input.hasOwnProperty('quilt')) {
      // Run the quilt pipeline to create package at sourceURI
      // TODO: override package name from input.quilt
      await this.quilt.run(input.quilt);
    }
    if (input.hasOwnProperty('pattern_suffix')) {
      // Create samplesheet from matching files
      await this.createSamplesheet(input.pattern_suffix);
    }
    const user_meta = (input.hasOwnProperty('user_meta')) ? '?' + JSON.stringify(input.user_meta) : '';
    console.log('user_meta', user_meta);

    try {
      // Submit the workflow using NextFlow Tower
      const options = await this.tower.launch_options(
        input.pipeline,
        `s3://${this.quilt.get('QUILT_PROD')}`,
        `s3://${this.quilt.get('QUILT_NEXT')}`,
        user_meta,
      );
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
