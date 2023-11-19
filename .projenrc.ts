import { awscdk } from "projen";
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: "2.1.0",
  defaultReleaseBranch: "main",
  description: "AWS CDK project for VIVOS",
  name: "vivos",
  projenrcTs: true,
  deps: [
    "aws-lambda",
    "aws-sdk",
    "axios",
    // 'config',
    "dotenv",
  ],
  // devDeps: [],             /* Build dependencies for this module. */
});
project.synth();
