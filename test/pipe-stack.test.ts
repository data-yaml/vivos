import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { PipeStack, PipeStackProps } from '../src/pipe-stack';

describe('PipeStack', () => {
  let props: PipeStackProps;
  let stack: PipeStack;

  beforeEach(() => {
    props = {
      env: {
        account: '123456789012',
        region: 'us-east-1',
      },
      email: 'test@example.com',
      buckets: ['quilt-test-bucket'],
      log_email: 'log@example.com',
      vivos_stem: 'vivos',
      vivos_suffixes: ['md'],
    };
    let app = new App();
    stack = new PipeStack(app, 'TestStack', props);
  });


  it('should create a stack with the specified resources', () => {
    let template = Template.fromStack(stack);
    template.resourceCountIs('AWS::SNS::Topic', 2);
    template.resourceCountIs('AWS::SNS::Subscription', 2);
    template.resourceCountIs('AWS::Events::Rule', 1);
    template.resourceCountIs('AWS::Lambda::Function', 3);
    template.resourceCountIs('AWS::IAM::Role', 4);
    template.resourceCountIs('AWS::IAM::Policy', 3);
    template.resourceCountIs('AWS::S3::Bucket', 3);
    template.resourceCountIs('AWS::S3::BucketPolicy', 3);
    template.resourceCountIs('AWS::Batch::ComputeEnvironment', 1);
  });

  it('should have the correct props', () => {
    expect(stack.props).toEqual(props);
    expect(stack.stack_name).toEqual('pipe-stack');
    const buckets = stack.getBucketNames();
    expect(buckets.length).toEqual(2);
    expect(buckets[1]).toEqual('quilt-test-bucket');
    expect(stack.lambdaRole).toBeDefined();
  });
});
