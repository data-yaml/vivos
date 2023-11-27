import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { DiaStack } from '../src/dia-stack';

test('Snapshot', () => {
  const app = new App();
  const stack = new DiaStack(app, 'test', DiaStack.defaultProps());

  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
});
