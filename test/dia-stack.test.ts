import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { DiaStack, DiaStackProps } from '../src/dia-stack';


describe('DiaStack', () => {
  test('Snapshot', () => {
    const app = new App();
    const stackProps: DiaStackProps = {
      account: '123456789012',
      region: 'us-east-1',
      bucketURI: 's3://my-bucket',
      email: 'test@example.com',
    };
    const stack = new DiaStack(app, 'test', stackProps);

    const template = Template.fromStack(stack);
    expect(template.toJSON()).toMatchSnapshot();
  });

  test('MakeEnvars', () => {
    const app = new App();
    const stackProps: DiaStackProps = {
      account: '123456789012',
      region: 'us-east-1',
      bucketURI: 's3://my-bucket',
      email: 'test@example.com',
    };
    const stack = new DiaStack(app, 'test', stackProps);

    const env = {
      MY_ENV_VAR: 'my-value',
    };
    const envars = stack.makeEnvars(env);

    expect(envars.MY_ENV_VAR).toEqual('my-value');
    expect(envars.LOG_LEVEL).toEqual('ALL');
    expect(envars.BASE_API).not.toEqual('./api');
  });

  test('MakeLambdaRole', () => {
    const app = new App();
    const stackProps: DiaStackProps = {
      account: '123456789012',
      region: 'us-east-1',
      bucketURI: 's3://my-bucket',
      email: 'test@example.com',
    };
    const stack = new DiaStack(app, 'test', stackProps);

    const lambdaPrincipal = new ServicePrincipal('s3.amazonaws.com');
    const lambdaRole = stack.makeLambdaRole(lambdaPrincipal);

    expect(lambdaRole.assumeRoleAction).toEqual('sts:AssumeRole');
  });
});
