import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { VivosStack, VivosStackProps } from '../src/vivos-stack';

describe('VivosStack', () => {

  let app: App;
  let stack: VivosStack;
  let stackProps: VivosStackProps;

  beforeEach(() => {
    app = new App();
    stackProps = {
      account: '123456789012',
      region: 'us-east-1',
      email: 'test@example.com',
    };
    stack = new VivosStack(app, 'test', stackProps);
  });

  test('statusTopic', () => {
    expect(stack.statusTopic).toBeDefined();
    const topic = stack.statusTopic;
    expect(topic.topicArn).toBeDefined();
  });

  test('workBucket', () => {
    expect(stack.workBucket).toBeDefined();
    const bucket = stack.workBucket;
    expect(bucket.bucketName).toBeDefined();
  });

  test('Snapshot', () => {
    const template = Template.fromStack(stack);
    expect(template.toJSON()).toMatchSnapshot();
  });

  test('MakeEnvars', () => {
    const env = {
      MY_ENV_VAR: 'my-value',
    };
    const envars = stack.makeEnvars(env, stack.statusTopic);

    expect(envars.MY_ENV_VAR).toEqual('my-value');
    expect(envars.LOG_LEVEL).toEqual('ALL');
    expect(envars.BASE_API).not.toEqual('./api');
  });

  test('MakeLambdaRole', () => {
    const lambdaPrincipal = new ServicePrincipal('s3.amazonaws.com');
    const lambdaRole = stack.makeLambdaRole(lambdaPrincipal, stack.statusTopic);

    expect(lambdaRole.assumeRoleAction).toEqual('sts:AssumeRole');
  });

});
