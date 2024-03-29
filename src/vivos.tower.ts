import { AxiosResponse } from 'axios';
import { Constants, KeyedConfig } from './constants';
import type { Components as Benchling } from './types/benchling';
import type { Client as TowerClient, Components } from './types/tower';
import { UPath } from './upath';
import { Vivos } from './vivos';

export type DescribeWorkflowResponse = Components.Schemas.DescribeWorkflowResponse;
export type ListWorkflowsElement = Components.Schemas.ListWorkflowsResponseListWorkflowsElement;
export type ListWorkflowsResponse = Components.Schemas.ListWorkflowsResponse;
export type ServiceInfo = Components.Schemas.ServiceInfo;
export type ServiceInfoResponse = Components.Schemas.ServiceInfoResponse;
export type SubmitWorkflowLaunchResponse = Components.Schemas.SubmitWorkflowLaunchResponse;
export type WorkflowLaunchRequest = Components.Schemas.WorkflowLaunchRequest;

export class VivosTower extends Vivos {

  public static ENVARS = [
    'TOWER_ACCESS_TOKEN',
    'TOWER_COMPUTE_ENV_ID',
    'CDK_DEFAULT_BUCKET',
    'TOWER_ORG',
    'TOWER_WORKSPACE',
    'TOWER_WORKSPACE_ID',
  ];

  private workspaceId: string;
  private computeEnvId: string;


  constructor(event: any, context: any) {
    super(event, context);
    this.api_key = this.get('TOWER_ACCESS_TOKEN');
    this.api_url = this.get('TOWER_API_URL');
    this.workspaceId = this.get('TOWER_WORKSPACE_ID');
    this.computeEnvId = this.get('TOWER_COMPUTE_ENV_ID');
  }

  public env_defaults(): KeyedConfig {
    return {
      OPEN_API_FILE: 'tower.yaml',
      TOWER_API_FILE: 'tower.yaml',
      TOWER_API_URL: 'https://api.tower.nf',
      TOWER_DEFAULT_PIPELINE: 'quiltdata/nf-quilt',
      TOWER_INPUT_FILE: 'entry.json',
      TOWER_OUTPUT_FILE: 'nf-quilt/params.json',
      TOWER_REPORT_FILE: 'multiqc/multiqc_report.html',
    };
  }

  public async getTowerClient(): Promise<TowerClient> {
    const this_api = await this.api(true);
    const client = this_api.init<TowerClient>();
    return client;
  }

  public getTowerURL(workflowId: string): string {
    const org = this.get('TOWER_ORG');
    const workspace = this.get('TOWER_WORKSPACE');
    return `https://tower.nf/orgs/${org}/workspaces/${workspace}/watch/${workflowId}`;
  }

  public async getEventEntry(): Promise<Benchling.Schemas.Entry> {
    if (this.event_object && this.event_object.includes(Constants.DEFAULTS.TOWER_INPUT_FILE)) {
      return await super.getEventObject() as Benchling.Schemas.Entry;
    }
    return {} as Benchling.Schemas.Entry;
  }

  public async getBenchlingInfo(): Promise<object> {
    const entry = await this.getEventEntry();
    const info = {
      id: entry.id!,
      name: entry.name!,
      displayId: entry.displayId!,
      apiURL: entry.apiURL!,
      creator: entry.creator!,
      webURL: entry.webURL!,
    };
    return info;
  }

  public async info(): Promise<ServiceInfo> {
    try {
      const tower = await this.getTowerClient();
      const response = await tower.Info() as AxiosResponse<ServiceInfoResponse>;
      const data = response.data as ServiceInfoResponse;
      return data.serviceInfo!;
    } catch (e: any) {
      console.error(e);
      throw 'Failed to retrieve service info';
    }
  }

  public async list(): Promise<ListWorkflowsElement[]> {
    try {
      const tower = await this.getTowerClient();
      const response = await tower.ListWorkflows(this.workspaceId) as AxiosResponse<ListWorkflowsResponse>;
      const data = response.data as ListWorkflowsResponse;
      return data.workflows!;
    } catch (e: any) {
      console.error(e);
      throw 'Failed to list workflows';
    }
  }

