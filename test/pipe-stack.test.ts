import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { PipeStack, PipeStackProps } from '../src/pipe-stack';

describe('PipeStack', () => {
  let props: PipeStackProps;
  let stack: PipeStack;

  beforeEach(() => {
    props = {
      account: '123456789012',
      region: 'us-east-1',
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
    console.info('template\n', template);
    template.resourceCountIs('AWS::SNS::Topic', 2);
    template.resourceCountIs('AWS::SNS::Subscription', 2);
    template.resourceCountIs('AWS::Events::Rule', 1);
    template.resourceCountIs('AWS::Lambda::Function', 3);
    template.resourceCountIs('AWS::IAM::Role', 3);
    template.resourceCountIs('AWS::IAM::Policy', 2);
    template.resourceCountIs('AWS::S3::Bucket', 1);
    template.resourceCountIs('AWS::S3::BucketPolicy', 1);
  });

  it('should have the correct props', () => {
    expect(stack.props).toEqual(props);
    expect(stack.stack_name).toEqual('pipe-stack');
    const buckets = stack.getBucketNames();
    expect(buckets.length).toEqual(2);
    expect(buckets[1]).toEqual('quilt-test-bucket');
    expect(stack.lambdaRole).toBeDefined();
  });

  it('should have test bucket in lambda role', () => {
    let template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: {
        Statement: [
          {
            Action: 'sns:Publish',
            Effect: 'Allow',
            Resource: {
              Ref: 'VivosStatusTopicA15DB4F3',
            },
            Sid: 'VivosLambdaSNSPolicy',
          },
          {
            Action: [
              's3:ListBucket',
              's3:GetObject*',
              's3:PutObject',
              'sns:Publish',
            ],
            Effect: 'Allow',
            Resource: [
              {
                'Fn::Join': [
                  '',
                  [
                    'arn:aws:s3:::',
                    {
                      Ref: 'workbucketE90D6740',
                    },
                  ],
                ],
              },
              {
                'Fn::Join': [
                  '',
                  [
                    'arn:aws:s3:::',
                    {
                      Ref: 'workbucketE90D6740',
                    },
                    '/*',
                  ],
                ],
              },
            ],
            Sid: 'VivosLambdaS3Policy',
          },
        ],
        Version: '2012-10-17',
      },
    });
  });
});
