import { awscdk } from 'projen';
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  description: 'AWS CDK project for VIVOS',
  name: 'vivos',
  projenrcTs: true,
  deps: [
    'aws-lambda',
    'aws-sdk',
    'axios',
    'dotenv',
    'openapicmd',
    'openapi-client-axios',
    'js-yaml',
    '@types/js-yaml',
  ],
  // devDeps: [],             /* Build dependencies for this module. */
  gitignore: [
    '.env*',
    '.DS_Store',
  ],
});
project.tryFindObjectFile('.github/workflows/build.yml')!.addOverride('jobs.build.env', {
  CI: 'true',
  TOWER_ACCESS_TOKEN: '${{ secrets.TOWER_ACCESS_TOKEN }}',
  TOWER_COMPUTE_ENV_ID: '${{ secrets.TOWER_COMPUTE_ENV_ID }}',
  TOWER_WORKSPACE_ID: '${{ secrets.TOWER_WORKSPACE_ID }}',
});
// Fix Jest 29 warning about deprecated config in `globals`
project.jest!.config.transform ??= {};
project.jest!.config.transform['\\.ts$'] = [
  'ts-jest',
  project.jest?.config.globals['ts-jest'],
];
delete project.jest!.config.globals['ts-jest'];
project.synth();
