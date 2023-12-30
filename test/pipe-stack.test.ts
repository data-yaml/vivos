import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { PipeStack } from '../src/pipe-stack';

describe('PipeStack', () => {
  let app: App;
  let stack: PipeStack;
  let template: Template;

  beforeEach(() => {
    app = new App();
    stack = new PipeStack(app, 'TestStack', {
      buckets: ['bucket1', 'bucket2'],
      email: 'test@example.com',
      suffix: '.config',
    });
    template = Template.fromStack(stack);
  });

  it('should create a stack with the specified resources', () => {
    template.resourceCountIs('AWS::SNS::Topic', 1);
    template.resourceCountIs('AWS::SNS::Subscription', 1);
    template.resourceCountIs('AWS::Events::Rule', 1);
  });

  it('should have the correct properties', () => {
    expect(stack.props.buckets).toEqual(['bucket1', 'bucket2']);
    expect(stack.props.email).toEqual('test@example.com');
    expect(stack.props.suffix).toEqual('.config');
  });
});
