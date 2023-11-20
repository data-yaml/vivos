import { App, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class VivosStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    // define resources here...
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new VivosStack(app, 'vivos-dev', { env: devEnv });
// new VivosStack(app, 'vivos-prod', { env: prodEnv });

app.synth();
