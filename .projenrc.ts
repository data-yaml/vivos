import { awscdk } from 'projen';
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  description: 'AWS CDK project for VIVOS',
  name: 'vivos',
  projenrcTs: true,
  deps: [
    'aws-lambda',
    '@aws-sdk/client-s3',
    '@aws-sdk/client-sns',
    'axios',
    'dotenv',
    'handlebars',
    'openapicmd',
    'openapi-client-axios',
    'openapi-types',
    'js-yaml',
    '@types/js-yaml',
  ],
  devDeps: [
    'eslint',
  ],
  gitignore: [
    '.env*',
    '.DS_Store',
    'test/__snapshots__/*',
  ],
});
project.tryFindObjectFile('.github/workflows/build.yml')!.addOverride('jobs.build.env', {
  CI: 'true',
  AWS_ACCESS_KEY_ID: '${{ secrets.AWS_ACCESS_KEY_ID }}',
  AWS_SECRET_ACCESS_KEY: '${{ secrets.AWS_SECRET_ACCESS_KEY }}',
  AWS_DEFAULT_REGION: '${{ secrets.AWS_DEFAULT_REGION }}',
  BENCHLING_ACCESS_KEY: '${{ secrets.BENCHLING_ACCESS_KEY }}',
  BENCHLING_TENANT: '${{ secrets.BENCHLING_TENANT }}',
  CDK_DEFAULT_ACCOUNT: '${{ secrets.AWS_ACCOUNT_ID }}',
  CDK_DEFAULT_REGION: '${{ secrets.AWS_DEFAULT_REGION }}',
  CDK_DEFAULT_EMAIL: '${{ secrets.CDK_DEFAULT_EMAIL }}',
  TOWER_ACCESS_TOKEN: '${{ secrets.TOWER_ACCESS_TOKEN }}',
  TOWER_COMPUTE_ENV_ID: '${{ secrets.TOWER_COMPUTE_ENV_ID }}',
  TOWER_OUTPUT_BUCKET: '${{ secrets.TOWER_OUTPUT_BUCKET }}',
  TOWER_ORG: '${{ secrets.TOWER_ORG }}',
  TOWER_WORKSPACE: '${{ secrets.TOWER_WORKSPACE }}',
  TOWER_WORKSPACE_ID: '${{ secrets.TOWER_WORKSPACE_ID }}',
  QUILT_CATALOG_DOMAIN: '${{ secrets.QUILT_CATALOG_DOMAIN }}',
});
project.synth();
