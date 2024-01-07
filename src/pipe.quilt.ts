import { Pipe } from './pipe';

export class PipeQuilt extends Pipe {

  public static QUILT_DEFAULTS = {
    QUILT_VPC: 'sales-production',
    QUILT_DOCKER_IMAGE: '850787717197.dkr.ecr.us-east-1.amazonaws.com/edp-container-registry:latest',
  };

  public static QUILT_KEYS(): string[] {
    return Object.keys(PipeQuilt.QUILT_DEFAULTS);
  }

  public static getPrefix(): string {
    return 'quilt';
  }

  constructor(event: any, context: any) {
    super(event, context);
    // ensure event contains a config file
  }
}
