import { awscdk } from 'projen';
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  description: 'AWS CDK project for VIVOS',
  name: 'vivos',
  versionrcOptions: {
    releaseBranches: [
      'main',
    ],
  },
  projenrcTs: true,
  deps: [
    'aws-lambda',
    '@aws-sdk/client-s3',
    '@aws-sdk/client-sns',
    'axios',
    'dotenv',
    'handlebars',
    'js-yaml',
    'openapicmd',
    'openapi-client-axios',
    'openapi-types',
    'tmp',
  ],
  devDeps: [
    '@types/js-yaml',
    '@types/tmp',
    'eslint',
  ],
  gitignore: [
    '.env*',
    '.DS_Store',
    'test/__snapshots__/*',
    'test.pipe.md',
  ],
});
project.tryFindObjectFile('.github/workflows/build.yml')!.addOverride('jobs.build.env', {
  CI: 'true',
  AWS_ACCESS_KEY_ID: '${{ secrets.AWS_ACCESS_KEY_ID }}',
  AWS_SECRET_ACCESS_KEY: '${{ secrets.AWS_SECRET_ACCESS_KEY }}',
  AWS_DEFAULT_REGION: '${{ secrets.AWS_DEFAULT_REGION }}',
  BENCHLING_ACCESS_TOKEN: '${{ secrets.BENCHLING_ACCESS_TOKEN }}',
  BENCHLING_TENANT: '${{ secrets.BENCHLING_TENANT }}',
  CDK_DEFAULT_ACCOUNT: '${{ secrets.AWS_ACCOUNT_ID }}',
  CDK_DEFAULT_REGION: '${{ secrets.AWS_DEFAULT_REGION }}',
  CDK_DEFAULT_EMAIL: '${{ secrets.CDK_DEFAULT_EMAIL }}',
  TOWER_ACCESS_TOKEN: '${{ secrets.TOWER_ACCESS_TOKEN }}',
  TOWER_COMPUTE_ENV_ID: '${{ secrets.TOWER_COMPUTE_ENV_ID }}',
  CDK_DEFAULT_BUCKET: '${{ secrets.CDK_DEFAULT_BUCKET }}',
  TOWER_ORG: '${{ secrets.TOWER_ORG }}',
  TOWER_WORKSPACE: '${{ secrets.TOWER_WORKSPACE }}',
  TOWER_WORKSPACE_ID: '${{ secrets.TOWER_WORKSPACE_ID }}',
  QUILT_CATALOG_DOMAIN: '${{ secrets.QUILT_CATALOG_DOMAIN }}',
});
project.synth();
