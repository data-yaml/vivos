import { App } from 'aws-cdk-lib';
// import { DiaStack } from './dia-stack';
import { PipeStack } from './pipe-stack';

const app = new App();

// new DiaStack(app, 'vivos-dev-dia', DiaStack.DefaultProps());
const props = PipeStack.DefaultProps();
props.buckets.push('quilt-sales-raw');
props.buckets.push('quilt-sales-staging');
new PipeStack(app, 'vivos-demo', props);
// new DiaStack(app, 'vivos-prod', { env: prodEnv });

app.synth();