  public async describe(workflow: string): Promise<DescribeWorkflowResponse> {
    try {
      const tower = await this.getTowerClient();
      const response = await tower.DescribeWorkflow(workflow) as AxiosResponse<DescribeWorkflowResponse>;
      const data = response.data as DescribeWorkflowResponse;
      return data;
    } catch (e: any) {
      console.error(e);
      throw 'Failed to describe workflow';
    }
  }

  public async getPipeline(): Promise<string> {
    const entry = await this.getEventEntry();
    const pipeline = entry.fields?.Pipeline?.value;
    return pipeline || '';
  }

  public async getStatus(): Promise<string> {
    const entry = await this.getEventEntry();
    const status = entry.fields?.Status?.value;
    return status || 'None';
  }

  public async launch_options(pipeline: string = '', out_bucket: string = '', in_bucket = '', user_meta = ''): Promise<WorkflowLaunchRequest> {
    if (out_bucket === '') {
      out_bucket = this.get('CDK_DEFAULT_BUCKET');
    };
    if (pipeline === '') {
      pipeline = await this.getPipeline() || this.get('TOWER_DEFAULT_PIPELINE');
      if (pipeline === '') {
        console.warn('Pipeline not specified');
        return {} as WorkflowLaunchRequest;
      }
    }
    const env: KeyedConfig = {
      pipeline: pipeline,
      bucket: out_bucket,
      raw: in_bucket,
      user_meta: user_meta,
      computeEnvId: this.computeEnvId,
      // benchling: await this.getBenchlingInfo(),
    };
    console.debug('launch_options', JSON.stringify(env));
    const base_config = this.cc.get('BASE_CONFIG');
    if (typeof base_config === 'string') {
      env.base_config = base_config;
    }
    return this.load_pipeline(pipeline, env);
  }

  public async load_pipeline(pipeline: string, env: any = {}): Promise<WorkflowLaunchRequest> {
    var base = './config';
    if (typeof env.package !== 'string' || env.package === '') {
      env.package = pipeline;
    }
    if (typeof env.base_config === 'string' && env.base_config !== '') {
      base = env.base_config;
    }
    const paramsFile = `${base}/${pipeline}/params.json`;
    const launchFile = `${base}/${pipeline}/launch.json`;
    const region = Constants.GET('BASE_REGION');
    const params = await UPath.LoadObjectURI(paramsFile, env, region);
    const launch = await UPath.LoadObjectURI(launchFile, env, region);
    launch.paramsText = JSON.stringify(params);
    return launch as WorkflowLaunchRequest;
  }


  public async launch(launchOptions: WorkflowLaunchRequest): Promise<string> {
    try {
      const tower = await this.getTowerClient();
      const response = await tower.CreateWorkflowLaunch(
        this.workspaceId,
        { launch: launchOptions },
      ) as AxiosResponse<SubmitWorkflowLaunchResponse>;
      const data = response.data as SubmitWorkflowLaunchResponse;
      const workflow = data.workflowId!;
      return workflow;
    } catch (e: any) {
      console.error(launchOptions, e);
      throw 'Failed to launch workflow';
    }
  }

  public async cancel(workflow: string): Promise<number> {
    try {
      const tower = await this.getTowerClient();
      const options = { workspaceId: parseInt(this.workspaceId) };
      // const response = await tower.CancelWorkflow(workflow, JSON.stringify(options)) as AxiosResponse<number>;
      const response = await tower.post(`/workflows/${workflow}/cancel`, JSON.stringify(options), {
        headers: {
          'Content-Type': 'application/json',
        },
      }) as AxiosResponse;
      return response.status;
    } catch (e: any) {
      console.error(e);
      throw 'Failed to cancel workflow';
    }
  }

  public toDict() {
    return {
      ...super.toDict(),
      workspaceId: this.workspaceId,
      computeEnvId: this.computeEnvId,
    };
  }
}
