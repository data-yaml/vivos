import { App } from 'aws-cdk-lib';
import { DiaStack } from './dia-stack';

const app = new App();

new DiaStack(app, 'vivos-dev', DiaStack.defaultProps());
// new DiaStack(app, 'vivos-prod', { env: prodEnv });

app.synth();
