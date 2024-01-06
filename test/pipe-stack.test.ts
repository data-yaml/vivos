import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { PipeStack } from '../src/pipe-stack';

describe('PipeStack', () => {
  let stack: PipeStack;

  beforeEach(() => {
    const props = PipeStack.DefaultProps();
    let app = new App();
    stack = new PipeStack(app, 'TestStack', props);
  });

  it('should create a stack with the specified resources', () => {
    let template = Template.fromStack(stack);
    template.resourceCountIs('AWS::SNS::Topic', 2);
    template.resourceCountIs('AWS::SNS::Subscription', 2);
    template.resourceCountIs('AWS::Events::Rule', 1);
  });

  it('should have the correct properties', () => {
  });
});
