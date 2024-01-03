import { App } from 'aws-cdk-lib';
// import { DiaStack } from './dia-stack';
import { PipeStack } from './pipe-stack';

const app = new App();

// new DiaStack(app, 'vivos-dev-dia', DiaStack.DefaultProps());
new PipeStack(app, 'vivos-dev-pipe', PipeStack.DefaultProps());
// new DiaStack(app, 'vivos-prod', { env: prodEnv });

app.synth();
