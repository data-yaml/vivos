import { App } from 'aws-cdk-lib';
import { DiaStack } from './dia-stack';
import { LogStack } from './log-stack';

const app = new App();

new DiaStack(app, 'vivos-dev-dia', DiaStack.DefaultProps());
new LogStack(app, 'vivos-dev-log', LogStack.DefaultProps());
// new DiaStack(app, 'vivos-prod', { env: prodEnv });

app.synth();
