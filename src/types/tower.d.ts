import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Schemas {
        export interface AbstractGridConfig {
            workDir?: string;
            launchDir?: string;
            userName?: string;
            hostName?: string;
            port?: number; // int32
            headQueue?: string;
            computeQueue?: string;
            maxQueueSize?: number; // int32
            headJobOptions?: string;
            propagateHeadJobOptions?: boolean;
            preRunScript?: string;
            postRunScript?: string;
        }
        export interface AccessToken {
            basicAuth?: string;
            id?: number | null; // int64
            name: string;
            lastUsed?: string; // date-time
            dateCreated?: string; // date-time
        }
        export type ActionConfigType = {
            discriminator?: string;
        } & (ActionTowerActionConfig | GithubActionConfig);
        export type ActionEventType = {
            discriminator?: string;
            timestamp?: string; // date-time
        } & (GithubActionEvent | ActionTowerActionEvent);
        export type ActionQueryAttribute = "labels";
        export interface ActionResponseDto {
            id?: string;
            launch?: Launch;
            name?: string;
            hookId?: string;
            hookUrl?: string;
            message?: string;
            source?: ActionSource;
            status?: ActionStatus;
            config?: ActionConfigType;
            event?: ActionEventType;
            lastSeen?: string; // date-time
            dateCreated?: string; // date-time
            lastUpdated?: string; // date-time
            labels?: LabelDbDto[];
        }
        export type ActionSource = "github" | "tower";
        export type ActionStatus = "CREATING" | "ACTIVE" | "ERROR" | "PAUSED";
        export interface ActionTowerActionConfig {
            discriminator?: string;
        }
        export interface ActionTowerActionEvent {
            timestamp?: string; // date-time
            workflowId?: string;
            discriminator?: string;
        }
        export interface AddMemberRequest {
            user?: string;
        }
        export interface AddMemberResponse {
            member?: MemberDbDto;
        }
        export interface AddParticipantRequest {
            memberId?: number; // int64
            teamId?: number; // int64
            userNameOrEmail?: string;
        }
        export interface AddParticipantResponse {
            participant?: ParticipantDbDto;
        }
        export interface AddTeamMemberResponse {
            member?: MemberDbDto;
        }
        export interface AgentSecurityKeys {
            connectionId?: string;
            workDir?: string;
            shared?: boolean;
            discriminator?: string;
        }
        /**
         * Altair PBS configuration
         */
        export interface AltairPbsComputeConfig {
            workDir?: string;
            launchDir?: string;
            userName?: string;
            hostName?: string;
            port?: number; // int32
            headQueue?: string;
            computeQueue?: string;
            maxQueueSize?: number; // int32
            headJobOptions?: string;
            propagateHeadJobOptions?: boolean;
            preRunScript?: string;
            postRunScript?: string;
            environment?: ConfigEnvVariable[];
            /**
             * property to select the compute config platform
             */
            discriminator?: string;
        }
        export interface Analytics {
            url?: string;
            siteId?: number; // int32
        }
        export interface AssociateActionLabelsRequest {
            actionIds?: string[];
            labelIds?: number /* int64 */[];
        }
        export interface AssociatePipelineLabelsRequest {
            pipelineIds?: number /* int64 */[];
            labelIds?: number /* int64 */[];
        }
        export interface AssociateWorkflowLabelsRequest {
            workflowIds?: string[];
            labelIds?: number /* int64 */[];
        }
        export interface Avatar {
            id?: string;
            dateCreated?: string; // date-time
            lastUpdated?: string; // date-time
        }
        /**
         * AWS Batch configuration
         */
        export interface AwsBatchConfig {
            region?: string;
            computeQueue?: string;
            dragenQueue?: string;
            dragenInstanceType?: string;
            computeJobRole?: string;
            executionRole?: string;
            headQueue?: string;
            headJobRole?: string;
            cliPath?: string;
            volumes?: string[];
            workDir?: string;
            preRunScript?: string;
            postRunScript?: string;
            headJobCpus?: number; // int32
            headJobMemoryMb?: number; // int32
            environment?: ConfigEnvVariable[];
            waveEnabled?: boolean;
            fusion2Enabled?: boolean;
            nvnmeStorageEnabled?: boolean;
            logGroup?: string;
            forge?: ForgeConfig;
            forgedResources?: {
                [name: string]: any;
            }[];
            /**
             * property to select the compute config platform
             */
            discriminator?: string;
        }
        export interface AwsBatchPlatformMetainfo {
            warnings?: string[];
            jobQueues?: AwsBatchPlatformMetainfoJobQueue[];
            buckets?: AwsBatchPlatformMetainfoBucket[];
            fileSystems?: AwsBatchPlatformMetainfoFsxFileSystem[];
            efsFileSystems?: AwsBatchPlatformMetainfoEfsFileSystem[];
            keyPairs?: string[];
            vpcs?: AwsBatchPlatformMetainfoVpc[];
            images?: AwsBatchPlatformMetainfoImage[];
            securityGroups?: AwsBatchPlatformMetainfoSecurityGroup[];
            subnets?: AwsBatchPlatformMetainfoSubnet[];
            instanceFamilies?: string[];
            allocStrategy?: string[];
        }
        export interface AwsBatchPlatformMetainfoBucket {
            path?: string;
        }
        export interface AwsBatchPlatformMetainfoEfsFileSystem {
            id?: string;
        }
        export interface AwsBatchPlatformMetainfoFsxFileSystem {
            id?: string;
            dns?: string;
            mount?: string;
        }
        export interface AwsBatchPlatformMetainfoImage {
            id?: string;
            name?: string;
            description?: string;
        }
        export interface AwsBatchPlatformMetainfoJobQueue {
            name: string;
            state: string;
        }
        export interface AwsBatchPlatformMetainfoSecurityGroup {
            id?: string;
            name?: string;
            vpcId?: string;
        }
        export interface AwsBatchPlatformMetainfoSubnet {
            id?: string;
            zone?: string;
            vpcId?: string;
        }
        export interface AwsBatchPlatformMetainfoVpc {
            id?: string;
            isDefault?: boolean;
        }
        export interface AwsSecurityKeys {
            accessKey?: string;
            secretKey?: string;
            assumeRoleArn?: string;
            discriminator?: string;
        }
        /**
         * Azure batch configuration
         */
        export interface AzBatchConfig {
            workDir?: string;
            preRunScript?: string;
            postRunScript?: string;
            region?: string;
            headPool?: string;
            autoPoolMode?: boolean;
            forge?: AzBatchForgeConfig;
            tokenDuration?: string;
            deleteJobsOnCompletion?: JobCleanupPolicy;
            deletePoolsOnCompletion?: boolean;
            environment?: ConfigEnvVariable[];
            waveEnabled?: boolean;
            fusion2Enabled?: boolean;
            /**
             * property to select the compute config platform
             */
            discriminator?: string;
        }
        export interface AzBatchForgeConfig {
            vmType?: string;
            vmCount?: number; // int32
            autoScale?: boolean;
            disposeOnDeletion?: boolean;
            containerRegIds?: string[];
        }
        export interface AzureReposSecurityKeys {
            username?: string;
            password?: string;
            discriminator?: string;
        }
        export interface AzureSecurityKeys {
            batchName?: string;
            batchKey?: string;
            storageName?: string;
            storageKey?: string;
            discriminator?: string;
        }
        export interface BitBucketSecurityKeys {
            username?: string;
            password?: string;
            discriminator?: string;
        }
        export type CloudPriceModel = "standard" | "spot";
        export interface CodeCommitSecurityKeys {
            username?: string;
            password?: string;
            discriminator?: string;
        }
        export type ComputeConfig = {
            workDir?: string;
            preRunScript?: string;
            postRunScript?: string;
            environment?: ConfigEnvVariable[];
            /**
             * property to select the compute config platform
             */
            discriminator?: string;
        } & (/* AWS Batch configuration */ AwsBatchConfig | /* Google life sciences configuration */ GoogleLifeSciencesConfig | /* Google Batch service configuration */ GoogleBatchConfig | /* Azure batch configuration */ AzBatchConfig | /* IBM LSF configuration */ LsfComputeConfig | /* Slurm configuration */ SlurmComputeConfig | /* Kubernetes compute configuration */ K8sComputeConfig | /* Amazon EKS cluster configuration */ EksComputeConfig | /* Google GKE cluster configuration */ GkeComputeConfig | /* Univa Grid Engine configuration */ UnivaComputeConfig | /* Altair PBS configuration */ AltairPbsComputeConfig | /* Moab configuration */ MoabComputeConfig);
        export interface ComputeEnv {
            id?: string;
            name: string;
            description?: string;
            platform: "aws-batch" | "google-lifesciences" | "google-batch" | "azure-batch" | "k8s-platform" | "eks-platform" | "gke-platform" | "uge-platform" | "slurm-platform" | "lsf-platform" | "altair-platform" | "moab-platform" | "local-platform";
            config: ComputeConfig;
            dateCreated?: string; // date-time
            lastUpdated?: string; // date-time
            lastUsed?: string; // date-time
            deleted?: boolean;
            status?: "CREATING" | "AVAILABLE" | "ERRORED" | "INVALID";
            message?: string;
            primary?: boolean;
            credentialsId?: string;
            orgId?: number; // int64
            workspaceId?: number; // int64
        }
        export interface ComputeEnvDbDto {
            id?: string;
            name?: string;
            platform?: string;
        }
        export type ComputeEnvQueryAttribute = "labels";
        export interface ComputeEnvResponseDto {
            id?: string;
            name?: string;
            description?: string;
            platform?: "aws-batch" | "google-lifesciences" | "google-batch" | "azure-batch" | "k8s-platform" | "eks-platform" | "gke-platform" | "uge-platform" | "slurm-platform" | "lsf-platform" | "altair-platform";
            config?: ComputeConfig;
            dateCreated?: string; // date-time
            lastUpdated?: string; // date-time
            lastUsed?: string; // date-time
            deleted?: boolean;
            status?: ComputeEnvStatus;
            message?: string;
            primary?: boolean;
            credentialsId?: string;
            orgId?: number; // int64
            workspaceId?: number; // int64
            labels?: LabelDbDto[];
        }
        export type ComputeEnvStatus = "CREATING" | "AVAILABLE" | "ERRORED" | "INVALID";
        export interface ComputePlatform {
            id?: string;
            name?: string;
            credentialsProviders?: string[];
        }
        export interface ComputePlatformDto {
            id?: string;
            name?: string;
        }
        export interface ComputeRegion {
            id?: string;
            name?: string;
        }
        export interface ConfigEnvVariable {
            name?: string;
            value?: string;
            head?: boolean;
            compute?: boolean;
        }
        export interface ContainerRegistryKeys {
            userName?: string;
            password?: string;
            registry?: string;
            discriminator?: string;
        }
        export interface CreateAccessTokenRequest {
            name?: string;
        }
        export interface CreateAccessTokenResponse {
            accessKey?: string;
            token?: AccessToken;
        }
        export interface CreateActionRequest {
            name?: string;
            source?: ActionSource;
            launch?: WorkflowLaunchRequest;
        }
        export interface CreateActionResponse {
            actionId?: string;
        }
        export interface CreateAvatarResponse {
            avatar?: Avatar;
            url?: string;
        }
        export interface CreateComputeEnvRequest {
            computeEnv?: ComputeEnv;
            labelIds?: number /* int64 */[];
        }
        export interface CreateComputeEnvResponse {
            computeEnvId?: string;
        }
        export interface CreateCredentialsRequest {
            credentials?: Credentials;
        }
        export interface CreateCredentialsResponse {
            credentialsId?: string;
        }
        export interface CreateDatasetRequest {
            name?: string;
            description?: string;
        }
        export interface CreateDatasetResponse {
            dataset?: Dataset;
        }
        export interface CreateLabelRequest {
            name?: string;
            value?: string;
            resource?: boolean;
            isDefault?: boolean;
        }
        export interface CreateLabelResponse {
            id?: number; // int64
            name?: string;
            value?: string;
            resource?: boolean;
            isDefault?: boolean;
        }
        export interface CreateOrganizationRequest {
            organization?: Organization;
            logoId?: string;
        }
        export interface CreateOrganizationResponse {
            organization?: OrganizationDbDto;
        }
        export interface CreatePipelineRequest {
            name?: string;
            description?: string;
            icon?: string;
            launch?: WorkflowLaunchRequest;
            labelIds?: number /* int64 */[];
        }
        export interface CreatePipelineResponse {
            pipeline?: PipelineDbDto;
        }
        export interface CreatePipelineSecretRequest {
            name?: string;
            value?: string;
        }
        export interface CreatePipelineSecretResponse {
            secretId?: number; // int64
        }
        export interface CreateTeamMemberRequest {
            userNameOrEmail?: string;
        }
        export interface CreateTeamRequest {
            team?: Team;
            avatarId?: string;
        }
        export interface CreateTeamResponse {
            team?: TeamDbDto;
        }
        export interface CreateWorkflowStarResponse {
            workflowId?: string;
        }
        export interface CreateWorkspaceRequest {
            workspace?: Workspace;
        }
        export interface CreateWorkspaceResponse {
            workspace?: Workspace;
        }
        export interface Credentials {
            id?: string;
            name: string;
            description?: string;
            provider: "aws" | "azure" | "google" | "github" | "gitlab" | "bitbucket" | "ssh" | "k8s" | "container-reg" | "tw-agent" | "codecommit" | "gitea" | "azurerepos";
            baseUrl?: string;
            category?: string;
            deleted?: boolean;
            lastUsed?: string; // date-time
            dateCreated?: string; // date-time
            lastUpdated?: string; // date-time
            keys?: SecurityKeys;
        }
        export interface Dataset {
            id?: string;
            name: string; // ^[a-zA-Z\d](?:[a-zA-Z\d]|[-_](?=[a-zA-Z\d])){1,98}$
            description?: string;
            mediaType?: string;
            deleted?: boolean;
            dateCreated?: string; // date-time
            lastUpdated?: string; // date-time
        }
        export interface DatasetVersionDbDto {
            datasetId?: string;
            datasetName?: string;
            datasetDescription?: string;
            hasHeader?: boolean;
            version?: number; // int64
            lastUpdated?: string; // date-time
            fileName?: string;
            mediaType?: string;
            url?: string;
        }
        export interface DeleteWorkflowsRequest {
            workflowIds?: string[];
        }
        export interface DeleteWorkflowsResponse {
            failedWorkflowIds?: string[];
        }
        export interface DescribeActionResponse {
            action?: ActionResponseDto;
        }
        export interface DescribeComputeEnvResponse {
            computeEnv?: ComputeEnvResponseDto;
        }
        export interface DescribeCredentialsResponse {
            credentials?: Credentials;
        }
        export interface DescribeDatasetResponse {
            dataset?: Dataset;
        }
        export interface DescribeLaunchResponse {
            launch?: Launch;
        }
        export interface DescribeOrganizationResponse {
            organization?: OrganizationDbDto;
        }
        export interface DescribePipelineInfoResponse {
            pipelineInfo?: PipelineInfo;
        }
        export interface DescribePipelineResponse {
            pipeline?: PipelineDbDto;
        }
        export interface DescribePipelineSecretResponse {
            pipelineSecret?: PipelineSecret;
        }
        export interface DescribePlatformResponse {
            metainfo?: PlatformMetainfo;
        }
        export interface DescribeTaskResponse {
            task?: Task;
        }
        export interface DescribeTeamResponse {
            team?: TeamDbDto;
        }
        export interface DescribeUserResponse {
            user?: UserDbDto;
            needConsent?: boolean;
            defaultWorkspaceId?: number; // int64
        }
        export interface DescribeWorkflowLaunchResponse {
            launch?: WorkflowLaunchResponse;
        }
        export interface DescribeWorkflowResponse {
            progress?: ProgressData;
            orgId?: number; // int64
            optimized?: boolean;
            orgName?: string;
            workspaceName?: string;
            labels?: LabelDbDto[];
            platform?: ComputePlatformDto;
            jobInfo?: JobInfoDto;
            workspaceId?: number; // int64
            workflow: Workflow;
        }
        export interface DescribeWorkspaceResponse {
            workspace?: Workspace;
        }
        /**
         * Amazon EKS cluster configuration
         */
        export interface EksComputeConfig {
            workDir?: string;
            preRunScript?: string;
            postRunScript?: string;
            server?: string;
            sslCert?: string;
            namespace?: string;
            computeServiceAccount?: string;
            headServiceAccount?: string;
            storageClaimName?: string;
            storageMountPath?: string;
            podCleanup?: PodCleanupPolicy;
            headPodSpec?: string;
            servicePodSpec?: string;
            environment?: ConfigEnvVariable[];
            headJobCpus?: number; // int32
            headJobMemoryMb?: number; // int32
            /**
             * property to select the compute config platform
             */
            discriminator?: string;
            /**
             * AWS region
             */
            region?: string;
            /**
             * The AWS EKS cluster name
             */
            clusterName?: string;
            waveEnabled?: boolean;
            fusion2Enabled?: boolean;
        }
        export interface EmptyBodyRequest {
        }
        export interface ErrorResponse {
            message: string;
        }
        export interface EventType {
            source?: string;
            display?: string;
            description?: string;
            enabled?: boolean;
        }
        export interface ForgeConfig {
            type?: "SPOT" | "EC2";
            minCpus?: number; // int32
            maxCpus?: number; // int32
            gpuEnabled?: boolean;
            ebsAutoScale?: boolean;
            instanceTypes?: string[];
            allocStrategy?: "BEST_FIT" | "BEST_FIT_PROGRESSIVE" | "SPOT_CAPACITY_OPTIMIZED" | "SPOT_PRICE_CAPACITY_OPTIMIZED";
            imageId?: string;
            vpcId?: string;
            subnets?: string[];
            securityGroups?: string[];
            fsxMount?: string;
            fsxName?: string;
            fsxSize?: number; // int32
            disposeOnDeletion?: boolean;
            ec2KeyPair?: string;
            allowBuckets?: string[];
            ebsBlockSize?: number; // int32
            fusionEnabled?: boolean;
            bidPercentage?: number; // int32
            efsCreate?: boolean;
            efsId?: string;
            efsMount?: string;
            dragenEnabled?: boolean;
            dragenAmiId?: string;
            ebsBootSize?: number; // int32
            ecsConfig?: string;
            fargateHeadEnabled?: boolean;
            arm64Enabled?: boolean;
            dragenInstanceType?: string;
        }
        export interface GetProgressResponse {
            progress?: ProgressData;
        }
        export interface GetWorkflowMetricsResponse {
            metrics?: WorkflowMetrics[];
        }
        export interface GitHubSecurityKeys {
            username?: string;
            password?: string;
            discriminator?: string;
        }
        export interface GitLabSecurityKeys {
            username?: string;
            password?: string;
            token?: string;
            discriminator?: string;
        }
        export interface GiteaSecurityKeys {
            username?: string;
            password?: string;
            discriminator?: string;
        }
        export interface GithubActionConfig {
            events?: string[];
            discriminator?: string;
        }
        export interface GithubActionEvent {
            ref?: string;
            commitId?: string;
            commitMessage?: string;
            pusherName?: string;
            pusherEmail?: string;
            timestamp?: string; // date-time
            discriminator?: string;
        }
        /**
         * Google GKE cluster configuration
         */
        export interface GkeComputeConfig {
            workDir?: string;
            preRunScript?: string;
            postRunScript?: string;
            server?: string;
            sslCert?: string;
            namespace?: string;
            computeServiceAccount?: string;
            headServiceAccount?: string;
            storageClaimName?: string;
            storageMountPath?: string;
            podCleanup?: PodCleanupPolicy;
            headPodSpec?: string;
            servicePodSpec?: string;
            environment?: ConfigEnvVariable[];
            headJobCpus?: number; // int32
            headJobMemoryMb?: number; // int32
            /**
             * property to select the compute config platform
             */
            discriminator?: string;
            /**
             * The GKE cluster region - or - zone
             */
            region?: string;
            /**
             * The GKE cluster name
             */
            clusterName?: string;
            fusion2Enabled?: boolean;
            waveEnabled?: boolean;
        }
        /**
         * Google Batch service configuration
         */
        export interface GoogleBatchConfig {
            location?: string;
            workDir?: string;
            spot?: boolean;
            bootDiskSizeGb?: number; // int32
            cpuPlatform?: string;
            machineType?: string;
            projectId?: string;
            sshDaemon?: boolean;
            sshImage?: string;
            debugMode?: number; // int32
            copyImage?: string;
            usePrivateAddress?: boolean;
            labels?: {
                [name: string]: string;
            };
            preRunScript?: string;
            postRunScript?: string;
            headJobCpus?: number; // int32
            headJobMemoryMb?: number; // int32
            nfsTarget?: string;
            nfsMount?: string;
            environment?: ConfigEnvVariable[];
            waveEnabled?: boolean;
            fusion2Enabled?: boolean;
            serviceAccount?: string;
            network?: string;
            subnetwork?: string;
            /**
             * property to select the compute config platform
             */
            discriminator?: string;
        }
        /**
         * Google life sciences configuration
         */
        export interface GoogleLifeSciencesConfig {
            region?: string;
            zones?: string[];
            location?: string;
            workDir?: string;
            preemptible?: boolean;
            bootDiskSizeGb?: number; // int32
            projectId?: string;
            sshDaemon?: boolean;
            sshImage?: string;
            debugMode?: number; // int32
            copyImage?: string;
            usePrivateAddress?: boolean;
            labels?: {
                [name: string]: string;
            };
            preRunScript?: string;
            postRunScript?: string;
            headJobCpus?: number; // int32
            headJobMemoryMb?: number; // int32
            nfsTarget?: string;
            nfsMount?: string;
            environment?: ConfigEnvVariable[];
            /**
             * property to select the compute config platform
             */
            discriminator?: string;
        }
        export interface GooglePlatformMetainfo {
            warnings?: string[];
            zones?: string[];
            locations?: string[];
            buckets?: GooglePlatformMetainfoBucket[];
            filestores?: GooglePlatformMetainfoFilestore[];
        }
        export interface GooglePlatformMetainfoBucket {
            path?: string;
        }
        export interface GooglePlatformMetainfoFilestore {
            name?: string;
            location?: string;
            target?: string;
        }
        export interface GoogleSecurityKeys {
            data?: string;
            discriminator?: string;
        }
        export interface IteratorString {
        }
        export type JobCleanupPolicy = "on_success" | "always" | "never";
        export interface JobInfoDto {
            operationId?: string;
            exitCode?: number; // int32
            id?: number; // int64
            status?: string;
            message?: string;
        }
        /**
         * Kubernetes compute configuration
         */
        export interface K8sComputeConfig {
            workDir?: string;
            preRunScript?: string;
            postRunScript?: string;
            server?: string;
            sslCert?: string;
            namespace?: string;
            computeServiceAccount?: string;
            headServiceAccount?: string;
            storageClaimName?: string;
            storageMountPath?: string;
            podCleanup?: PodCleanupPolicy;
            headPodSpec?: string;
            servicePodSpec?: string;
            environment?: ConfigEnvVariable[];
            headJobCpus?: number; // int32
            headJobMemoryMb?: number; // int32
            /**
             * property to select the compute config platform
             */
            discriminator?: string;
        }
        export interface K8sSecurityKeys {
            certificate?: string;
            privateKey?: string;
            token?: string;
            discriminator?: string;
        }
        export interface LabelDbDto {
            id?: number; // int64
            name?: string;
            value?: string;
            resource?: boolean;
            isDefault?: boolean;
        }
        export type LabelType = "simple" | "resource" | "all";
        export interface Launch {
            id?: string;
            computeEnv?: {
                id?: string;
                name: string;
                description?: string;
                platform: "aws-batch" | "google-lifesciences" | "google-batch" | "azure-batch" | "k8s-platform" | "eks-platform" | "gke-platform" | "uge-platform" | "slurm-platform" | "lsf-platform" | "altair-platform" | "moab-platform" | "local-platform";
                config: ComputeConfig;
                dateCreated?: string; // date-time
                lastUpdated?: string; // date-time
                lastUsed?: string; // date-time
                deleted?: boolean;
                status?: "CREATING" | "AVAILABLE" | "ERRORED" | "INVALID";
                message?: string;
                primary?: boolean;
                credentialsId?: string;
                orgId?: number; // int64
                workspaceId?: number; // int64
            } | null;
            pipeline: string;
            workDir?: string;
            revision?: string;
            configText?: string;
            towerConfig?: string;
            paramsText?: string;
            preRunScript?: string;
            postRunScript?: string;
            mainScript?: string;
            entryName?: string;
            schemaName?: string; // [\p{Graph}&&[^/]]\p{Graph}+
            resume?: boolean;
            resumeLaunchId?: string;
            pullLatest?: boolean;
            stubRun?: boolean;
            sessionId?: string;
            runName?: string;
            configProfiles?: string[];
            userSecrets?: string[];
            workspaceSecrets?: string[];
            optimizationId?: string;
            optimizationTargets?: string;
            headJobCpus?: number; // int32
            headJobMemoryMb?: number; // int32
            dateCreated: string; // date-time
            lastUpdated?: string; // date-time
        }
        export interface LaunchActionRequest {
            params?: {
                [name: string]: any;
            };
        }
        export interface LaunchActionResponse {
            workflowId?: string;
        }
        export interface ListAccessTokensResponse {
            tokens?: AccessToken[];
        }
        export interface ListActionsResponse {
            actions?: ListActionsResponseActionInfo[];
        }
        export interface ListActionsResponseActionInfo {
            id?: string;
            name?: string;
            pipeline?: string;
            source?: ActionSource;
            status?: ActionStatus;
            lastSeen?: string; // date-time
            dateCreated?: string; // date-time
            event?: ActionEventType;
            endpoint?: string;
            labels?: LabelDbDto[];
            usageCmd?: string;
        }
        export interface ListComputeEnvsResponse {
            computeEnvs?: ListComputeEnvsResponseEntry[];
        }
        export interface ListComputeEnvsResponseEntry {
            id?: string;
            name?: string;
            platform?: string;
            status?: ComputeEnvStatus;
            message?: string;
            lastUsed?: string; // date-time
            primary?: boolean;
            workspaceName?: string;
            visibility?: string;
            workDir?: string;
        }
        export interface ListCredentialsResponse {
            credentials?: Credentials[];
        }
        export interface ListDatasetVersionsResponse {
            versions?: DatasetVersionDbDto[];
        }
        export interface ListDatasetsResponse {
            datasets?: Dataset[];
        }
        export interface ListEventTypesResponse {
            eventTypes?: EventType[];
        }
        export interface ListLabelsResponse {
            labels?: LabelDbDto[];
            totalSize?: number; // int64
        }
        export interface ListMembersResponse {
            totalSize?: number; // int64
            members?: MemberDbDto[];
        }
        export interface ListOrganizationsResponse {
            totalSize?: number; // int32
            organizations: OrganizationDbDto[];
        }
        export interface ListParticipantsResponse {
            totalSize: number; // int64
            participants: ParticipantDbDto[];
        }
        export interface ListPipelineInfoResponse {
            pipelines?: string[];
        }
        export interface ListPipelineSecretsResponse {
            pipelineSecrets?: PipelineSecret[];
            totalSize?: number; // int64
        }
        export interface ListPipelinesResponse {
            pipelines?: PipelineDbDto[];
            totalSize?: number; // int64
        }
        export interface ListPlatformsResponse {
            platforms?: ComputePlatform[];
        }
        export interface ListRegionsResponse {
            regions?: ComputeRegion[];
        }
        export interface ListTasksResponse {
            tasks?: DescribeTaskResponse[];
            total?: number; // int64
        }
        export interface ListTeamResponse {
            totalSize: number; // int64
            teams: TeamDbDto[];
        }
        export interface ListWorkflowsResponse {
            totalSize?: number; // int64
            workflows?: ListWorkflowsResponseListWorkflowsElement[];
        }
        export interface ListWorkflowsResponseListWorkflowsElement {
            progress?: ProgressData;
            starred?: boolean;
            orgId?: number; // int64
            optimized?: boolean;
            orgName?: string;
            workspaceName?: string;
            labels?: LabelDbDto[];
            workspaceId?: number; // int64
            workflow?: WorkflowDbDto;
        }
        export interface ListWorkspacesAndOrgResponse {
            orgsAndWorkspaces?: OrgAndWorkspaceDto[];
        }
        export interface ListWorkspacesResponse {
            workspaces?: WorkspaceDbDto[];
        }
        export interface Log {
            name?: string;
            cmd?: string[];
            start_time?: string;
            end_time?: string;
            stdout?: string;
            stderr?: string;
            exit_code?: number; // int32
        }
        export interface LogPage {
            entries?: IteratorString;
            rewindToken?: string;
            forwardToken?: string;
            pending?: boolean;
            message?: string;
            downloads?: LogPageDownload[];
            truncated?: boolean;
        }
        export interface LogPageDownload {
            fileName?: string;
            displayText?: string;
            saveName?: string;
        }
        /**
         * IBM LSF configuration
         */
        export interface LsfComputeConfig {
            workDir?: string;
            launchDir?: string;
            userName?: string;
            hostName?: string;
            port?: number; // int32
            headQueue?: string;
            computeQueue?: string;
            maxQueueSize?: number; // int32
            headJobOptions?: string;
            propagateHeadJobOptions?: boolean;
            preRunScript?: string;
            postRunScript?: string;
            unitForLimits?: string;
            perJobMemLimit?: boolean;
            perTaskReserve?: boolean;
            environment?: ConfigEnvVariable[];
            /**
             * property to select the compute config platform
             */
            discriminator?: string;
        }
        export interface MemberDbDto {
            userName?: string;
            userId?: number; // int64
            memberId?: number; // int64
            email?: string;
            avatar?: string;
            lastName?: string;
            role?: OrgRole;
            firstName?: string;
        }
        /**
         * Moab configuration
         */
        export interface MoabComputeConfig {
            workDir?: string;
            launchDir?: string;
            userName?: string;
            hostName?: string;
            port?: number; // int32
            headQueue?: string;
            computeQueue?: string;
            maxQueueSize?: number; // int32
            headJobOptions?: string;
            propagateHeadJobOptions?: boolean;
            preRunScript?: string;
            postRunScript?: string;
            environment?: ConfigEnvVariable[];
            /**
             * property to select the compute config platform
             */
            discriminator?: string;
        }
        export interface MultiRequestFileSchema {
            file?: string; // binary
        }
        export interface NavbarConfig {
            menus?: NavbarConfigNavbarMenu[];
        }
        export interface NavbarConfigNavbarMenu {
            label?: string;
            url?: string;
        }
        export interface OrgAndWorkspaceDto {
            orgId?: number; // int64
            orgName?: string;
            orgLogoUrl?: string;
            workspaceId?: number; // int64
            workspaceName?: string;
            workspaceFullName?: string;
            visibility?: Visibility;
            roles?: string[];
        }
        export type OrgRole = "owner" | "member" | "collaborator";
        export interface Organization {
            id?: number | null; // int64
            name: string; // ^[a-zA-Z\d](?:[a-zA-Z\d]|[-_](?=[a-zA-Z\d])){1,38}$
            fullName: string;
            description?: string;
            location?: string;
            website?: string;
            dateCreated?: string; // date-time
            lastUpdated?: string; // date-time
        }
        export interface OrganizationDbDto {
            orgId?: number; // int64
            name?: string;
            fullName?: string;
            description?: string;
            location?: string;
            website?: string;
            logoId?: string;
            logoUrl?: string;
            memberId?: number; // int64
            memberRole?: OrgRole;
            paying?: boolean;
        }
        export interface ParticipantDbDto {
            userName?: string;
            memberId?: number; // int64
            teamName?: string;
            teamId?: number; // int64
            email?: string;
            lastName?: string;
            participantId?: number; // int64
            wspRole?: WspRole;
            orgRole?: OrgRole;
            userAvatarUrl?: string;
            teamAvatarUrl?: string;
            firstName?: string;
            type?: ParticipantType;
        }
        export type ParticipantType = "MEMBER" | "TEAM" | "COLLABORATOR";
        export interface PipelineDbDto {
            pipelineId?: number; // int64
            name?: string;
            description?: string;
            icon?: string;
            repository?: string;
            userId?: number; // int64
            userName?: string;
            userFirstName?: string;
            userLastName?: string;
            orgId?: number; // int64
            orgName?: string;
            workspaceId?: number; // int64
            workspaceName?: string;
            visibility?: string;
            deleted?: boolean;
            lastUpdated?: string; // date-time
            optimizationId?: string;
            optimizationTargets?: string;
            optimizationStatus?: PipelineOptimizationStatus;
            labels?: LabelDbDto[];
            computeEnv?: ComputeEnvDbDto;
        }
        export interface PipelineInfo {
            projectName?: string;
            simpleName?: string;
            repositoryUrl?: string;
            cloneUrl?: string;
            provider?: string;
            configFiles?: string[];
            workDirs?: string[];
            revisions?: string[];
            profiles?: string[];
            manifest?: WfManifest;
            warnings?: string[];
        }
        export type PipelineOptimizationStatus = "OPTIMIZED" | "OPTIMIZABLE" | "UNAVAILABLE";
        export type PipelineQueryAttribute = "optimized" | "labels" | "computeEnv";
        export type PipelineSchemaAttributes = "schema" | "params";
        export interface PipelineSchemaResponse {
            schema: string;
            params?: string;
        }
        export interface PipelineSecret {
            id?: number | null; // int64
            name: string; // ^[a-zA-Z_](?:[0-9A-Za-z]+|(_)(?!\1)){1,49}$
            lastUsed?: string; // date-time
            dateCreated?: string; // date-time
            lastUpdated?: string; // date-time
        }
        export type PlatformMetainfo = AwsBatchPlatformMetainfo | GooglePlatformMetainfo;
        export type PodCleanupPolicy = "on_success" | "always" | "never";
        export interface ProcessLoad {
            pending: number; // int64
            submitted: number; // int64
            running: number; // int64
            succeeded: number; // int64
            failed: number; // int64
            cached: number; // int64
            memoryEfficiency?: number; // float
            cpuEfficiency?: number; // float
            process: string;
            cpus: number; // int64
            cpuTime: number; // int64
            cpuLoad: number; // int64
            memoryRss: number; // int64
            memoryReq: number; // int64
            readBytes: number; // int64
            writeBytes: number; // int64
            volCtxSwitch: number; // int64
            invCtxSwitch: number; // int64
            loadTasks: number; // int64
            loadCpus: number; // int64
            loadMemory: number; // int64
            peakCpus: number; // int64
            peakTasks: number; // int64
            peakMemory: number; // int64
            dateCreated?: string; // date-time
            lastUpdated?: string; // date-time
        }
        export interface ProgressData {
            workflowProgress?: WorkflowLoad;
            processesProgress?: ProcessLoad[];
        }
        export interface RandomWorkflowNameResponse {
            name?: string;
        }
        export interface ResourceData {
            warnings?: string[];
            mean?: number; // float
            min?: number; // float
            q1?: number; // float
            q2?: number; // float
            q3?: number; // float
            max?: number; // float
            minLabel?: string;
            maxLabel?: string;
            q1Label?: string;
            q2Label?: string;
            q3Label?: string;
        }
        export interface RunId {
            run_id?: string;
        }
        export interface RunListResponse {
            runs?: RunStatus[];
            next_page_token?: string;
        }
        export interface RunLog {
            run_id?: string;
            request?: RunRequest;
            state?: State;
            run_log?: Log;
            task_logs?: Log[];
            outputs?: {
                [key: string]: any;
            };
        }
        export interface RunRequest {
            workflow_params?: {
                [key: string]: any;
            };
            workflow_type?: string;
            workflow_type_version?: string;
            tags?: {
                [name: string]: string;
            };
            workflow_engine_parameters?: {
                [name: string]: string;
            };
            workflow_url?: string;
        }
        export interface RunStatus {
            run_id?: string;
            state?: State;
        }
        export interface SSHSecurityKeys {
            privateKey?: string;
            passphrase?: string;
            discriminator?: string;
        }
        export type SecurityKeys = {
            discriminator?: string;
        } & (AwsSecurityKeys | GoogleSecurityKeys | GitHubSecurityKeys | GitLabSecurityKeys | BitBucketSecurityKeys | GiteaSecurityKeys | SSHSecurityKeys | K8sSecurityKeys | AzureSecurityKeys | AzureReposSecurityKeys | ContainerRegistryKeys | AgentSecurityKeys | CodeCommitSecurityKeys);
        export interface ServiceInfo {
            version?: string;
            apiVersion?: string;
            commitId?: string;
            authTypes?: string[];
            loginPath?: string;
            navbar?: NavbarConfig;
            heartbeatInterval?: number; // int32
            userWorkspaceEnabled?: boolean;
            allowInstanceCredentials?: boolean;
            landingUrl?: string;
            termsOfUseUrl?: string;
            contentUrl?: string;
            analytics?: Analytics;
            allowLocalRepos?: boolean;
            contentMaxFileSize?: number; // int64
            waveEnabled?: boolean;
            groundswellEnabled?: boolean;
            groundswellAllowedWorkspaces?: number /* int64 */[];
            waveAllowedWorkspaces?: number /* int64 */[];
            forgePrefix?: string;
            dataExplorerAllowedWorkspaces?: number /* int64 */[];
            seqeraCloud?: boolean;
            arm64Enabled?: boolean;
            evalWorkspaceIds?: number /* int64 */[];
        }
        export interface ServiceInfoResponse {
            serviceInfo?: ServiceInfo;
        }
        /**
         * Slurm configuration
         */
        export interface SlurmComputeConfig {
            workDir?: string;
            launchDir?: string;
            userName?: string;
            hostName?: string;
            port?: number; // int32
            headQueue?: string;
            computeQueue?: string;
            maxQueueSize?: number; // int32
            headJobOptions?: string;
            propagateHeadJobOptions?: boolean;
            preRunScript?: string;
            postRunScript?: string;
            environment?: ConfigEnvVariable[];
            /**
             * property to select the compute config platform
             */
            discriminator?: string;
        }
        export type State = "UNKNOWN" | "QUEUED" | "INITIALIZING" | "RUNNING" | "PAUSED" | "COMPLETE" | "EXECUTOR_ERROR" | "SYSTEM_ERROR" | "CANCELED" | "CANCELING";
        export interface SubmitWorkflowLaunchRequest {
            launch?: WorkflowLaunchRequest;
        }
        export interface SubmitWorkflowLaunchResponse {
            workflowId?: string;
        }
        export interface Task {
            hash?: string;
            name?: string;
            process?: string;
            tag?: string;
            submit?: string; // date-time
            start?: string; // date-time
            complete?: string; // date-time
            module?: string[];
            container?: string;
            attempt?: number; // int32
            script?: string;
            scratch?: string;
            workdir?: string;
            queue?: string;
            cpus?: number; // int32
            memory?: number; // int64
            disk?: number; // int64
            time?: number; // int64
            env?: string;
            executor?: string;
            machineType?: string;
            cloudZone?: string;
            priceModel?: CloudPriceModel;
            cost?: number;
            errorAction?: string;
            exitStatus?: number; // int32
            duration?: number; // int64
            realtime?: number; // int64
            nativeId?: string;
            pcpu?: number; // double
            pmem?: number; // double
            rss?: number; // int64
            vmem?: number; // int64
            peakRss?: number; // int64
            peakVmem?: number; // int64
            rchar?: number; // int64
            wchar?: number; // int64
            syscr?: number; // int64
            syscw?: number; // int64
            readBytes?: number; // int64
            writeBytes?: number; // int64
            volCtxt?: number; // int64
            invCtxt?: number; // int64
            exit?: string;
            id?: number | null; // int64
            taskId: number; // int64
            status: TaskStatus;
            dateCreated?: string | null; // date-time
            lastUpdated?: string | null; // date-time
        }
        export type TaskStatus = "NEW" | "SUBMITTED" | "RUNNING" | "CACHED" | "COMPLETED" | "FAILED" | "ABORTED";
        export interface Team {
            id?: number | null; // int64
            name: string; // ^[a-zA-Z\d](?:[a-zA-Z\d]|[-_](?=[a-zA-Z\d])){1,38}$
            description?: string;
            dateCreated?: string; // date-time
            lastUpdated?: string; // date-time
        }
        export interface TeamDbDto {
            description?: string;
            teamId?: number; // int64
            avatarUrl?: string;
            membersCount?: number; // int64
            name?: string;
        }
        export interface TraceBeginRequest {
            workflow?: Workflow;
            processNames?: string[];
            towerLaunch?: boolean;
        }
        export interface TraceBeginResponse {
            status?: TraceProcessingStatus;
            workflowId?: string;
            watchUrl?: string;
        }
        export interface TraceCompleteRequest {
            workflow?: Workflow;
            metrics?: WorkflowMetrics[];
            progress?: TraceProgressData;
        }
        export interface TraceCompleteResponse {
            status?: TraceProcessingStatus;
            workflowId?: string;
        }
        export interface TraceCreateRequest {
            sessionId?: string;
            runName?: string;
            projectName?: string;
            repository?: string;
            workflowId?: string;
        }
        export interface TraceCreateResponse {
            message?: string;
            workflowId?: string;
        }
        export interface TraceHeartbeatRequest {
            progress?: TraceProgressData;
        }
        export interface TraceHeartbeatResponse {
            message?: string;
        }
        export type TraceProcessingStatus = "OK" | "KO";
        export interface TraceProgressData {
            pending?: number; // int32
            submitted?: number; // int32
            running?: number; // int32
            succeeded?: number; // int32
            cached?: number; // int32
            failed?: number; // int32
            aborted?: number; // int32
            stored?: number; // int32
            ignored?: number; // int32
            retries?: number; // int32
            loadCpus?: number; // int64
            loadMemory?: number; // int64
            peakRunning?: number; // int32
            peakCpus?: number; // int64
            peakMemory?: number; // int64
            processes?: TraceProgressDetail[];
        }
        export interface TraceProgressDetail {
            index?: number; // int32
            name?: string;
            pending?: number; // int32
            submitted?: number; // int32
            running?: number; // int32
            succeeded?: number; // int32
            cached?: number; // int32
            failed?: number; // int32
            aborted?: number; // int32
            stored?: number; // int32
            ignored?: number; // int32
            retries?: number; // int32
            terminated?: boolean;
            loadCpus?: number; // int64
            loadMemory?: number; // int64
            peakRunning?: number; // int32
            peakCpus?: number; // int64
            peakMemory?: number; // int64
        }
        export interface TraceProgressRequest {
            tasks?: Task[];
            progress?: TraceProgressData;
        }
        export interface TraceProgressResponse {
            status?: TraceProcessingStatus;
            workflowId?: string;
        }
        /**
         * Univa Grid Engine configuration
         */
        export interface UnivaComputeConfig {
            workDir?: string;
            launchDir?: string;
            userName?: string;
            hostName?: string;
            port?: number; // int32
            headQueue?: string;
            computeQueue?: string;
            maxQueueSize?: number; // int32
            headJobOptions?: string;
            propagateHeadJobOptions?: boolean;
            preRunScript?: string;
            postRunScript?: string;
            environment?: ConfigEnvVariable[];
            /**
             * property to select the compute config platform
             */
            discriminator?: string;
        }
        export interface UpdateActionRequest {
            name?: string;
            launch?: WorkflowLaunchRequest;
        }
        export interface UpdateComputeEnvRequest {
            name?: string;
        }
        export interface UpdateCredentialsRequest {
            credentials?: Credentials;
        }
        export interface UpdateDatasetRequest {
            name?: string;
            description?: string;
        }
        export interface UpdateLabelRequest {
            name?: string;
            value?: string;
            isDefault?: boolean;
        }
        export interface UpdateLabelResponse {
            id?: number; // int64
            name?: string;
            value?: string;
            isDefault?: boolean;
        }
        export interface UpdateMemberRoleRequest {
            role?: OrgRole;
        }
        export interface UpdateOrganizationRequest {
            location?: string;
            paying?: boolean | null;
            description?: string;
            website?: string;
            logoId?: string;
            fullName?: string;
            name?: string;
        }
        export interface UpdateParticipantRoleRequest {
            role?: WspRole;
        }
        export interface UpdatePipelineRequest {
            name?: string;
            description?: string;
            icon?: string;
            launch?: WorkflowLaunchRequest;
            labelIds?: number /* int64 */[];
        }
        export interface UpdatePipelineResponse {
            pipeline?: PipelineDbDto;
        }
        export interface UpdatePipelineSecretRequest {
            value?: string;
        }
        export interface UpdateTeamRequest {
            description?: string;
            avatarId?: string;
            name?: string;
        }
        export interface UpdateWorkspaceRequest {
            visibility: Visibility;
            description: string;
            fullName: string;
            name: string;
        }
        export interface UploadDatasetVersionResponse {
            version?: DatasetVersionDbDto;
        }
        export interface UserDbDto {
            id: number; // int64
            userName: string;
            email: string; // email
            firstName: string;
            lastName: string;
            organization: string;
            description: string;
            avatar: string;
            avatarId: string;
            notification: boolean;
            termsOfUseConsent: boolean;
            marketingConsent: boolean;
            lastAccess: string; // date-time
            dateCreated: string; // date-time
            lastUpdated: string; // date-time
            deleted: boolean;
        }
        export type Visibility = "PRIVATE" | "SHARED";
        export interface WesErrorResponse {
            msg?: string;
            status_code?: number; // int32
        }
        export interface WfManifest {
            nextflowVersion?: string;
            defaultBranch?: string;
            version?: string;
            homePage?: string;
            gitmodules?: string;
            description?: string;
            name?: string;
            mainScript?: string;
            author?: string;
        }
        export interface WfNextflow {
            version?: string;
            build?: string;
            timestamp?: string; // date-time
        }
        export interface WfStats {
            computeTimeFmt?: string;
            cachedCount?: number; // int32
            failedCount?: number; // int32
            ignoredCount?: number; // int32
            succeedCount?: number; // int32
            cachedCountFmt?: string;
            succeedCountFmt?: string;
            failedCountFmt?: string;
            ignoredCountFmt?: string;
            cachedPct?: number; // float
            failedPct?: number; // float
            succeedPct?: number; // float
            ignoredPct?: number; // float
            cachedDuration?: number; // int64
            failedDuration?: number; // int64
            succeedDuration?: number; // int64
        }
        export interface Workflow {
            status?: WorkflowStatus;
            ownerId?: number; // int64
            repository?: string;
            id?: string;
            submit: string; // date-time
            start?: string; // date-time
            complete?: string; // date-time
            dateCreated?: string | null; // date-time
            lastUpdated?: string | null; // date-time
            runName: string;
            sessionId: string;
            profile?: string;
            workDir: string;
            commitId?: string;
            userName: string;
            scriptId?: string;
            revision?: string;
            commandLine: string;
            projectName: string;
            scriptName?: string;
            launchId?: string;
            configFiles?: string[];
            params?: {
                [name: string]: any;
            };
            configText?: string;
            manifest?: WfManifest;
            nextflow?: WfNextflow;
            stats?: WfStats;
            errorMessage?: string;
            errorReport?: string;
            deleted?: boolean;
            projectDir?: string;
            homeDir?: string;
            container?: string;
            containerEngine?: string;
            scriptFile?: string;
            launchDir?: string;
            duration?: number; // int64
            exitStatus?: number; // int32
            resume?: boolean;
            success?: boolean;
            logFile?: string;
            outFile?: string;
            operationId?: string;
        }
        export interface WorkflowDbDto {
            container: string;
            profile: string;
            params: {
                [name: string]: any;
            };
            commandLine: string;
            resume: boolean;
            stats: WfStats;
            projectDir: string;
            exitStatus: number; // int32
            complete: string; // date-time
            launchDir: string;
            start: string; // date-time
            projectName: string;
            lastUpdated: string; // date-time
            deleted: boolean;
            errorReport: string;
            revision: string;
            submit: string; // date-time
            dateCreated: string; // date-time
            containerEngine: string;
            runName: string;
            errorMessage: string;
            success: boolean;
            nextflow: WfNextflow;
            ownerId: number; // int64
            repository: string;
            id: string;
            sessionId: string;
            workDir: string;
            commitId: string;
            userName: string;
            scriptId: string;
            scriptName: string;
            launchId: string;
            status: WorkflowStatus;
            configFiles: string[];
            configText: string;
            manifest: WfManifest;
            homeDir: string;
            scriptFile: string;
            duration: number; // int64
        }
        export interface WorkflowLaunchRequest {
            id?: string;
            computeEnvId?: string;
            runName?: string;
            pipeline?: string;
            workDir?: string;
            revision?: string;
            sessionId?: string;
            configProfiles?: string[];
            userSecrets?: string[];
            workspaceSecrets?: string[];
            configText?: string;
            towerConfig?: string;
            paramsText?: string;
            preRunScript?: string;
            postRunScript?: string;
            mainScript?: string;
            entryName?: string;
            schemaName?: string;
            resume?: boolean;
            pullLatest?: boolean;
            stubRun?: boolean;
            optimizationId?: string;
            optimizationTargets?: string;
            labelIds?: number /* int64 */[];
            headJobCpus?: number; // int32
            headJobMemoryMb?: number; // int32
            dateCreated?: string; // date-time
        }
        export interface WorkflowLaunchResponse {
            id?: string;
            computeEnv?: ComputeEnv;
            pipeline?: string;
            pipelineId?: number; // int64
            workDir?: string;
            revision?: string;
            sessionId?: string;
            configProfiles?: string[];
            userSecrets?: string[];
            workspaceSecrets?: string[];
            configText?: string;
            towerConfig?: string;
            paramsText?: string;
            preRunScript?: string;
            postRunScript?: string;
            mainScript?: string;
            entryName?: string;
            schemaName?: string;
            resume?: boolean;
            pullLatest?: boolean;
            stubRun?: boolean;
            resumeDir?: string;
            resumeCommitId?: string;
            headJobMemoryMb?: number; // int32
            headJobCpus?: number; // int32
            optimizationId?: string;
            optimizationTargets?: string;
            dateCreated?: string; // date-time
        }
        export interface WorkflowLoad {
            pending: number; // int64
            submitted: number; // int64
            running: number; // int64
            succeeded: number; // int64
            failed: number; // int64
            cached: number; // int64
            memoryEfficiency?: number; // float
            cpuEfficiency?: number; // float
            cpus: number; // int64
            cpuTime: number; // int64
            cpuLoad: number; // int64
            memoryRss: number; // int64
            memoryReq: number; // int64
            readBytes: number; // int64
            writeBytes: number; // int64
            volCtxSwitch: number; // int64
            invCtxSwitch: number; // int64
            cost?: number;
            loadTasks: number; // int64
            loadCpus: number; // int64
            loadMemory: number; // int64
            peakCpus: number; // int64
            peakTasks: number; // int64
            peakMemory: number; // int64
            executors?: string[];
            dateCreated?: string; // date-time
            lastUpdated?: string; // date-time
        }
        export interface WorkflowLogResponse {
            log?: LogPage;
        }
        export interface WorkflowMetrics {
            id?: number | null; // int64
            process: string;
            cpu?: ResourceData;
            mem?: ResourceData;
            vmem?: ResourceData;
            time?: ResourceData;
            reads?: ResourceData;
            writes?: ResourceData;
            cpuUsage?: ResourceData;
            memUsage?: ResourceData;
            timeUsage?: ResourceData;
        }
        export type WorkflowQueryAttribute = "optimized" | "labels" | "minimal";
        export type WorkflowStatus = "SUBMITTED" | "RUNNING" | "SUCCEEDED" | "FAILED" | "CANCELLED" | "UNKNOWN";
        export interface Workspace {
            id?: number | null; // int64
            name: string; // ^[a-zA-Z\d](?:[a-zA-Z\d]|[-_](?=[a-zA-Z\d])){1,38}$
            fullName: string;
            description?: string;
            visibility: Visibility;
            dateCreated?: string; // date-time
            lastUpdated?: string; // date-time
        }
        export interface WorkspaceDbDto {
            id?: number; // int64
            name?: string;
            fullName?: string;
            description?: string;
            visibility?: Visibility;
        }
        export type WspRole = "owner" | "admin" | "maintain" | "launch" | "view";
    }
}
declare namespace Paths {
    namespace AddLabelsToActions {
        namespace Parameters {
            export type WorkspaceId = number; // int64
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        export type RequestBody = Components.Schemas.AssociateActionLabelsRequest;
        namespace Responses {
            export interface $204 {
            }
            export interface $403 {
            }
        }
    }
    namespace AddLabelsToPipelines {
        namespace Parameters {
            export type WorkspaceId = number; // int64
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        export type RequestBody = Components.Schemas.AssociatePipelineLabelsRequest;
        namespace Responses {
            export interface $204 {
            }
            export interface $403 {
            }
        }
    }
    namespace AddLabelsToWorkflows {
        namespace Parameters {
            export type WorkspaceId = number; // int64
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        export type RequestBody = Components.Schemas.AssociateWorkflowLabelsRequest;
        namespace Responses {
            export interface $204 {
            }
            export interface $403 {
            }
        }
    }
    namespace ApplyLabelsToActions {
        namespace Parameters {
            export type WorkspaceId = number; // int64
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        export type RequestBody = Components.Schemas.AssociateActionLabelsRequest;
        namespace Responses {
            export interface $204 {
            }
            export interface $403 {
            }
        }
    }
    namespace ApplyLabelsToPipelines {
        namespace Parameters {
            export type WorkspaceId = number; // int64
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        export type RequestBody = Components.Schemas.AssociatePipelineLabelsRequest;
        namespace Responses {
            export interface $204 {
            }
            export interface $403 {
            }
        }
    }
    namespace ApplyLabelsToWorkflows {
        namespace Parameters {
            export type WorkspaceId = number; // int64
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        export type RequestBody = Components.Schemas.AssociateWorkflowLabelsRequest;
        namespace Responses {
            export interface $204 {
            }
            export interface $403 {
            }
        }
    }
    namespace CancelWorkflow {
        namespace Parameters {
            export type WorkflowId = string;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            workflowId: Parameters.WorkflowId;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        export type RequestBody = Components.Schemas.EmptyBodyRequest;
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace CreateAction {
        namespace Parameters {
            export type WorkspaceId = number; // int64
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        export type RequestBody = Components.Schemas.CreateActionRequest;
        namespace Responses {
            export type $200 = Components.Schemas.CreateActionResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace CreateAvatar {
        export interface RequestBody {
            image?: string; // binary
        }
        namespace Responses {
            export type $200 = Components.Schemas.CreateAvatarResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace CreateComputeEnv {
        namespace Parameters {
            export type WorkspaceId = number; // int64
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        export type RequestBody = Components.Schemas.CreateComputeEnvRequest;
        namespace Responses {
            export type $200 = Components.Schemas.CreateComputeEnvResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace CreateCredentials {
        namespace Parameters {
            export type WorkspaceId = number; // int64
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        export type RequestBody = Components.Schemas.CreateCredentialsRequest;
        namespace Responses {
            export type $200 = Components.Schemas.CreateCredentialsResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace CreateDataset {
        namespace Parameters {
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            workspaceId: Parameters.WorkspaceId /* int64 */;
        }
        export type RequestBody = Components.Schemas.CreateDatasetRequest;
        namespace Responses {
            export type $200 = Components.Schemas.CreateDatasetResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace CreateLabel {
        namespace Parameters {
            export type WorkspaceId = number; // int64
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        export type RequestBody = Components.Schemas.CreateLabelRequest;
        namespace Responses {
            export type $200 = Components.Schemas.CreateLabelResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace CreateOrganization {
        export type RequestBody = Components.Schemas.CreateOrganizationRequest;
        namespace Responses {
            export type $200 = Components.Schemas.CreateOrganizationResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
            export type $409 = Components.Schemas.ErrorResponse;
        }
    }
    namespace CreateOrganizationMember {
        namespace Parameters {
            export type OrgId = number; // int64
        }
        export interface PathParameters {
            orgId: Parameters.OrgId /* int64 */;
        }
        export type RequestBody = Components.Schemas.AddMemberRequest;
        namespace Responses {
            export type $200 = Components.Schemas.AddMemberResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
            export type $409 = Components.Schemas.ErrorResponse;
        }
    }
    namespace CreateOrganizationTeam {
        namespace Parameters {
            export type OrgId = number; // int64
        }
        export interface PathParameters {
            orgId: Parameters.OrgId /* int64 */;
        }
        export type RequestBody = Components.Schemas.CreateTeamRequest;
        namespace Responses {
            export type $200 = Components.Schemas.CreateTeamResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
            export type $409 = Components.Schemas.ErrorResponse;
        }
    }
    namespace CreateOrganizationTeamMember {
        namespace Parameters {
            export type OrgId = number; // int64
            export type TeamId = number; // int64
        }
        export interface PathParameters {
            orgId: Parameters.OrgId /* int64 */;
            teamId: Parameters.TeamId /* int64 */;
        }
        export type RequestBody = Components.Schemas.CreateTeamMemberRequest;
        namespace Responses {
            export type $200 = Components.Schemas.AddTeamMemberResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace CreatePipeline {
        namespace Parameters {
            export type WorkspaceId = number; // int64
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        export type RequestBody = Components.Schemas.CreatePipelineRequest;
        namespace Responses {
            export type $200 = Components.Schemas.CreatePipelineResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
            export type $409 = Components.Schemas.ErrorResponse;
        }
    }
    namespace CreatePipelineSecret {
        namespace Parameters {
            export type WorkspaceId = number; // int64
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        export type RequestBody = Components.Schemas.CreatePipelineSecretRequest;
        namespace Responses {
            export type $200 = Components.Schemas.CreatePipelineSecretResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace CreateToken {
        export type RequestBody = Components.Schemas.CreateAccessTokenRequest;
        namespace Responses {
            export type $200 = Components.Schemas.CreateAccessTokenResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
            export type $409 = Components.Schemas.ErrorResponse;
        }
    }
    namespace CreateTrace {
        namespace Parameters {
            export type WorkspaceId = number; // int64
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        export type RequestBody = Components.Schemas.TraceCreateRequest;
        namespace Responses {
            export type $200 = Components.Schemas.TraceCreateResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace CreateWorkflowLaunch {
        namespace Parameters {
            export type SourceWorkspaceId = number | null; // int64
            export type WorkspaceId = number; // int64
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
            sourceWorkspaceId?: Parameters.SourceWorkspaceId /* int64 */;
        }
        export type RequestBody = Components.Schemas.SubmitWorkflowLaunchRequest;
        namespace Responses {
            export type $200 = Components.Schemas.SubmitWorkflowLaunchResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace CreateWorkflowStar {
        namespace Parameters {
            export type WorkflowId = string;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            workflowId: Parameters.WorkflowId;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CreateWorkflowStarResponse;
            export interface $403 {
            }
            export type $404 = Components.Schemas.ErrorResponse;
            export type $409 = Components.Schemas.ErrorResponse;
        }
    }
    namespace CreateWorkspace {
        namespace Parameters {
            export type OrgId = number; // int64
        }
        export interface PathParameters {
            orgId: Parameters.OrgId /* int64 */;
        }
        export type RequestBody = Components.Schemas.CreateWorkspaceRequest;
        namespace Responses {
            export type $200 = Components.Schemas.CreateWorkspaceResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
            export type $409 = Components.Schemas.ErrorResponse;
        }
    }
    namespace CreateWorkspaceParticipant {
        namespace Parameters {
            export type OrgId = number; // int64
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            orgId: Parameters.OrgId /* int64 */;
            workspaceId: Parameters.WorkspaceId /* int64 */;
        }
        export type RequestBody = Components.Schemas.AddParticipantRequest;
        namespace Responses {
            export type $200 = Components.Schemas.AddParticipantResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
            export type $409 = Components.Schemas.ErrorResponse;
        }
    }
    namespace DeleteAction {
        namespace Parameters {
            export type ActionId = string;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            actionId: Parameters.ActionId;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace DeleteAllTokens {
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace DeleteComputeEnv {
        namespace Parameters {
            export type ComputeEnvId = string;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            computeEnvId: Parameters.ComputeEnvId;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
            export type $409 = Components.Schemas.ErrorResponse;
        }
    }
    namespace DeleteCredentials {
        namespace Parameters {
            export type CredentialsId = string;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            credentialsId: Parameters.CredentialsId;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace DeleteDataset {
        namespace Parameters {
            export type DatasetId = string;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            workspaceId: Parameters.WorkspaceId /* int64 */;
            datasetId: Parameters.DatasetId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace DeleteLabel {
        namespace Parameters {
            export type LabelId = number; // int64
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            labelId: Parameters.LabelId /* int64 */;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace DeleteOrganization {
        namespace Parameters {
            export type OrgId = number; // int64
        }
        export interface PathParameters {
            orgId: Parameters.OrgId /* int64 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace DeleteOrganizationMember {
        namespace Parameters {
            export type MemberId = number; // int64
            export type OrgId = number; // int64
        }
        export interface PathParameters {
            orgId: Parameters.OrgId /* int64 */;
            memberId: Parameters.MemberId /* int64 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace DeleteOrganizationTeam {
        namespace Parameters {
            export type OrgId = number; // int64
            export type TeamId = number; // int64
        }
        export interface PathParameters {
            orgId: Parameters.OrgId /* int64 */;
            teamId: Parameters.TeamId /* int64 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace DeleteOrganizationTeamMember {
        namespace Parameters {
            export type MemberId = number; // int64
            export type OrgId = number; // int64
            export type TeamId = number; // int64
        }
        export interface PathParameters {
            orgId: Parameters.OrgId /* int64 */;
            teamId: Parameters.TeamId /* int64 */;
            memberId: Parameters.MemberId /* int64 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace DeletePipeline {
        namespace Parameters {
            export type PipelineId = number; // int64
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            pipelineId: Parameters.PipelineId /* int64 */;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace DeletePipelineSecret {
        namespace Parameters {
            export type SecretId = number; // int64
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            secretId: Parameters.SecretId /* int64 */;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace DeleteToken {
        namespace Parameters {
            export type TokenId = number; // int64
        }
        export interface PathParameters {
            tokenId: Parameters.TokenId /* int64 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace DeleteUser {
        namespace Parameters {
            export type UserId = number; // int64
        }
        export interface PathParameters {
            userId: Parameters.UserId /* int64 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace DeleteWorkflow {
        namespace Parameters {
            export type Force = boolean;
            export type WorkflowId = string;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            workflowId: Parameters.WorkflowId;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
            force?: Parameters.Force;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace DeleteWorkflowMany {
        namespace Parameters {
            export type Force = boolean;
            export type WorkspaceId = number; // int64
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
            force?: Parameters.Force;
        }
        export type RequestBody = Components.Schemas.DeleteWorkflowsRequest;
        namespace Responses {
            export type $200 = Components.Schemas.DeleteWorkflowsResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace DeleteWorkflowStar {
        namespace Parameters {
            export type WorkflowId = string;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            workflowId: Parameters.WorkflowId;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CreateWorkflowStarResponse;
            export interface $403 {
            }
            export type $404 = Components.Schemas.ErrorResponse;
        }
    }
    namespace DeleteWorkspace {
        namespace Parameters {
            export type OrgId = number; // int64
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            orgId: Parameters.OrgId /* int64 */;
            workspaceId: Parameters.WorkspaceId /* int64 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace DeleteWorkspaceParticipant {
        namespace Parameters {
            export type OrgId = number; // int64
            export type ParticipantId = number; // int64
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            orgId: Parameters.OrgId /* int64 */;
            workspaceId: Parameters.WorkspaceId /* int64 */;
            participantId: Parameters.ParticipantId /* int64 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace DescribeAction {
        namespace Parameters {
            export type ActionId = string;
            export type Attributes = Components.Schemas.ActionQueryAttribute[];
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            actionId: Parameters.ActionId;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
            attributes?: Parameters.Attributes;
        }
        namespace Responses {
            export type $200 = Components.Schemas.DescribeActionResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace DescribeComputeEnv {
        namespace Parameters {
            export type Attributes = Components.Schemas.ComputeEnvQueryAttribute[];
            export type ComputeEnvId = string;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            computeEnvId: Parameters.ComputeEnvId;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
            attributes?: Parameters.Attributes;
        }
        namespace Responses {
            export type $200 = Components.Schemas.DescribeComputeEnvResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace DescribeCredentials {
        namespace Parameters {
            export type CredentialsId = string;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            credentialsId: Parameters.CredentialsId;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.DescribeCredentialsResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace DescribeDataset {
        namespace Parameters {
            export type DatasetId = string;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            workspaceId: Parameters.WorkspaceId /* int64 */;
            datasetId: Parameters.DatasetId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.DescribeDatasetResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace DescribeLaunch {
        namespace Parameters {
            export type LaunchId = string;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            launchId: Parameters.LaunchId;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.DescribeLaunchResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace DescribeOrganization {
        namespace Parameters {
            export type OrgId = number; // int64
        }
        export interface PathParameters {
            orgId: Parameters.OrgId /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.DescribeOrganizationResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace DescribeOrganizationTeam {
        namespace Parameters {
            export type OrgId = number; // int64
            export type TeamId = number; // int64
        }
        export interface PathParameters {
            orgId: Parameters.OrgId /* int64 */;
            teamId: Parameters.TeamId /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.DescribeTeamResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace DescribePipeline {
        namespace Parameters {
            export type Attributes = Components.Schemas.PipelineQueryAttribute[];
            export type PipelineId = number; // int64
            export type SourceWorkspaceId = number | null; // int64
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            pipelineId: Parameters.PipelineId /* int64 */;
        }
        export interface QueryParameters {
            attributes?: Parameters.Attributes;
            workspaceId?: Parameters.WorkspaceId /* int64 */;
            sourceWorkspaceId?: Parameters.SourceWorkspaceId /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.DescribePipelineResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace DescribePipelineLaunch {
        namespace Parameters {
            export type PipelineId = number; // int64
            export type SourceWorkspaceId = number | null; // int64
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            pipelineId: Parameters.PipelineId /* int64 */;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
            sourceWorkspaceId?: Parameters.SourceWorkspaceId /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.DescribeLaunchResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace DescribePipelineRepository {
        namespace Parameters {
            export type Name = string;
            export type Revision = string;
            export type WorkspaceId = number; // int64
        }
        export interface QueryParameters {
            name?: Parameters.Name;
            revision?: Parameters.Revision;
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.DescribePipelineInfoResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace DescribePipelineSchema {
        namespace Parameters {
            export type Attributes = Components.Schemas.PipelineSchemaAttributes[];
            export type PipelineId = number; // int64
            export type SourceWorkspaceId = number | null; // int64
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            pipelineId: Parameters.PipelineId /* int64 */;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
            sourceWorkspaceId?: Parameters.SourceWorkspaceId /* int64 */;
            attributes?: Parameters.Attributes;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PipelineSchemaResponse;
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace DescribePipelineSecret {
        namespace Parameters {
            export type SecretId = number; // int64
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            secretId: Parameters.SecretId /* int64 */;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.DescribePipelineSecretResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace DescribePlatform {
        namespace Parameters {
            export type CredentialsId = string;
            export type PlatformId = string;
            export type RegionId = string;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            platformId: Parameters.PlatformId;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
            regionId: Parameters.RegionId;
            credentialsId: Parameters.CredentialsId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.DescribePlatformResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace DescribeUser {
        namespace Parameters {
            export type UserId = number; // int64
        }
        export interface PathParameters {
            userId: Parameters.UserId /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.DescribeUserResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace DescribeWorkflow {
        namespace Parameters {
            export type Attributes = Components.Schemas.WorkflowQueryAttribute[];
            export type WorkflowId = string;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            workflowId: Parameters.WorkflowId;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
            attributes?: Parameters.Attributes;
        }
        namespace Responses {
            export type $200 = Components.Schemas.DescribeWorkflowResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace DescribeWorkflowLaunch {
        namespace Parameters {
            export type WorkflowId = string;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            workflowId: Parameters.WorkflowId;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.DescribeWorkflowLaunchResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
            export type $409 = Components.Schemas.ErrorResponse;
        }
    }
    namespace DescribeWorkflowMetrics {
        namespace Parameters {
            export type WorkflowId = string;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            workflowId: Parameters.WorkflowId;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.GetWorkflowMetricsResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace DescribeWorkflowProgress {
        namespace Parameters {
            export type WorkflowId = string;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            workflowId: Parameters.WorkflowId;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.GetProgressResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace DescribeWorkflowStar {
        namespace Parameters {
            export type WorkflowId = string;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            workflowId: Parameters.WorkflowId;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CreateWorkflowStarResponse;
            export interface $403 {
            }
            export type $404 = Components.Schemas.ErrorResponse;
        }
    }
    namespace DescribeWorkflowTask {
        namespace Parameters {
            export type TaskId = number; // int64
            export type WorkflowId = string;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            workflowId: Parameters.WorkflowId;
            taskId: Parameters.TaskId /* int64 */;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.DescribeTaskResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace DescribeWorkspace {
        namespace Parameters {
            export type OrgId = number; // int64
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            orgId: Parameters.OrgId /* int64 */;
            workspaceId: Parameters.WorkspaceId /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.DescribeWorkspaceResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace DownloadAvatar {
        namespace Parameters {
            export type AvatarId = string;
        }
        export interface PathParameters {
            avatarId: Parameters.AvatarId;
        }
        namespace Responses {
            export type $200 = string; // binary
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
            export interface $404 {
            }
        }
    }
    namespace DownloadDataset {
        namespace Parameters {
            export type DatasetId = string;
            export type FileName = string;
            export type Version = string;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            workspaceId: Parameters.WorkspaceId /* int64 */;
            datasetId: Parameters.DatasetId;
            version: Parameters.Version;
            fileName: Parameters.FileName;
        }
        namespace Responses {
            export type $200 = string; // binary
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
            export type $404 = Components.Schemas.ErrorResponse;
        }
    }
    namespace DownloadWorkflowLog {
        namespace Parameters {
            export type FileName = string;
            export type WorkflowId = string;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            workflowId: Parameters.WorkflowId;
        }
        export interface QueryParameters {
            fileName?: Parameters.FileName;
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        namespace Responses {
            export type $200 = string; // binary
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace DownloadWorkflowTaskLog {
        namespace Parameters {
            export type FileName = string;
            export type TaskId = number; // int64
            export type WorkflowId = string;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            workflowId: Parameters.WorkflowId;
            taskId: Parameters.TaskId /* int64 */;
        }
        export interface QueryParameters {
            fileName?: Parameters.FileName;
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        namespace Responses {
            export type $200 = string; // binary
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace GaRunCancel {
        namespace Parameters {
            export type RunId = string;
        }
        export interface PathParameters {
            run_id: Parameters.RunId;
        }
        export type RequestBody = Components.Schemas.EmptyBodyRequest;
        namespace Responses {
            export type $200 = Components.Schemas.RunId;
            export type $400 = Components.Schemas.WesErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace GaRunCreate {
        export type RequestBody = Components.Schemas.RunRequest;
        namespace Responses {
            export type $200 = Components.Schemas.RunId;
            export type $400 = Components.Schemas.WesErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace GaRunDescribe {
        namespace Parameters {
            export type RunId = string;
        }
        export interface PathParameters {
            run_id: Parameters.RunId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.RunLog;
            export type $400 = Components.Schemas.WesErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace GaRunList {
        namespace Parameters {
            export type PageSize = number; // int32
            export type PageToken = string;
        }
        export interface QueryParameters {
            page_size?: Parameters.PageSize /* int32 */;
            page_token?: Parameters.PageToken;
        }
        namespace Responses {
            export type $200 = Components.Schemas.RunListResponse;
            export type $400 = Components.Schemas.WesErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace GaRunStatus {
        namespace Parameters {
            export type RunId = string;
        }
        export interface PathParameters {
            run_id: Parameters.RunId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.RunStatus;
            export type $400 = Components.Schemas.WesErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace GaServiceInfo {
        namespace Responses {
            export type $200 = Components.Schemas.ServiceInfo;
            export type $400 = Components.Schemas.WesErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace GenerateRandomWorkflowName {
        namespace Responses {
            export type $200 = Components.Schemas.RandomWorkflowNameResponse;
        }
    }
    namespace GetWorkflowTaskLog {
        namespace Parameters {
            export type Next = string;
            export type TaskId = number; // int64
            export type WorkflowId = string;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            workflowId: Parameters.WorkflowId;
            taskId: Parameters.TaskId /* int64 */;
        }
        export interface QueryParameters {
            next?: Parameters.Next;
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.WorkflowLogResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace Info {
        namespace Responses {
            export type $200 = Components.Schemas.ServiceInfoResponse;
            export type $400 = Components.Schemas.ErrorResponse;
        }
    }
    namespace LaunchAction {
        namespace Parameters {
            export type ActionId = string;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            actionId: Parameters.ActionId;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        export type RequestBody = Components.Schemas.LaunchActionRequest;
        namespace Responses {
            export type $200 = Components.Schemas.LaunchActionResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace LeaveOrganization {
        namespace Parameters {
            export type OrgId = number; // int64
        }
        export interface PathParameters {
            orgId: Parameters.OrgId /* int64 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace LeaveWorkspaceParticipant {
        namespace Parameters {
            export type OrgId = number; // int64
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            orgId: Parameters.OrgId /* int64 */;
            workspaceId: Parameters.WorkspaceId /* int64 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace ListActionTypes {
        namespace Parameters {
            export type WorkspaceId = number; // int64
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ListEventTypesResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace ListActions {
        namespace Parameters {
            export type Attributes = Components.Schemas.ActionQueryAttribute[];
            export type WorkspaceId = number; // int64
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
            attributes?: Parameters.Attributes;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ListActionsResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace ListComputeEnvs {
        namespace Parameters {
            export type Status = string;
            export type WorkspaceId = number; // int64
        }
        export interface QueryParameters {
            status?: Parameters.Status;
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ListComputeEnvsResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace ListCredentials {
        namespace Parameters {
            export type PlatformId = string;
            export type WorkspaceId = number; // int64
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
            platformId?: Parameters.PlatformId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ListCredentialsResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace ListDatasetVersions {
        namespace Parameters {
            export type DatasetId = string;
            export type MimeType = string;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            workspaceId: Parameters.WorkspaceId /* int64 */;
            datasetId: Parameters.DatasetId;
        }
        export interface QueryParameters {
            mimeType?: Parameters.MimeType;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ListDatasetVersionsResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace ListDatasets {
        namespace Parameters {
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            workspaceId: Parameters.WorkspaceId /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ListDatasetsResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace ListLabels {
        namespace Parameters {
            export type IsDefault = boolean;
            export type Max = number; // int32
            export type Offset = number; // int32
            export type Search = string;
            export type Type = Components.Schemas.LabelType;
            export type WorkspaceId = number; // int64
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
            max?: Parameters.Max /* int32 */;
            offset?: Parameters.Offset /* int32 */;
            search?: Parameters.Search;
            type?: Parameters.Type;
            isDefault?: Parameters.IsDefault;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ListLabelsResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace ListLaunchDatasetVersions {
        namespace Parameters {
            export type LaunchId = string;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            launchId: Parameters.LaunchId;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.DescribeLaunchResponse;
            export interface $403 {
            }
        }
    }
    namespace ListOrganizationCollaborators {
        namespace Parameters {
            export type Max = number; // int32
            export type Offset = number; // int32
            export type OrgId = number; // int64
            export type Search = string;
        }
        export interface PathParameters {
            orgId: Parameters.OrgId /* int64 */;
        }
        export interface QueryParameters {
            max?: Parameters.Max /* int32 */;
            offset?: Parameters.Offset /* int32 */;
            search?: Parameters.Search;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ListMembersResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace ListOrganizationMembers {
        namespace Parameters {
            export type Max = number; // int32
            export type Offset = number; // int32
            export type OrgId = number; // int64
            export type Search = string;
        }
        export interface PathParameters {
            orgId: Parameters.OrgId /* int64 */;
        }
        export interface QueryParameters {
            max?: Parameters.Max /* int32 */;
            offset?: Parameters.Offset /* int32 */;
            search?: Parameters.Search;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ListMembersResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace ListOrganizationTeamMembers {
        namespace Parameters {
            export type Max = number | null; // int32
            export type Offset = number | null; // int32
            export type OrgId = number; // int64
            export type Search = string | null;
            export type TeamId = number; // int64
        }
        export interface PathParameters {
            orgId: Parameters.OrgId /* int64 */;
            teamId: Parameters.TeamId /* int64 */;
        }
        export interface QueryParameters {
            max?: Parameters.Max /* int32 */;
            offset?: Parameters.Offset /* int32 */;
            search?: Parameters.Search;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ListMembersResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace ListOrganizationTeams {
        namespace Parameters {
            export type Max = number; // int32
            export type Offset = number; // int32
            export type OrgId = number; // int64
            export type Search = string;
        }
        export interface PathParameters {
            orgId: Parameters.OrgId /* int64 */;
        }
        export interface QueryParameters {
            max?: Parameters.Max /* int32 */;
            offset?: Parameters.Offset /* int32 */;
            search?: Parameters.Search;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ListTeamResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace ListOrganizations {
        namespace Parameters {
            export type Role = string;
        }
        export interface QueryParameters {
            role?: Parameters.Role;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ListOrganizationsResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace ListPipelineRepositories {
        namespace Parameters {
            export type WorkspaceId = number; // int64
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ListPipelineInfoResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace ListPipelineSecrets {
        namespace Parameters {
            export type WorkspaceId = number; // int64
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ListPipelineSecretsResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace ListPipelines {
        namespace Parameters {
            export type Attributes = Components.Schemas.PipelineQueryAttribute[];
            export type Max = number; // int32
            export type Offset = number; // int32
            export type Search = string;
            export type Visibility = string;
            export type WorkspaceId = number; // int64
        }
        export interface QueryParameters {
            attributes?: Parameters.Attributes;
            workspaceId?: Parameters.WorkspaceId /* int64 */;
            max?: Parameters.Max /* int32 */;
            offset?: Parameters.Offset /* int32 */;
            search?: Parameters.Search;
            visibility?: Parameters.Visibility;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ListPipelinesResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace ListPlatformRegions {
        namespace Parameters {
            export type PlatformId = string;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            platformId: Parameters.PlatformId;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ListRegionsResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace ListPlatforms {
        namespace Parameters {
            export type WorkspaceId = number; // int64
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ListPlatformsResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace ListWorkflowTasks {
        namespace Parameters {
            export type Max = number; // int32
            export type Offset = number; // int32
            export type Search = string;
            export type SortBy = string;
            export type SortDir = string;
            export type WorkflowId = string;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            workflowId: Parameters.WorkflowId;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
            max?: Parameters.Max /* int32 */;
            offset?: Parameters.Offset /* int32 */;
            sortBy?: Parameters.SortBy;
            sortDir?: Parameters.SortDir;
            search?: Parameters.Search;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ListTasksResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace ListWorkflows {
        namespace Parameters {
            export type Attributes = Components.Schemas.WorkflowQueryAttribute[];
            export type Max = number; // int32
            export type Offset = number; // int32
            export type Search = string;
            export type WorkspaceId = number; // int64
        }
        export interface QueryParameters {
            attributes?: Parameters.Attributes;
            workspaceId?: Parameters.WorkspaceId /* int64 */;
            max?: Parameters.Max /* int32 */;
            offset?: Parameters.Offset /* int32 */;
            search?: Parameters.Search;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ListWorkflowsResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace ListWorkspaceDatasetVersions {
        namespace Parameters {
            export type MimeType = string | null;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            workspaceId: Parameters.WorkspaceId /* int64 */;
        }
        export interface QueryParameters {
            mimeType?: Parameters.MimeType;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ListDatasetVersionsResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace ListWorkspaceParticipants {
        namespace Parameters {
            export type Max = number; // int32
            export type Offset = number; // int32
            export type OrgId = number; // int64
            export type Search = string;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            orgId: Parameters.OrgId /* int64 */;
            workspaceId: Parameters.WorkspaceId /* int64 */;
        }
        export interface QueryParameters {
            max?: Parameters.Max /* int32 */;
            offset?: Parameters.Offset /* int32 */;
            search?: Parameters.Search;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ListParticipantsResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace ListWorkspaces {
        namespace Parameters {
            export type OrgId = number; // int64
        }
        export interface PathParameters {
            orgId: Parameters.OrgId /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ListWorkspacesResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace ListWorkspacesByTeam {
        namespace Parameters {
            export type Max = number; // int32
            export type Offset = number; // int32
            export type OrgId = number; // int64
            export type Search = string;
            export type TeamId = number; // int64
        }
        export interface PathParameters {
            orgId: Parameters.OrgId /* int64 */;
            teamId: Parameters.TeamId /* int64 */;
        }
        export interface QueryParameters {
            max?: Parameters.Max /* int32 */;
            offset?: Parameters.Offset /* int32 */;
            search?: Parameters.Search;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ListWorkspacesResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
            export type $404 = Components.Schemas.ErrorResponse;
        }
    }
    namespace ListWorkspacesUser {
        namespace Parameters {
            export type UserId = number; // int64
        }
        export interface PathParameters {
            userId: Parameters.UserId /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ListWorkspacesAndOrgResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace PauseAction {
        namespace Parameters {
            export type ActionId = string;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            actionId: Parameters.ActionId;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        export type RequestBody = Components.Schemas.EmptyBodyRequest;
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace RemoveLabelsFromActions {
        namespace Parameters {
            export type WorkspaceId = number; // int64
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        export type RequestBody = Components.Schemas.AssociateActionLabelsRequest;
        namespace Responses {
            export interface $204 {
            }
            export interface $403 {
            }
        }
    }
    namespace RemoveLabelsFromPipelines {
        namespace Parameters {
            export type WorkspaceId = number; // int64
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        export type RequestBody = Components.Schemas.AssociatePipelineLabelsRequest;
        namespace Responses {
            export interface $204 {
            }
            export interface $403 {
            }
        }
    }
    namespace RemoveLabelsFromWorkflows {
        namespace Parameters {
            export type WorkspaceId = number; // int64
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        export type RequestBody = Components.Schemas.AssociateWorkflowLabelsRequest;
        namespace Responses {
            export interface $204 {
            }
            export interface $403 {
            }
        }
    }
    namespace TokenList {
        namespace Responses {
            export type $200 = Components.Schemas.ListAccessTokensResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace UpdateAction {
        namespace Parameters {
            export type ActionId = string;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            actionId: Parameters.ActionId;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        export type RequestBody = Components.Schemas.UpdateActionRequest;
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace UpdateComputeEnv {
        namespace Parameters {
            export type ComputeEnvId = string;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            computeEnvId: Parameters.ComputeEnvId;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        export type RequestBody = Components.Schemas.UpdateComputeEnvRequest;
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
            export type $409 = Components.Schemas.ErrorResponse;
        }
    }
    namespace UpdateComputeEnvPrimary {
        namespace Parameters {
            export type ComputeEnvId = string;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            computeEnvId: Parameters.ComputeEnvId;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        export type RequestBody = Components.Schemas.EmptyBodyRequest;
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace UpdateCredentials {
        namespace Parameters {
            export type CredentialsId = string;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            credentialsId: Parameters.CredentialsId;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        export type RequestBody = Components.Schemas.UpdateCredentialsRequest;
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace UpdateDataset {
        namespace Parameters {
            export type DatasetId = string;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            workspaceId: Parameters.WorkspaceId /* int64 */;
            datasetId: Parameters.DatasetId;
        }
        export type RequestBody = Components.Schemas.UpdateDatasetRequest;
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace UpdateLabel {
        namespace Parameters {
            export type LabelId = number; // int64
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            labelId: Parameters.LabelId /* int64 */;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        export type RequestBody = Components.Schemas.UpdateLabelRequest;
        namespace Responses {
            export type $200 = Components.Schemas.UpdateLabelResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace UpdateOrganization {
        namespace Parameters {
            export type OrgId = number; // int64
        }
        export interface PathParameters {
            orgId: Parameters.OrgId /* int64 */;
        }
        export type RequestBody = Components.Schemas.UpdateOrganizationRequest;
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $409 = Components.Schemas.ErrorResponse;
        }
    }
    namespace UpdateOrganizationMemberRole {
        namespace Parameters {
            export type MemberId = number; // int64
            export type OrgId = number; // int64
        }
        export interface PathParameters {
            orgId: Parameters.OrgId /* int64 */;
            memberId: Parameters.MemberId /* int64 */;
        }
        export type RequestBody = Components.Schemas.UpdateMemberRoleRequest;
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace UpdateOrganizationTeam {
        namespace Parameters {
            export type OrgId = number; // int64
            export type TeamId = number; // int64
        }
        export interface PathParameters {
            orgId: Parameters.OrgId /* int64 */;
            teamId: Parameters.TeamId /* int64 */;
        }
        export type RequestBody = Components.Schemas.UpdateTeamRequest;
        namespace Responses {
            export interface $200 {
            }
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
            export type $409 = Components.Schemas.ErrorResponse;
        }
    }
    namespace UpdatePipeline {
        namespace Parameters {
            export type PipelineId = number; // int64
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            pipelineId: Parameters.PipelineId /* int64 */;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        export type RequestBody = Components.Schemas.UpdatePipelineRequest;
        namespace Responses {
            export type $200 = Components.Schemas.UpdatePipelineResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
            export type $409 = Components.Schemas.ErrorResponse;
        }
    }
    namespace UpdatePipelineSecret {
        namespace Parameters {
            export type SecretId = number; // int64
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            secretId: Parameters.SecretId /* int64 */;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        export type RequestBody = Components.Schemas.UpdatePipelineSecretRequest;
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace UpdateTraceBegin {
        namespace Parameters {
            export type WorkflowId = string;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            workflowId: Parameters.WorkflowId;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        export type RequestBody = Components.Schemas.TraceBeginRequest;
        namespace Responses {
            export type $200 = Components.Schemas.TraceBeginResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace UpdateTraceComplete {
        namespace Parameters {
            export type WorkflowId = string;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            workflowId: Parameters.WorkflowId;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        export type RequestBody = Components.Schemas.TraceCompleteRequest;
        namespace Responses {
            export type $200 = Components.Schemas.TraceCompleteResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace UpdateTraceHeartbeat {
        namespace Parameters {
            export type WorkflowId = string;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            workflowId: Parameters.WorkflowId;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        export type RequestBody = Components.Schemas.TraceHeartbeatRequest;
        namespace Responses {
            export type $200 = Components.Schemas.TraceHeartbeatResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace UpdateTraceProgress {
        namespace Parameters {
            export type WorkflowId = string;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            workflowId: Parameters.WorkflowId;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
        }
        export type RequestBody = Components.Schemas.TraceProgressRequest;
        namespace Responses {
            export type $200 = Components.Schemas.TraceProgressResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace UpdateUser {
        namespace Parameters {
            export type UserId = number; // int64
        }
        export interface PathParameters {
            userId: Parameters.UserId /* int64 */;
        }
        export type RequestBody = Components.Schemas.UserDbDto;
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace UpdateWorkspace {
        namespace Parameters {
            export type OrgId = number; // int64
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            orgId: Parameters.OrgId /* int64 */;
            workspaceId: Parameters.WorkspaceId /* int64 */;
        }
        export type RequestBody = Components.Schemas.UpdateWorkspaceRequest;
        namespace Responses {
            export type $200 = Components.Schemas.DescribeWorkspaceResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
            export type $409 = Components.Schemas.ErrorResponse;
        }
    }
    namespace UpdateWorkspaceParticipantRole {
        namespace Parameters {
            export type OrgId = number; // int64
            export type ParticipantId = number; // int64
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            orgId: Parameters.OrgId /* int64 */;
            workspaceId: Parameters.WorkspaceId /* int64 */;
            participantId: Parameters.ParticipantId /* int64 */;
        }
        export type RequestBody = Components.Schemas.UpdateParticipantRoleRequest;
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace UploadDataset {
        namespace Parameters {
            export type DatasetId = string;
            export type Header = boolean;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            workspaceId: Parameters.WorkspaceId /* int64 */;
            datasetId: Parameters.DatasetId;
        }
        export interface QueryParameters {
            header?: Parameters.Header;
        }
        export type RequestBody = Components.Schemas.MultiRequestFileSchema;
        namespace Responses {
            export type $200 = Components.Schemas.UploadDatasetVersionResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace UserInfo {
        namespace Responses {
            export type $200 = Components.Schemas.DescribeUserResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace ValidateActionName {
        namespace Parameters {
            export type Name = string;
            export type WorkspaceId = number; // int64
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
            name?: Parameters.Name;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
            export type $409 = Components.Schemas.ErrorResponse;
        }
    }
    namespace ValidateComputeEnvName {
        namespace Parameters {
            export type Name = string;
            export type WorkspaceId = number; // int64
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
            name?: Parameters.Name;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
            export type $409 = Components.Schemas.ErrorResponse;
        }
    }
    namespace ValidateCredentialsName {
        namespace Parameters {
            export type Name = string;
            export type WorkspaceId = number; // int64
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
            name?: Parameters.Name;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
            export type $409 = Components.Schemas.ErrorResponse;
        }
    }
    namespace ValidateOrganizationName {
        namespace Parameters {
            export type Name = string;
        }
        export interface QueryParameters {
            name?: Parameters.Name;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
            export type $409 = Components.Schemas.ErrorResponse;
        }
    }
    namespace ValidatePipelineName {
        namespace Parameters {
            export type Name = string;
            export type OrgId = number; // int64
            export type WorkspaceId = number; // int64
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
            orgId?: Parameters.OrgId /* int64 */;
            name?: Parameters.Name;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
            export type $409 = Components.Schemas.ErrorResponse;
        }
    }
    namespace ValidatePipelineSecretName {
        namespace Parameters {
            export type Name = string;
            export type WorkspaceId = number; // int64
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
            name?: Parameters.Name;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
            export type $409 = Components.Schemas.ErrorResponse;
        }
    }
    namespace ValidateTeamName {
        namespace Parameters {
            export type Name = string;
            export type OrgId = number; // int64
        }
        export interface PathParameters {
            orgId: Parameters.OrgId /* int64 */;
        }
        export interface QueryParameters {
            name?: Parameters.Name;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace ValidateUserName {
        namespace Parameters {
            export type Name = string;
        }
        export interface QueryParameters {
            name?: Parameters.Name;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
            export type $409 = Components.Schemas.ErrorResponse;
        }
    }
    namespace ValidateWorkflowConstraints {
        namespace Parameters {
            export type RunName = string;
            export type SessionId = string;
        }
        export interface QueryParameters {
            runName?: Parameters.RunName;
            sessionId?: Parameters.SessionId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export type $409 = Components.Schemas.ErrorResponse;
        }
    }
    namespace WorkflowLogs {
        namespace Parameters {
            export type Next = string;
            export type WorkflowId = string;
            export type WorkspaceId = number; // int64
        }
        export interface PathParameters {
            workflowId: Parameters.WorkflowId;
        }
        export interface QueryParameters {
            workspaceId?: Parameters.WorkspaceId /* int64 */;
            next?: Parameters.Next;
        }
        namespace Responses {
            export type $200 = Components.Schemas.WorkflowLogResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
        }
    }
    namespace WorkspaceValidate {
        namespace Parameters {
            export type Name = string;
            export type OrgId = number; // int64
        }
        export interface PathParameters {
            orgId: Parameters.OrgId /* int64 */;
        }
        export interface QueryParameters {
            name?: Parameters.Name;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export interface $403 {
            }
            export type $409 = Components.Schemas.ErrorResponse;
        }
    }
}

export interface OperationMethods {
  /**
   * ListActions - List actions
   *
   * Lists all available pipeline actions in a user context. Append `?workspaceId` to list actions in a workspace context.
   */
  'ListActions'(
    parameters?: Parameters<Paths.ListActions.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ListActions.Responses.$200>
  /**
   * CreateAction - Create action
   *
   * Creates a new pipeline action. Append `?workspaceId` to associate the action with the given workspace.
   */
  'CreateAction'(
    parameters?: Parameters<Paths.CreateAction.QueryParameters> | null,
    data?: Paths.CreateAction.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.CreateAction.Responses.$200>
  /**
   * AddLabelsToActions - Add labels to actions
   *
   * Adds the given list of labels to the given pipeline actions.
   */
  'AddLabelsToActions'(
    parameters?: Parameters<Paths.AddLabelsToActions.QueryParameters> | null,
    data?: Paths.AddLabelsToActions.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.AddLabelsToActions.Responses.$204>
  /**
   * ApplyLabelsToActions - Apply labels to actions
   *
   * Applies the given list of labels to the given pipeline actions. Existing labels are replaced.
   */
  'ApplyLabelsToActions'(
    parameters?: Parameters<Paths.ApplyLabelsToActions.QueryParameters> | null,
    data?: Paths.ApplyLabelsToActions.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ApplyLabelsToActions.Responses.$204>
  /**
   * RemoveLabelsFromActions - Remove labels from actions
   *
   * Removes the given list of labels from the given pipeline actions.
   */
  'RemoveLabelsFromActions'(
    parameters?: Parameters<Paths.RemoveLabelsFromActions.QueryParameters> | null,
    data?: Paths.RemoveLabelsFromActions.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.RemoveLabelsFromActions.Responses.$204>
  /**
   * ListActionTypes - List action event types
   *
   * Lists the supported event types that trigger a pipeline action. Append `?workspaceId` to list event types in a workspace context.
   */
  'ListActionTypes'(
    parameters?: Parameters<Paths.ListActionTypes.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ListActionTypes.Responses.$200>
  /**
   * ValidateActionName - Validate action name
   *
   * Confirms the validity of the given action name. Append `?name=<your_action_name>`.
   */
  'ValidateActionName'(
    parameters?: Parameters<Paths.ValidateActionName.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ValidateActionName.Responses.$204>
  /**
   * DescribeAction - Describe action
   *
   * Retrieves the details of the pipeline action identified by the given `actionId`.
   */
  'DescribeAction'(
    parameters?: Parameters<Paths.DescribeAction.PathParameters & Paths.DescribeAction.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DescribeAction.Responses.$200>
  /**
   * UpdateAction - Update action
   *
   * Updates the details of the action identified by the given `actionId`. The `source` of an existing action cannot be changed.
   */
  'UpdateAction'(
    parameters?: Parameters<Paths.UpdateAction.PathParameters & Paths.UpdateAction.QueryParameters> | null,
    data?: Paths.UpdateAction.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.UpdateAction.Responses.$204>
  /**
   * DeleteAction - Delete action
   *
   * Deletes the pipeline action identified by the given `actionId`.
   */
  'DeleteAction'(
    parameters?: Parameters<Paths.DeleteAction.PathParameters & Paths.DeleteAction.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DeleteAction.Responses.$204>
  /**
   * LaunchAction - Trigger Tower Launch action
   *
   * Triggers the execution of the Tower Launch action identified by the given `actionId`.
   */
  'LaunchAction'(
    parameters?: Parameters<Paths.LaunchAction.PathParameters & Paths.LaunchAction.QueryParameters> | null,
    data?: Paths.LaunchAction.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.LaunchAction.Responses.$200>
  /**
   * PauseAction - Pause or resume action
   *
   * Pauses or resumes the pipeline action identified by the given `actionId`.
   */
  'PauseAction'(
    parameters?: Parameters<Paths.PauseAction.PathParameters & Paths.PauseAction.QueryParameters> | null,
    data?: Paths.PauseAction.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.PauseAction.Responses.$204>
  /**
   * CreateAvatar - Create the avatar image
   */
  'CreateAvatar'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateAvatar.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.CreateAvatar.Responses.$200>
  /**
   * DownloadAvatar - Download the avatar image
   */
  'DownloadAvatar'(
    parameters?: Parameters<Paths.DownloadAvatar.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DownloadAvatar.Responses.$200>
  /**
   * ListComputeEnvs - List compute environments
   *
   * Lists all available Tower compute environments in a user context. Append `?workspaceId` to list compute environments in a workspace context, and `?status` to filter by compute environment status.
   */
  'ListComputeEnvs'(
    parameters?: Parameters<Paths.ListComputeEnvs.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ListComputeEnvs.Responses.$200>
  /**
   * CreateComputeEnv - Create compute environment
   *
   * Creates a new Tower compute environment. Append `?workspaceId` to create the environment in a workspace context.
   */
  'CreateComputeEnv'(
    parameters?: Parameters<Paths.CreateComputeEnv.QueryParameters> | null,
    data?: Paths.CreateComputeEnv.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.CreateComputeEnv.Responses.$200>
  /**
   * ValidateComputeEnvName - Validate compute environment name
   *
   * Confirms the validity of the given compute environment name in a user context. Append `?name=<your_ce_name>`.
   */
  'ValidateComputeEnvName'(
    parameters?: Parameters<Paths.ValidateComputeEnvName.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ValidateComputeEnvName.Responses.$204>
  /**
   * DescribeComputeEnv - Describe compute environment
   *
   * Retrieves the details of the Tower compute environment identified by the given `computeEnvId`.
   */
  'DescribeComputeEnv'(
    parameters?: Parameters<Paths.DescribeComputeEnv.PathParameters & Paths.DescribeComputeEnv.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DescribeComputeEnv.Responses.$200>
  /**
   * UpdateComputeEnv - Update compute environment
   *
   * Updates the details of the compute environment identified by the given `computeEnvId`.
   */
  'UpdateComputeEnv'(
    parameters?: Parameters<Paths.UpdateComputeEnv.PathParameters & Paths.UpdateComputeEnv.QueryParameters> | null,
    data?: Paths.UpdateComputeEnv.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.UpdateComputeEnv.Responses.$204>
  /**
   * DeleteComputeEnv - Delete compute environment
   *
   * Deletes the Tower compute environment identified by the given `computeEnvId`.
   */
  'DeleteComputeEnv'(
    parameters?: Parameters<Paths.DeleteComputeEnv.PathParameters & Paths.DeleteComputeEnv.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DeleteComputeEnv.Responses.$204>
  /**
   * UpdateComputeEnvPrimary - Define primary compute environment
   *
   * Selects the compute environment identified by the given `computeEnvId` as the primary compute environment in the given workspace context.
   */
  'UpdateComputeEnvPrimary'(
    parameters?: Parameters<Paths.UpdateComputeEnvPrimary.PathParameters & Paths.UpdateComputeEnvPrimary.QueryParameters> | null,
    data?: Paths.UpdateComputeEnvPrimary.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.UpdateComputeEnvPrimary.Responses.$204>
  /**
   * ListCredentials - List credentials
   *
   * Lists all available Tower credentials in a user context. Append `?workspaceId` to list credentials in a workspace context, and `?platformId` to filter credentials by computing platform.
   */
  'ListCredentials'(
    parameters?: Parameters<Paths.ListCredentials.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ListCredentials.Responses.$200>
  /**
   * CreateCredentials - Create credentials
   *
   * Creates new Tower credentials in a user context. Append `?workspaceId` to create the credentials in a workspace context.
   */
  'CreateCredentials'(
    parameters?: Parameters<Paths.CreateCredentials.QueryParameters> | null,
    data?: Paths.CreateCredentials.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.CreateCredentials.Responses.$200>
  /**
   * ValidateCredentialsName - Validate credential name
   *
   * Validates the given credentials name. Append `?name=<your_credential_name>`.
   */
  'ValidateCredentialsName'(
    parameters?: Parameters<Paths.ValidateCredentialsName.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ValidateCredentialsName.Responses.$204>
  /**
   * DescribeCredentials - Describe credentials
   *
   * Retrieves the details of the credentials identified by the given `credentialsId`.
   */
  'DescribeCredentials'(
    parameters?: Parameters<Paths.DescribeCredentials.PathParameters & Paths.DescribeCredentials.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DescribeCredentials.Responses.$200>
  /**
   * UpdateCredentials - Update credentials
   *
   * Updates the details of the credentials identified by the given `credentialsId`.
   */
  'UpdateCredentials'(
    parameters?: Parameters<Paths.UpdateCredentials.PathParameters & Paths.UpdateCredentials.QueryParameters> | null,
    data?: Paths.UpdateCredentials.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.UpdateCredentials.Responses.$204>
  /**
   * DeleteCredentials - Delete credentials
   *
   * Deletes the credentials identified by the given `credentialsId`.
   */
  'DeleteCredentials'(
    parameters?: Parameters<Paths.DeleteCredentials.PathParameters & Paths.DeleteCredentials.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DeleteCredentials.Responses.$204>
  /**
   * GaRunList - GA4GH list runs
   */
  'GaRunList'(
    parameters?: Parameters<Paths.GaRunList.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.GaRunList.Responses.$200>
  /**
   * GaRunCreate - GA4GH create a new run
   */
  'GaRunCreate'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.GaRunCreate.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.GaRunCreate.Responses.$200>
  /**
   * GaRunDescribe - GA4GH describe run
   */
  'GaRunDescribe'(
    parameters?: Parameters<Paths.GaRunDescribe.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.GaRunDescribe.Responses.$200>
  /**
   * GaRunCancel - GA4GH cancel a run
   */
  'GaRunCancel'(
    parameters?: Parameters<Paths.GaRunCancel.PathParameters> | null,
    data?: Paths.GaRunCancel.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.GaRunCancel.Responses.$200>
  /**
   * GaRunStatus - GA4GH retrieve run status
   */
  'GaRunStatus'(
    parameters?: Parameters<Paths.GaRunStatus.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.GaRunStatus.Responses.$200>
  /**
   * GaServiceInfo - GA4GH service info
   */
  'GaServiceInfo'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.GaServiceInfo.Responses.$200>
  /**
   * ListLabels - List labels
   *
   * Lists all available labels in a user context. Append `?workspaceId` to list labels in a workspace context.
   */
  'ListLabels'(
    parameters?: Parameters<Paths.ListLabels.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ListLabels.Responses.$200>
  /**
   * CreateLabel - Create label
   *
   * Creates a new label in a user context. Append `?workspaceId` to create the label in a workspace context. Resource labels include `resource: true` and a `value`.
   */
  'CreateLabel'(
    parameters?: Parameters<Paths.CreateLabel.QueryParameters> | null,
    data?: Paths.CreateLabel.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.CreateLabel.Responses.$200>
  /**
   * UpdateLabel - Update label
   *
   * Updates the label identified by the given `labelId`.
   */
  'UpdateLabel'(
    parameters?: Parameters<Paths.UpdateLabel.PathParameters & Paths.UpdateLabel.QueryParameters> | null,
    data?: Paths.UpdateLabel.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.UpdateLabel.Responses.$200>
  /**
   * DeleteLabel - Delete label
   *
   * Deletes the label identified by the given `labelId`.
   */
  'DeleteLabel'(
    parameters?: Parameters<Paths.DeleteLabel.PathParameters & Paths.DeleteLabel.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DeleteLabel.Responses.$204>
  /**
   * DescribeLaunch - Describe Launch record
   *
   * Retrieves the details of the launch identified by the given `launchId`.
   */
  'DescribeLaunch'(
    parameters?: Parameters<Paths.DescribeLaunch.PathParameters & Paths.DescribeLaunch.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DescribeLaunch.Responses.$200>
  /**
   * ListLaunchDatasetVersions - Describe launch datasets
   *
   * Retrieves the details of the datasets used in the launch identified by the given `launchId`.
   */
  'ListLaunchDatasetVersions'(
    parameters?: Parameters<Paths.ListLaunchDatasetVersions.PathParameters & Paths.ListLaunchDatasetVersions.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ListLaunchDatasetVersions.Responses.$200>
  /**
   * ListOrganizations - List organizations
   *
   * Lists all available organizations in a user context.
   */
  'ListOrganizations'(
    parameters?: Parameters<Paths.ListOrganizations.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ListOrganizations.Responses.$200>
  /**
   * CreateOrganization - Create organization
   *
   * Creates a new organization.
   */
  'CreateOrganization'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateOrganization.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.CreateOrganization.Responses.$200>
  /**
   * ValidateOrganizationName - Validate organization name
   *
   * Confirms the validity of the given organization name. Append `?name=<your_org_name>`.
   */
  'ValidateOrganizationName'(
    parameters?: Parameters<Paths.ValidateOrganizationName.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ValidateOrganizationName.Responses.$204>
  /**
   * DescribeOrganization - Describe organization
   *
   * Retrieves the details of the organization identified by the given `orgId`.
   */
  'DescribeOrganization'(
    parameters?: Parameters<Paths.DescribeOrganization.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DescribeOrganization.Responses.$200>
  /**
   * UpdateOrganization - Update organization
   *
   * Updates the details of the organization identified by the given `orgId`.
   */
  'UpdateOrganization'(
    parameters?: Parameters<Paths.UpdateOrganization.PathParameters> | null,
    data?: Paths.UpdateOrganization.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.UpdateOrganization.Responses.$204>
  /**
   * DeleteOrganization - Delete organization
   *
   * Deletes the organization identified by the given `orgId`.
   */
  'DeleteOrganization'(
    parameters?: Parameters<Paths.DeleteOrganization.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DeleteOrganization.Responses.$204>
  /**
   * ListOrganizationCollaborators - List organization collaborators
   *
   * Lists the collaborators of the organization identified by the given `orgId`.
   */
  'ListOrganizationCollaborators'(
    parameters?: Parameters<Paths.ListOrganizationCollaborators.PathParameters & Paths.ListOrganizationCollaborators.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ListOrganizationCollaborators.Responses.$200>
  /**
   * ListOrganizationMembers - List organization members
   *
   * Lists the members of the organization identified by the given `orgId`.
   */
  'ListOrganizationMembers'(
    parameters?: Parameters<Paths.ListOrganizationMembers.PathParameters & Paths.ListOrganizationMembers.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ListOrganizationMembers.Responses.$200>
  /**
   * CreateOrganizationMember - Add organization member
   *
   * Adds a new member to the organization identified by the given `orgId`.
   */
  'CreateOrganizationMember'(
    parameters?: Parameters<Paths.CreateOrganizationMember.PathParameters> | null,
    data?: Paths.CreateOrganizationMember.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.CreateOrganizationMember.Responses.$200>
  /**
   * LeaveOrganization - Leave organization
   *
   * Removes the requesting user from the organization identified by the given `orgId`.
   */
  'LeaveOrganization'(
    parameters?: Parameters<Paths.LeaveOrganization.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.LeaveOrganization.Responses.$204>
  /**
   * DeleteOrganizationMember - Delete member
   *
   * Deletes the member identified by the given `memberId`.
   */
  'DeleteOrganizationMember'(
    parameters?: Parameters<Paths.DeleteOrganizationMember.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DeleteOrganizationMember.Responses.$204>
  /**
   * UpdateOrganizationMemberRole - Update member role
   *
   * Updates the role of the member identified by the given `memberId`.
   */
  'UpdateOrganizationMemberRole'(
    parameters?: Parameters<Paths.UpdateOrganizationMemberRole.PathParameters> | null,
    data?: Paths.UpdateOrganizationMemberRole.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.UpdateOrganizationMemberRole.Responses.$204>
  /**
   * ListOrganizationTeams - List organization teams
   *
   * Lists all teams in the organization identified by the given `orgId`.
   */
  'ListOrganizationTeams'(
    parameters?: Parameters<Paths.ListOrganizationTeams.PathParameters & Paths.ListOrganizationTeams.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ListOrganizationTeams.Responses.$200>
  /**
   * CreateOrganizationTeam - Create team
   *
   * Creates a new team in the organization identified by the given `orgId`.
   */
  'CreateOrganizationTeam'(
    parameters?: Parameters<Paths.CreateOrganizationTeam.PathParameters> | null,
    data?: Paths.CreateOrganizationTeam.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.CreateOrganizationTeam.Responses.$200>
  /**
   * ValidateTeamName - Validate team name
   *
   * Confirms the validity of the given team name. Append `?name=<your_team_name>`.
   */
  'ValidateTeamName'(
    parameters?: Parameters<Paths.ValidateTeamName.PathParameters & Paths.ValidateTeamName.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ValidateTeamName.Responses.$204>
  /**
   * DescribeOrganizationTeam - Describe team
   *
   * Retrieves the details of the team identified by the given `teamId`.
   */
  'DescribeOrganizationTeam'(
    parameters?: Parameters<Paths.DescribeOrganizationTeam.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DescribeOrganizationTeam.Responses.$200>
  /**
   * UpdateOrganizationTeam - Update team
   *
   * Updates the details of the team identified by the given `teamId`.
   */
  'UpdateOrganizationTeam'(
    parameters?: Parameters<Paths.UpdateOrganizationTeam.PathParameters> | null,
    data?: Paths.UpdateOrganizationTeam.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.UpdateOrganizationTeam.Responses.$200 | Paths.UpdateOrganizationTeam.Responses.$204>
  /**
   * DeleteOrganizationTeam - Delete team
   *
   * Deletes the team identified by the given `teamId`.
   */
  'DeleteOrganizationTeam'(
    parameters?: Parameters<Paths.DeleteOrganizationTeam.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DeleteOrganizationTeam.Responses.$204>
  /**
   * ListOrganizationTeamMembers - List team members
   *
   * Lists the team members associated with the given `teamId`.
   */
  'ListOrganizationTeamMembers'(
    parameters?: Parameters<Paths.ListOrganizationTeamMembers.PathParameters & Paths.ListOrganizationTeamMembers.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ListOrganizationTeamMembers.Responses.$200>
  /**
   * CreateOrganizationTeamMember - Create team member
   *
   * Adds a new member to the team identified by the given `teamId`.
   */
  'CreateOrganizationTeamMember'(
    parameters?: Parameters<Paths.CreateOrganizationTeamMember.PathParameters> | null,
    data?: Paths.CreateOrganizationTeamMember.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.CreateOrganizationTeamMember.Responses.$200>
  /**
   * DeleteOrganizationTeamMember - Delete team member
   *
   * Deletes the team member identified by the given `memberId`.
   */
  'DeleteOrganizationTeamMember'(
    parameters?: Parameters<Paths.DeleteOrganizationTeamMember.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DeleteOrganizationTeamMember.Responses.$204>
  /**
   * ListWorkspacesByTeam - List team workspaces
   *
   * Lists all the workspaces of which the given `teamId` is a participant.
   */
  'ListWorkspacesByTeam'(
    parameters?: Parameters<Paths.ListWorkspacesByTeam.PathParameters & Paths.ListWorkspacesByTeam.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ListWorkspacesByTeam.Responses.$200>
  /**
   * ListWorkspaces - List organization workspaces
   *
   * Lists the organization workspaces in `orgId` to which the requesting user belongs.
   */
  'ListWorkspaces'(
    parameters?: Parameters<Paths.ListWorkspaces.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ListWorkspaces.Responses.$200>
  /**
   * CreateWorkspace - Create workspace
   *
   * Creates a new organization workspace.
   */
  'CreateWorkspace'(
    parameters?: Parameters<Paths.CreateWorkspace.PathParameters> | null,
    data?: Paths.CreateWorkspace.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.CreateWorkspace.Responses.$200>
  /**
   * WorkspaceValidate - Validate workspace name
   *
   * Confirms the validity of the given workspace name. Append `?name=<your_workspace_name>`.
   */
  'WorkspaceValidate'(
    parameters?: Parameters<Paths.WorkspaceValidate.PathParameters & Paths.WorkspaceValidate.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.WorkspaceValidate.Responses.$204>
  /**
   * DescribeWorkspace - Describe workspace
   *
   * Retrieves the details of the workspace identified by the given `workspaceId`.
   */
  'DescribeWorkspace'(
    parameters?: Parameters<Paths.DescribeWorkspace.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DescribeWorkspace.Responses.$200>
  /**
   * UpdateWorkspace - Update workspace
   *
   * Updates the details of the workspace identified by the given `workspaceId`.
   */
  'UpdateWorkspace'(
    parameters?: Parameters<Paths.UpdateWorkspace.PathParameters> | null,
    data?: Paths.UpdateWorkspace.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.UpdateWorkspace.Responses.$200>
  /**
   * DeleteWorkspace - Delete workspace
   *
   * Deletes the workspace identified by the given `workspaceId`.
   */
  'DeleteWorkspace'(
    parameters?: Parameters<Paths.DeleteWorkspace.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DeleteWorkspace.Responses.$204>
  /**
   * ListWorkspaceParticipants - List workspace participants
   *
   * Lists the participants of the workspace identified by the given `workspaceId`.
   */
  'ListWorkspaceParticipants'(
    parameters?: Parameters<Paths.ListWorkspaceParticipants.PathParameters & Paths.ListWorkspaceParticipants.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ListWorkspaceParticipants.Responses.$200>
  /**
   * LeaveWorkspaceParticipant - Leave workspace
   *
   * Removes the requesting user from the given workspace.
   */
  'LeaveWorkspaceParticipant'(
    parameters?: Parameters<Paths.LeaveWorkspaceParticipant.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.LeaveWorkspaceParticipant.Responses.$204>
  /**
   * CreateWorkspaceParticipant - Create workspace participant
   *
   * Adds a new participant to the workspace identified by the given `workspaceId`.
   */
  'CreateWorkspaceParticipant'(
    parameters?: Parameters<Paths.CreateWorkspaceParticipant.PathParameters> | null,
    data?: Paths.CreateWorkspaceParticipant.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.CreateWorkspaceParticipant.Responses.$200>
  /**
   * DeleteWorkspaceParticipant - Delete workspace participant
   *
   * Deletes the given participant from the given workspace.
   */
  'DeleteWorkspaceParticipant'(
    parameters?: Parameters<Paths.DeleteWorkspaceParticipant.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DeleteWorkspaceParticipant.Responses.$204>
  /**
   * UpdateWorkspaceParticipantRole - Update participant role
   *
   * Updates the role of the given participant in the given workspace.
   */
  'UpdateWorkspaceParticipantRole'(
    parameters?: Parameters<Paths.UpdateWorkspaceParticipantRole.PathParameters> | null,
    data?: Paths.UpdateWorkspaceParticipantRole.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.UpdateWorkspaceParticipantRole.Responses.$204>
  /**
   * ListPipelineSecrets - List pipeline secrets
   *
   * Lists all available pipeline secrets in a user context. Append `?workspaceId` to list secrets in a workspace context.
   */
  'ListPipelineSecrets'(
    parameters?: Parameters<Paths.ListPipelineSecrets.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ListPipelineSecrets.Responses.$200>
  /**
   * CreatePipelineSecret - Create pipeline secret
   *
   * Creates a new pipeline secret in the user context. Append `?workspaceId` to create the secret in a workspace context.
   */
  'CreatePipelineSecret'(
    parameters?: Parameters<Paths.CreatePipelineSecret.QueryParameters> | null,
    data?: Paths.CreatePipelineSecret.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.CreatePipelineSecret.Responses.$200>
  /**
   * ValidatePipelineSecretName - Validate secret name
   *
   * Confirms the validity of the given pipeline secret name in a user context. Append `?name=<your_secret_name>`. Append `?workspaceId` to validate the name in a workspace context.
   */
  'ValidatePipelineSecretName'(
    parameters?: Parameters<Paths.ValidatePipelineSecretName.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ValidatePipelineSecretName.Responses.$204>
  /**
   * DescribePipelineSecret - Describe pipeline secret
   *
   * Retrieves the details of the pipeline secret identified by the given `secretId`.
   */
  'DescribePipelineSecret'(
    parameters?: Parameters<Paths.DescribePipelineSecret.PathParameters & Paths.DescribePipelineSecret.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DescribePipelineSecret.Responses.$200>
  /**
   * UpdatePipelineSecret - Update secret
   *
   * Updates the pipeline secret identified by the given `secretId`.
   */
  'UpdatePipelineSecret'(
    parameters?: Parameters<Paths.UpdatePipelineSecret.PathParameters & Paths.UpdatePipelineSecret.QueryParameters> | null,
    data?: Paths.UpdatePipelineSecret.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.UpdatePipelineSecret.Responses.$204>
  /**
   * DeletePipelineSecret - Delete secret
   *
   * Deletes the pipeline secret identified by the given `secretId`.
   */
  'DeletePipelineSecret'(
    parameters?: Parameters<Paths.DeletePipelineSecret.PathParameters & Paths.DeletePipelineSecret.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DeletePipelineSecret.Responses.$204>
  /**
   * ListPipelines - List Tower pipelines
   *
   * Lists all available Tower pipelines in a user context. Append `?workspaceId` to list pipelines in a workspace context.
   */
  'ListPipelines'(
    parameters?: Parameters<Paths.ListPipelines.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ListPipelines.Responses.$200>
  /**
   * CreatePipeline - Create pipeline
   *
   * Creates a new pipeline in a user context. Append `?workspaceId` to create the pipeline in a workspace context.
   */
  'CreatePipeline'(
    parameters?: Parameters<Paths.CreatePipeline.QueryParameters> | null,
    data?: Paths.CreatePipeline.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.CreatePipeline.Responses.$200>
  /**
   * DescribePipelineRepository - Describe remote pipeline repository
   *
   * Retrieves the details of a remote Nextflow pipeline Git repository. Append the repository name or full URL with `?name`.
   */
  'DescribePipelineRepository'(
    parameters?: Parameters<Paths.DescribePipelineRepository.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DescribePipelineRepository.Responses.$200>
  /**
   * AddLabelsToPipelines - Add labels to pipelines
   *
   * Adds the given list of labels to the given pipelines.
   */
  'AddLabelsToPipelines'(
    parameters?: Parameters<Paths.AddLabelsToPipelines.QueryParameters> | null,
    data?: Paths.AddLabelsToPipelines.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.AddLabelsToPipelines.Responses.$204>
  /**
   * ApplyLabelsToPipelines - Apply labels to pipelines
   *
   * Applies the given list of labels to the given pipelines. Existing labels are replaced.
   */
  'ApplyLabelsToPipelines'(
    parameters?: Parameters<Paths.ApplyLabelsToPipelines.QueryParameters> | null,
    data?: Paths.ApplyLabelsToPipelines.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ApplyLabelsToPipelines.Responses.$204>
  /**
   * RemoveLabelsFromPipelines - Remove labels from pipelines
   *
   * Removes the given list of labels from the given pipelines.
   */
  'RemoveLabelsFromPipelines'(
    parameters?: Parameters<Paths.RemoveLabelsFromPipelines.QueryParameters> | null,
    data?: Paths.RemoveLabelsFromPipelines.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.RemoveLabelsFromPipelines.Responses.$204>
  /**
   * ListPipelineRepositories - List user pipeline repositories
   *
   * Lists known Nextflow pipeline Git repositories, extracted from existing runs. Append `?workspaceId` to list repositories in a workspace context.
   */
  'ListPipelineRepositories'(
    parameters?: Parameters<Paths.ListPipelineRepositories.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ListPipelineRepositories.Responses.$200>
  /**
   * ValidatePipelineName - Validate pipeline name
   *
   * Confirms the validity of the given pipeline `name` in a user context. Append `?name=<your_pipeline_name>`. Append `?workspaceId` to validate the name in a workspace context.
   */
  'ValidatePipelineName'(
    parameters?: Parameters<Paths.ValidatePipelineName.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ValidatePipelineName.Responses.$204>
  /**
   * DescribePipeline - Describe pipeline
   *
   * Retrieves the details of the pipeline identified by the given `pipelineId`.
   */
  'DescribePipeline'(
    parameters?: Parameters<Paths.DescribePipeline.PathParameters & Paths.DescribePipeline.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DescribePipeline.Responses.$200>
  /**
   * UpdatePipeline - Update pipeline
   *
   * Updates the details of the pipeline identified by the given `pipelineId`.
   */
  'UpdatePipeline'(
    parameters?: Parameters<Paths.UpdatePipeline.PathParameters & Paths.UpdatePipeline.QueryParameters> | null,
    data?: Paths.UpdatePipeline.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.UpdatePipeline.Responses.$200>
  /**
   * DeletePipeline - Delete pipeline
   *
   * Deletes the pipeline identified by the given `pipelineId`.
   */
  'DeletePipeline'(
    parameters?: Parameters<Paths.DeletePipeline.PathParameters & Paths.DeletePipeline.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DeletePipeline.Responses.$204>
  /**
   * DescribePipelineLaunch - Describe pipeline launch
   *
   * Retrieves the launch details of the pipeline identified by the given `pipelineId`.
   */
  'DescribePipelineLaunch'(
    parameters?: Parameters<Paths.DescribePipelineLaunch.PathParameters & Paths.DescribePipelineLaunch.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DescribePipelineLaunch.Responses.$200>
  /**
   * DescribePipelineSchema - Describe pipeline schema
   *
   * Retrieves the pipeline schema of the pipeline identified by the given `pipelineId`.
   */
  'DescribePipelineSchema'(
    parameters?: Parameters<Paths.DescribePipelineSchema.PathParameters & Paths.DescribePipelineSchema.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DescribePipelineSchema.Responses.$200 | Paths.DescribePipelineSchema.Responses.$204>
  /**
   * ListPlatforms - List platforms
   *
   * Lists all available computing platforms in a user context. Append `?workspaceId` to list platforms in a workspace context.
   */
  'ListPlatforms'(
    parameters?: Parameters<Paths.ListPlatforms.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ListPlatforms.Responses.$200>
  /**
   * DescribePlatform - Describe platform
   *
   * Retrieves the details of the computing platform identified by the given `platformId`.
   */
  'DescribePlatform'(
    parameters?: Parameters<Paths.DescribePlatform.PathParameters & Paths.DescribePlatform.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DescribePlatform.Responses.$200>
  /**
   * ListPlatformRegions - List platform regions
   *
   * Lists the available regions for the computing platform identified by the given `platformId`.
   */
  'ListPlatformRegions'(
    parameters?: Parameters<Paths.ListPlatformRegions.PathParameters & Paths.ListPlatformRegions.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ListPlatformRegions.Responses.$200>
  /**
   * Info - General Tower service features and version
   */
  'Info'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.Info.Responses.$200>
  /**
   * TokenList - List all available API tokens
   */
  'TokenList'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.TokenList.Responses.$200>
  /**
   * CreateToken - Create an API token
   */
  'CreateToken'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateToken.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.CreateToken.Responses.$200>
  /**
   * DeleteAllTokens - Delete all user API tokens
   */
  'DeleteAllTokens'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DeleteAllTokens.Responses.$204>
  /**
   * DeleteToken - Delete an API token
   */
  'DeleteToken'(
    parameters?: Parameters<Paths.DeleteToken.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DeleteToken.Responses.$204>
  /**
   * CreateTrace - Create a new Workflow execution trace
   */
  'CreateTrace'(
    parameters?: Parameters<Paths.CreateTrace.QueryParameters> | null,
    data?: Paths.CreateTrace.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.CreateTrace.Responses.$200>
  /**
   * UpdateTraceBegin - Signal the Workflow execution has started
   */
  'UpdateTraceBegin'(
    parameters?: Parameters<Paths.UpdateTraceBegin.PathParameters & Paths.UpdateTraceBegin.QueryParameters> | null,
    data?: Paths.UpdateTraceBegin.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.UpdateTraceBegin.Responses.$200>
  /**
   * UpdateTraceComplete - Signal the Workflow execution has completed
   */
  'UpdateTraceComplete'(
    parameters?: Parameters<Paths.UpdateTraceComplete.PathParameters & Paths.UpdateTraceComplete.QueryParameters> | null,
    data?: Paths.UpdateTraceComplete.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.UpdateTraceComplete.Responses.$200>
  /**
   * UpdateTraceHeartbeat - Period request to signal the execution is still on-going
   */
  'UpdateTraceHeartbeat'(
    parameters?: Parameters<Paths.UpdateTraceHeartbeat.PathParameters & Paths.UpdateTraceHeartbeat.QueryParameters> | null,
    data?: Paths.UpdateTraceHeartbeat.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.UpdateTraceHeartbeat.Responses.$200>
  /**
   * UpdateTraceProgress - Store one or more task executions metadata for the specified Workflow
   */
  'UpdateTraceProgress'(
    parameters?: Parameters<Paths.UpdateTraceProgress.PathParameters & Paths.UpdateTraceProgress.QueryParameters> | null,
    data?: Paths.UpdateTraceProgress.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.UpdateTraceProgress.Responses.$200>
  /**
   * UserInfo - Describe current user
   */
  'UserInfo'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.UserInfo.Responses.$200>
  /**
   * ListWorkspacesUser - List user workspaces and organizations
   *
   * Lists the workspaces and organizations to which the user identified by the given `userId` belongs.
   */
  'ListWorkspacesUser'(
    parameters?: Parameters<Paths.ListWorkspacesUser.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ListWorkspacesUser.Responses.$200>
  /**
   * ValidateUserName - Check that the user name is valid
   */
  'ValidateUserName'(
    parameters?: Parameters<Paths.ValidateUserName.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ValidateUserName.Responses.$204>
  /**
   * DescribeUser - Describe a user entity
   */
  'DescribeUser'(
    parameters?: Parameters<Paths.DescribeUser.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DescribeUser.Responses.$200>
  /**
   * UpdateUser - Update an user entity
   */
  'UpdateUser'(
    parameters?: Parameters<Paths.UpdateUser.PathParameters> | null,
    data?: Paths.UpdateUser.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.UpdateUser.Responses.$204>
  /**
   * DeleteUser - Delete a user entity
   */
  'DeleteUser'(
    parameters?: Parameters<Paths.DeleteUser.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DeleteUser.Responses.$204>
  /**
   * ListWorkflows - List workflows
   *
   * Lists all workflow records, enriched by `attributes`. Append `?workspaceId` to list workflow records in a workspace context.
   */
  'ListWorkflows'(
    parameters?: Parameters<Paths.ListWorkflows.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ListWorkflows.Responses.$200>
  /**
   * DeleteWorkflowMany - Delete workflows
   *
   * Deletes the workflow records identified by the given list of `workflowIds`.
   */
  'DeleteWorkflowMany'(
    parameters?: Parameters<Paths.DeleteWorkflowMany.QueryParameters> | null,
    data?: Paths.DeleteWorkflowMany.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DeleteWorkflowMany.Responses.$200>
  /**
   * AddLabelsToWorkflows - Add labels to workflows
   *
   * Adds the given list of labels to the given workflows.
   */
  'AddLabelsToWorkflows'(
    parameters?: Parameters<Paths.AddLabelsToWorkflows.QueryParameters> | null,
    data?: Paths.AddLabelsToWorkflows.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.AddLabelsToWorkflows.Responses.$204>
  /**
   * ApplyLabelsToWorkflows - Apply labels to workflows
   *
   * Applies the given list of labels to the given workflows. Existing labels are replaced.
   */
  'ApplyLabelsToWorkflows'(
    parameters?: Parameters<Paths.ApplyLabelsToWorkflows.QueryParameters> | null,
    data?: Paths.ApplyLabelsToWorkflows.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ApplyLabelsToWorkflows.Responses.$204>
  /**
   * RemoveLabelsFromWorkflows - Remove labels from workflows
   *
   * Removes the given list of labels from the given workflows.
   */
  'RemoveLabelsFromWorkflows'(
    parameters?: Parameters<Paths.RemoveLabelsFromWorkflows.QueryParameters> | null,
    data?: Paths.RemoveLabelsFromWorkflows.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.RemoveLabelsFromWorkflows.Responses.$204>
  /**
   * CreateWorkflowLaunch - Launch workflow
   *
   * Submits a workflow execution.
   */
  'CreateWorkflowLaunch'(
    parameters?: Parameters<Paths.CreateWorkflowLaunch.QueryParameters> | null,
    data?: Paths.CreateWorkflowLaunch.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.CreateWorkflowLaunch.Responses.$200>
  /**
   * GenerateRandomWorkflowName - Generates a random name
   */
  'GenerateRandomWorkflowName'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.GenerateRandomWorkflowName.Responses.$200>
  /**
   * ValidateWorkflowConstraints - Check that the given run name of a workflow has a valid format. When the session ID is given: check that no other workflow in the system exists with the combination of both elements
   */
  'ValidateWorkflowConstraints'(
    parameters?: Parameters<Paths.ValidateWorkflowConstraints.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ValidateWorkflowConstraints.Responses.$204>
  /**
   * DescribeWorkflow - Describe workflow
   *
   * Retrieves the details of the workflow record associated with the given `workflowId`.
   */
  'DescribeWorkflow'(
    parameters?: Parameters<Paths.DescribeWorkflow.PathParameters & Paths.DescribeWorkflow.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DescribeWorkflow.Responses.$200>
  /**
   * DeleteWorkflow - Delete the Workflow entity with the given ID
   */
  'DeleteWorkflow'(
    parameters?: Parameters<Paths.DeleteWorkflow.PathParameters & Paths.DeleteWorkflow.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DeleteWorkflow.Responses.$204>
  /**
   * CancelWorkflow - Cancel workflow
   *
   * Cancels the workflow execution identified by the given `workflowId`.
   */
  'CancelWorkflow'(
    parameters?: Parameters<Paths.CancelWorkflow.PathParameters & Paths.CancelWorkflow.QueryParameters> | null,
    data?: Paths.CancelWorkflow.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.CancelWorkflow.Responses.$204>
  /**
   * DownloadWorkflowLog - Download workflow files
   *
   * Downloads the workflow files for the Nextflow main job associated with the given `workflowId`.
   */
  'DownloadWorkflowLog'(
    parameters?: Parameters<Paths.DownloadWorkflowLog.PathParameters & Paths.DownloadWorkflowLog.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DownloadWorkflowLog.Responses.$200>
  /**
   * DownloadWorkflowTaskLog - Download workflow task files
   *
   * Downloads the workflow files of the task identified by the given `taskId`.
   */
  'DownloadWorkflowTaskLog'(
    parameters?: Parameters<Paths.DownloadWorkflowTaskLog.PathParameters & Paths.DownloadWorkflowTaskLog.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DownloadWorkflowTaskLog.Responses.$200>
  /**
   * DescribeWorkflowLaunch - Describe workflow launch
   *
   * Retrieves the details of the workflow launch associated with the given `workflowId`.
   */
  'DescribeWorkflowLaunch'(
    parameters?: Parameters<Paths.DescribeWorkflowLaunch.PathParameters & Paths.DescribeWorkflowLaunch.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DescribeWorkflowLaunch.Responses.$200>
  /**
   * WorkflowLogs - Get workflow logs
   *
   * Retrieves the output logs for the Nextflow main job of the workflow identified by the given `workflowId`.
   */
  'WorkflowLogs'(
    parameters?: Parameters<Paths.WorkflowLogs.PathParameters & Paths.WorkflowLogs.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.WorkflowLogs.Responses.$200>
  /**
   * GetWorkflowTaskLog - Get workflow task logs
   *
   * Retrieves the output logs for the workflow task identified by the given `taskId`.
   */
  'GetWorkflowTaskLog'(
    parameters?: Parameters<Paths.GetWorkflowTaskLog.PathParameters & Paths.GetWorkflowTaskLog.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.GetWorkflowTaskLog.Responses.$200>
  /**
   * DescribeWorkflowMetrics - Get the execution metrics for the given Workflow ID
   */
  'DescribeWorkflowMetrics'(
    parameters?: Parameters<Paths.DescribeWorkflowMetrics.PathParameters & Paths.DescribeWorkflowMetrics.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DescribeWorkflowMetrics.Responses.$200>
  /**
   * DescribeWorkflowProgress - Retrieve the execution progress for the given Workflow ID
   */
  'DescribeWorkflowProgress'(
    parameters?: Parameters<Paths.DescribeWorkflowProgress.PathParameters & Paths.DescribeWorkflowProgress.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DescribeWorkflowProgress.Responses.$200>
  /**
   * DescribeWorkflowStar - Check workflow star status
   *
   * Confirms whether the given `workflowId` is starred.
   */
  'DescribeWorkflowStar'(
    parameters?: Parameters<Paths.DescribeWorkflowStar.PathParameters & Paths.DescribeWorkflowStar.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DescribeWorkflowStar.Responses.$200>
  /**
   * CreateWorkflowStar - Star workflow
   *
   * Adds the workflow identified by the given `workflowId` to your list of starred workflows.
   */
  'CreateWorkflowStar'(
    parameters?: Parameters<Paths.CreateWorkflowStar.PathParameters & Paths.CreateWorkflowStar.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.CreateWorkflowStar.Responses.$200>
  /**
   * DeleteWorkflowStar - Unstar workflow
   *
   * Removes the workflow identified by the given `workflowId` from your list of starred workflows.
   */
  'DeleteWorkflowStar'(
    parameters?: Parameters<Paths.DeleteWorkflowStar.PathParameters & Paths.DeleteWorkflowStar.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DeleteWorkflowStar.Responses.$200>
  /**
   * DescribeWorkflowTask - Describe a task entity with the given ID
   */
  'DescribeWorkflowTask'(
    parameters?: Parameters<Paths.DescribeWorkflowTask.PathParameters & Paths.DescribeWorkflowTask.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DescribeWorkflowTask.Responses.$200>
  /**
   * ListWorkflowTasks - List the tasks for the given Workflow ID and filter parameters
   */
  'ListWorkflowTasks'(
    parameters?: Parameters<Paths.ListWorkflowTasks.PathParameters & Paths.ListWorkflowTasks.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ListWorkflowTasks.Responses.$200>
  /**
   * ListDatasets - List available datasets
   *
   * Lists all available datasets in the workspace context identified by the given `workspaceId`.
   */
  'ListDatasets'(
    parameters?: Parameters<Paths.ListDatasets.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ListDatasets.Responses.$200>
  /**
   * CreateDataset - Create dataset
   *
   * Creates a new Tower dataset in the given workspace context. Include the dataset file and details in your request body.
   */
  'CreateDataset'(
    parameters?: Parameters<Paths.CreateDataset.PathParameters> | null,
    data?: Paths.CreateDataset.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.CreateDataset.Responses.$200>
  /**
   * ListWorkspaceDatasetVersions - List latest dataset versions
   *
   * Lists the latest version of each dataset associated with the given `workspaceId`.
   */
  'ListWorkspaceDatasetVersions'(
    parameters?: Parameters<Paths.ListWorkspaceDatasetVersions.PathParameters & Paths.ListWorkspaceDatasetVersions.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ListWorkspaceDatasetVersions.Responses.$200>
  /**
   * UpdateDataset - Update dataset
   *
   * Updates the details of the dataset identified by the given `datasetId`.
   */
  'UpdateDataset'(
    parameters?: Parameters<Paths.UpdateDataset.PathParameters> | null,
    data?: Paths.UpdateDataset.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.UpdateDataset.Responses.$204>
  /**
   * DeleteDataset - Delete dataset
   *
   * Deletes the dataset identified by the given `datasetId`.
   */
  'DeleteDataset'(
    parameters?: Parameters<Paths.DeleteDataset.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DeleteDataset.Responses.$204>
  /**
   * DescribeDataset - Describe dataset
   *
   * Retrieves the metadata of the dataset identified by the given `datasetId`.
   */
  'DescribeDataset'(
    parameters?: Parameters<Paths.DescribeDataset.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DescribeDataset.Responses.$200>
  /**
   * UploadDataset - Upload new dataset version
   *
   * Uploads the CSV or TSV content to create a new version of the dataset identified by the given `datasetId`.
   */
  'UploadDataset'(
    parameters?: Parameters<Paths.UploadDataset.PathParameters & Paths.UploadDataset.QueryParameters> | null,
    data?: Paths.UploadDataset.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.UploadDataset.Responses.$200>
  /**
   * DownloadDataset - Download dataset content
   *
   * Downloads the content of the dataset identified by the given `datasetId` and `version`.
   */
  'DownloadDataset'(
    parameters?: Parameters<Paths.DownloadDataset.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DownloadDataset.Responses.$200>
  /**
   * ListDatasetVersions - List all dataset versions
   *
   * Lists all versions of the given `datasetId`.
   */
  'ListDatasetVersions'(
    parameters?: Parameters<Paths.ListDatasetVersions.PathParameters & Paths.ListDatasetVersions.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ListDatasetVersions.Responses.$200>
}

export interface PathsDictionary {
  ['/actions']: {
    /**
     * ListActions - List actions
     *
     * Lists all available pipeline actions in a user context. Append `?workspaceId` to list actions in a workspace context.
     */
    'get'(
      parameters?: Parameters<Paths.ListActions.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ListActions.Responses.$200>
    /**
     * CreateAction - Create action
     *
     * Creates a new pipeline action. Append `?workspaceId` to associate the action with the given workspace.
     */
    'post'(
      parameters?: Parameters<Paths.CreateAction.QueryParameters> | null,
      data?: Paths.CreateAction.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.CreateAction.Responses.$200>
  }
  ['/actions/labels/add']: {
    /**
     * AddLabelsToActions - Add labels to actions
     *
     * Adds the given list of labels to the given pipeline actions.
     */
    'post'(
      parameters?: Parameters<Paths.AddLabelsToActions.QueryParameters> | null,
      data?: Paths.AddLabelsToActions.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.AddLabelsToActions.Responses.$204>
  }
  ['/actions/labels/apply']: {
    /**
     * ApplyLabelsToActions - Apply labels to actions
     *
     * Applies the given list of labels to the given pipeline actions. Existing labels are replaced.
     */
    'post'(
      parameters?: Parameters<Paths.ApplyLabelsToActions.QueryParameters> | null,
      data?: Paths.ApplyLabelsToActions.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ApplyLabelsToActions.Responses.$204>
  }
  ['/actions/labels/remove']: {
    /**
     * RemoveLabelsFromActions - Remove labels from actions
     *
     * Removes the given list of labels from the given pipeline actions.
     */
    'post'(
      parameters?: Parameters<Paths.RemoveLabelsFromActions.QueryParameters> | null,
      data?: Paths.RemoveLabelsFromActions.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.RemoveLabelsFromActions.Responses.$204>
  }
  ['/actions/types']: {
    /**
     * ListActionTypes - List action event types
     *
     * Lists the supported event types that trigger a pipeline action. Append `?workspaceId` to list event types in a workspace context.
     */
    'get'(
      parameters?: Parameters<Paths.ListActionTypes.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ListActionTypes.Responses.$200>
  }
  ['/actions/validate']: {
    /**
     * ValidateActionName - Validate action name
     *
     * Confirms the validity of the given action name. Append `?name=<your_action_name>`.
     */
    'get'(
      parameters?: Parameters<Paths.ValidateActionName.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ValidateActionName.Responses.$204>
  }
  ['/actions/{actionId}']: {
    /**
     * DescribeAction - Describe action
     *
     * Retrieves the details of the pipeline action identified by the given `actionId`.
     */
    'get'(
      parameters?: Parameters<Paths.DescribeAction.PathParameters & Paths.DescribeAction.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DescribeAction.Responses.$200>
    /**
     * UpdateAction - Update action
     *
     * Updates the details of the action identified by the given `actionId`. The `source` of an existing action cannot be changed.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateAction.PathParameters & Paths.UpdateAction.QueryParameters> | null,
      data?: Paths.UpdateAction.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.UpdateAction.Responses.$204>
    /**
     * DeleteAction - Delete action
     *
     * Deletes the pipeline action identified by the given `actionId`.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteAction.PathParameters & Paths.DeleteAction.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DeleteAction.Responses.$204>
  }
  ['/actions/{actionId}/launch']: {
    /**
     * LaunchAction - Trigger Tower Launch action
     *
     * Triggers the execution of the Tower Launch action identified by the given `actionId`.
     */
    'post'(
      parameters?: Parameters<Paths.LaunchAction.PathParameters & Paths.LaunchAction.QueryParameters> | null,
      data?: Paths.LaunchAction.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.LaunchAction.Responses.$200>
  }
  ['/actions/{actionId}/pause']: {
    /**
     * PauseAction - Pause or resume action
     *
     * Pauses or resumes the pipeline action identified by the given `actionId`.
     */
    'post'(
      parameters?: Parameters<Paths.PauseAction.PathParameters & Paths.PauseAction.QueryParameters> | null,
      data?: Paths.PauseAction.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.PauseAction.Responses.$204>
  }
  ['/avatars']: {
    /**
     * CreateAvatar - Create the avatar image
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateAvatar.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.CreateAvatar.Responses.$200>
  }
  ['/avatars/{avatarId}']: {
    /**
     * DownloadAvatar - Download the avatar image
     */
    'get'(
      parameters?: Parameters<Paths.DownloadAvatar.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DownloadAvatar.Responses.$200>
  }
  ['/compute-envs']: {
    /**
     * ListComputeEnvs - List compute environments
     *
     * Lists all available Tower compute environments in a user context. Append `?workspaceId` to list compute environments in a workspace context, and `?status` to filter by compute environment status.
     */
    'get'(
      parameters?: Parameters<Paths.ListComputeEnvs.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ListComputeEnvs.Responses.$200>
    /**
     * CreateComputeEnv - Create compute environment
     *
     * Creates a new Tower compute environment. Append `?workspaceId` to create the environment in a workspace context.
     */
    'post'(
      parameters?: Parameters<Paths.CreateComputeEnv.QueryParameters> | null,
      data?: Paths.CreateComputeEnv.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.CreateComputeEnv.Responses.$200>
  }
  ['/compute-envs/validate']: {
    /**
     * ValidateComputeEnvName - Validate compute environment name
     *
     * Confirms the validity of the given compute environment name in a user context. Append `?name=<your_ce_name>`.
     */
    'get'(
      parameters?: Parameters<Paths.ValidateComputeEnvName.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ValidateComputeEnvName.Responses.$204>
  }
  ['/compute-envs/{computeEnvId}']: {
    /**
     * DescribeComputeEnv - Describe compute environment
     *
     * Retrieves the details of the Tower compute environment identified by the given `computeEnvId`.
     */
    'get'(
      parameters?: Parameters<Paths.DescribeComputeEnv.PathParameters & Paths.DescribeComputeEnv.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DescribeComputeEnv.Responses.$200>
    /**
     * UpdateComputeEnv - Update compute environment
     *
     * Updates the details of the compute environment identified by the given `computeEnvId`.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateComputeEnv.PathParameters & Paths.UpdateComputeEnv.QueryParameters> | null,
      data?: Paths.UpdateComputeEnv.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.UpdateComputeEnv.Responses.$204>
    /**
     * DeleteComputeEnv - Delete compute environment
     *
     * Deletes the Tower compute environment identified by the given `computeEnvId`.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteComputeEnv.PathParameters & Paths.DeleteComputeEnv.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DeleteComputeEnv.Responses.$204>
  }
  ['/compute-envs/{computeEnvId}/primary']: {
    /**
     * UpdateComputeEnvPrimary - Define primary compute environment
     *
     * Selects the compute environment identified by the given `computeEnvId` as the primary compute environment in the given workspace context.
     */
    'post'(
      parameters?: Parameters<Paths.UpdateComputeEnvPrimary.PathParameters & Paths.UpdateComputeEnvPrimary.QueryParameters> | null,
      data?: Paths.UpdateComputeEnvPrimary.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.UpdateComputeEnvPrimary.Responses.$204>
  }
  ['/credentials']: {
    /**
     * ListCredentials - List credentials
     *
     * Lists all available Tower credentials in a user context. Append `?workspaceId` to list credentials in a workspace context, and `?platformId` to filter credentials by computing platform.
     */
    'get'(
      parameters?: Parameters<Paths.ListCredentials.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ListCredentials.Responses.$200>
    /**
     * CreateCredentials - Create credentials
     *
     * Creates new Tower credentials in a user context. Append `?workspaceId` to create the credentials in a workspace context.
     */
    'post'(
      parameters?: Parameters<Paths.CreateCredentials.QueryParameters> | null,
      data?: Paths.CreateCredentials.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.CreateCredentials.Responses.$200>
  }
  ['/credentials/validate']: {
    /**
     * ValidateCredentialsName - Validate credential name
     *
     * Validates the given credentials name. Append `?name=<your_credential_name>`.
     */
    'get'(
      parameters?: Parameters<Paths.ValidateCredentialsName.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ValidateCredentialsName.Responses.$204>
  }
  ['/credentials/{credentialsId}']: {
    /**
     * DescribeCredentials - Describe credentials
     *
     * Retrieves the details of the credentials identified by the given `credentialsId`.
     */
    'get'(
      parameters?: Parameters<Paths.DescribeCredentials.PathParameters & Paths.DescribeCredentials.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DescribeCredentials.Responses.$200>
    /**
     * UpdateCredentials - Update credentials
     *
     * Updates the details of the credentials identified by the given `credentialsId`.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateCredentials.PathParameters & Paths.UpdateCredentials.QueryParameters> | null,
      data?: Paths.UpdateCredentials.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.UpdateCredentials.Responses.$204>
    /**
     * DeleteCredentials - Delete credentials
     *
     * Deletes the credentials identified by the given `credentialsId`.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteCredentials.PathParameters & Paths.DeleteCredentials.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DeleteCredentials.Responses.$204>
  }
  ['/ga4gh/wes/v1/runs']: {
    /**
     * GaRunList - GA4GH list runs
     */
    'get'(
      parameters?: Parameters<Paths.GaRunList.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.GaRunList.Responses.$200>
    /**
     * GaRunCreate - GA4GH create a new run
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.GaRunCreate.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.GaRunCreate.Responses.$200>
  }
  ['/ga4gh/wes/v1/runs/{run_id}']: {
    /**
     * GaRunDescribe - GA4GH describe run
     */
    'get'(
      parameters?: Parameters<Paths.GaRunDescribe.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.GaRunDescribe.Responses.$200>
  }
  ['/ga4gh/wes/v1/runs/{run_id}/cancel']: {
    /**
     * GaRunCancel - GA4GH cancel a run
     */
    'post'(
      parameters?: Parameters<Paths.GaRunCancel.PathParameters> | null,
      data?: Paths.GaRunCancel.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.GaRunCancel.Responses.$200>
  }
  ['/ga4gh/wes/v1/runs/{run_id}/status']: {
    /**
     * GaRunStatus - GA4GH retrieve run status
     */
    'get'(
      parameters?: Parameters<Paths.GaRunStatus.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.GaRunStatus.Responses.$200>
  }
  ['/ga4gh/wes/v1/service-info']: {
    /**
     * GaServiceInfo - GA4GH service info
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.GaServiceInfo.Responses.$200>
  }
  ['/labels']: {
    /**
     * ListLabels - List labels
     *
     * Lists all available labels in a user context. Append `?workspaceId` to list labels in a workspace context.
     */
    'get'(
      parameters?: Parameters<Paths.ListLabels.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ListLabels.Responses.$200>
    /**
     * CreateLabel - Create label
     *
     * Creates a new label in a user context. Append `?workspaceId` to create the label in a workspace context. Resource labels include `resource: true` and a `value`.
     */
    'post'(
      parameters?: Parameters<Paths.CreateLabel.QueryParameters> | null,
      data?: Paths.CreateLabel.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.CreateLabel.Responses.$200>
  }
  ['/labels/{labelId}']: {
    /**
     * UpdateLabel - Update label
     *
     * Updates the label identified by the given `labelId`.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateLabel.PathParameters & Paths.UpdateLabel.QueryParameters> | null,
      data?: Paths.UpdateLabel.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.UpdateLabel.Responses.$200>
    /**
     * DeleteLabel - Delete label
     *
     * Deletes the label identified by the given `labelId`.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteLabel.PathParameters & Paths.DeleteLabel.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DeleteLabel.Responses.$204>
  }
  ['/launch/{launchId}']: {
    /**
     * DescribeLaunch - Describe Launch record
     *
     * Retrieves the details of the launch identified by the given `launchId`.
     */
    'get'(
      parameters?: Parameters<Paths.DescribeLaunch.PathParameters & Paths.DescribeLaunch.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DescribeLaunch.Responses.$200>
  }
  ['/launch/{launchId}/datasets']: {
    /**
     * ListLaunchDatasetVersions - Describe launch datasets
     *
     * Retrieves the details of the datasets used in the launch identified by the given `launchId`.
     */
    'get'(
      parameters?: Parameters<Paths.ListLaunchDatasetVersions.PathParameters & Paths.ListLaunchDatasetVersions.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ListLaunchDatasetVersions.Responses.$200>
  }
  ['/orgs']: {
    /**
     * ListOrganizations - List organizations
     *
     * Lists all available organizations in a user context.
     */
    'get'(
      parameters?: Parameters<Paths.ListOrganizations.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ListOrganizations.Responses.$200>
    /**
     * CreateOrganization - Create organization
     *
     * Creates a new organization.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateOrganization.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.CreateOrganization.Responses.$200>
  }
  ['/orgs/validate']: {
    /**
     * ValidateOrganizationName - Validate organization name
     *
     * Confirms the validity of the given organization name. Append `?name=<your_org_name>`.
     */
    'get'(
      parameters?: Parameters<Paths.ValidateOrganizationName.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ValidateOrganizationName.Responses.$204>
  }
  ['/orgs/{orgId}']: {
    /**
     * DescribeOrganization - Describe organization
     *
     * Retrieves the details of the organization identified by the given `orgId`.
     */
    'get'(
      parameters?: Parameters<Paths.DescribeOrganization.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DescribeOrganization.Responses.$200>
    /**
     * UpdateOrganization - Update organization
     *
     * Updates the details of the organization identified by the given `orgId`.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateOrganization.PathParameters> | null,
      data?: Paths.UpdateOrganization.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.UpdateOrganization.Responses.$204>
    /**
     * DeleteOrganization - Delete organization
     *
     * Deletes the organization identified by the given `orgId`.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteOrganization.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DeleteOrganization.Responses.$204>
  }
  ['/orgs/{orgId}/collaborators']: {
    /**
     * ListOrganizationCollaborators - List organization collaborators
     *
     * Lists the collaborators of the organization identified by the given `orgId`.
     */
    'get'(
      parameters?: Parameters<Paths.ListOrganizationCollaborators.PathParameters & Paths.ListOrganizationCollaborators.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ListOrganizationCollaborators.Responses.$200>
  }
  ['/orgs/{orgId}/members']: {
    /**
     * ListOrganizationMembers - List organization members
     *
     * Lists the members of the organization identified by the given `orgId`.
     */
    'get'(
      parameters?: Parameters<Paths.ListOrganizationMembers.PathParameters & Paths.ListOrganizationMembers.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ListOrganizationMembers.Responses.$200>
  }
  ['/orgs/{orgId}/members/add']: {
    /**
     * CreateOrganizationMember - Add organization member
     *
     * Adds a new member to the organization identified by the given `orgId`.
     */
    'put'(
      parameters?: Parameters<Paths.CreateOrganizationMember.PathParameters> | null,
      data?: Paths.CreateOrganizationMember.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.CreateOrganizationMember.Responses.$200>
  }
  ['/orgs/{orgId}/members/leave']: {
    /**
     * LeaveOrganization - Leave organization
     *
     * Removes the requesting user from the organization identified by the given `orgId`.
     */
    'delete'(
      parameters?: Parameters<Paths.LeaveOrganization.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.LeaveOrganization.Responses.$204>
  }
  ['/orgs/{orgId}/members/{memberId}']: {
    /**
     * DeleteOrganizationMember - Delete member
     *
     * Deletes the member identified by the given `memberId`.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteOrganizationMember.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DeleteOrganizationMember.Responses.$204>
  }
  ['/orgs/{orgId}/members/{memberId}/role']: {
    /**
     * UpdateOrganizationMemberRole - Update member role
     *
     * Updates the role of the member identified by the given `memberId`.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateOrganizationMemberRole.PathParameters> | null,
      data?: Paths.UpdateOrganizationMemberRole.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.UpdateOrganizationMemberRole.Responses.$204>
  }
  ['/orgs/{orgId}/teams']: {
    /**
     * ListOrganizationTeams - List organization teams
     *
     * Lists all teams in the organization identified by the given `orgId`.
     */
    'get'(
      parameters?: Parameters<Paths.ListOrganizationTeams.PathParameters & Paths.ListOrganizationTeams.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ListOrganizationTeams.Responses.$200>
    /**
     * CreateOrganizationTeam - Create team
     *
     * Creates a new team in the organization identified by the given `orgId`.
     */
    'post'(
      parameters?: Parameters<Paths.CreateOrganizationTeam.PathParameters> | null,
      data?: Paths.CreateOrganizationTeam.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.CreateOrganizationTeam.Responses.$200>
  }
  ['/orgs/{orgId}/teams/validate']: {
    /**
     * ValidateTeamName - Validate team name
     *
     * Confirms the validity of the given team name. Append `?name=<your_team_name>`.
     */
    'get'(
      parameters?: Parameters<Paths.ValidateTeamName.PathParameters & Paths.ValidateTeamName.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ValidateTeamName.Responses.$204>
  }
  ['/orgs/{orgId}/teams/{teamId}']: {
    /**
     * DescribeOrganizationTeam - Describe team
     *
     * Retrieves the details of the team identified by the given `teamId`.
     */
    'get'(
      parameters?: Parameters<Paths.DescribeOrganizationTeam.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DescribeOrganizationTeam.Responses.$200>
    /**
     * UpdateOrganizationTeam - Update team
     *
     * Updates the details of the team identified by the given `teamId`.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateOrganizationTeam.PathParameters> | null,
      data?: Paths.UpdateOrganizationTeam.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.UpdateOrganizationTeam.Responses.$200 | Paths.UpdateOrganizationTeam.Responses.$204>
    /**
     * DeleteOrganizationTeam - Delete team
     *
     * Deletes the team identified by the given `teamId`.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteOrganizationTeam.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DeleteOrganizationTeam.Responses.$204>
  }
  ['/orgs/{orgId}/teams/{teamId}/members']: {
    /**
     * ListOrganizationTeamMembers - List team members
     *
     * Lists the team members associated with the given `teamId`.
     */
    'get'(
      parameters?: Parameters<Paths.ListOrganizationTeamMembers.PathParameters & Paths.ListOrganizationTeamMembers.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ListOrganizationTeamMembers.Responses.$200>
    /**
     * CreateOrganizationTeamMember - Create team member
     *
     * Adds a new member to the team identified by the given `teamId`.
     */
    'post'(
      parameters?: Parameters<Paths.CreateOrganizationTeamMember.PathParameters> | null,
      data?: Paths.CreateOrganizationTeamMember.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.CreateOrganizationTeamMember.Responses.$200>
  }
  ['/orgs/{orgId}/teams/{teamId}/members/{memberId}/delete']: {
    /**
     * DeleteOrganizationTeamMember - Delete team member
     *
     * Deletes the team member identified by the given `memberId`.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteOrganizationTeamMember.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DeleteOrganizationTeamMember.Responses.$204>
  }
  ['/orgs/{orgId}/teams/{teamId}/workspaces']: {
    /**
     * ListWorkspacesByTeam - List team workspaces
     *
     * Lists all the workspaces of which the given `teamId` is a participant.
     */
    'get'(
      parameters?: Parameters<Paths.ListWorkspacesByTeam.PathParameters & Paths.ListWorkspacesByTeam.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ListWorkspacesByTeam.Responses.$200>
  }
  ['/orgs/{orgId}/workspaces']: {
    /**
     * ListWorkspaces - List organization workspaces
     *
     * Lists the organization workspaces in `orgId` to which the requesting user belongs.
     */
    'get'(
      parameters?: Parameters<Paths.ListWorkspaces.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ListWorkspaces.Responses.$200>
    /**
     * CreateWorkspace - Create workspace
     *
     * Creates a new organization workspace.
     */
    'post'(
      parameters?: Parameters<Paths.CreateWorkspace.PathParameters> | null,
      data?: Paths.CreateWorkspace.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.CreateWorkspace.Responses.$200>
  }
  ['/orgs/{orgId}/workspaces/validate']: {
    /**
     * WorkspaceValidate - Validate workspace name
     *
     * Confirms the validity of the given workspace name. Append `?name=<your_workspace_name>`.
     */
    'get'(
      parameters?: Parameters<Paths.WorkspaceValidate.PathParameters & Paths.WorkspaceValidate.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.WorkspaceValidate.Responses.$204>
  }
  ['/orgs/{orgId}/workspaces/{workspaceId}']: {
    /**
     * DescribeWorkspace - Describe workspace
     *
     * Retrieves the details of the workspace identified by the given `workspaceId`.
     */
    'get'(
      parameters?: Parameters<Paths.DescribeWorkspace.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DescribeWorkspace.Responses.$200>
    /**
     * UpdateWorkspace - Update workspace
     *
     * Updates the details of the workspace identified by the given `workspaceId`.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateWorkspace.PathParameters> | null,
      data?: Paths.UpdateWorkspace.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.UpdateWorkspace.Responses.$200>
    /**
     * DeleteWorkspace - Delete workspace
     *
     * Deletes the workspace identified by the given `workspaceId`.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteWorkspace.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DeleteWorkspace.Responses.$204>
  }
  ['/orgs/{orgId}/workspaces/{workspaceId}/participants']: {
    /**
     * ListWorkspaceParticipants - List workspace participants
     *
     * Lists the participants of the workspace identified by the given `workspaceId`.
     */
    'get'(
      parameters?: Parameters<Paths.ListWorkspaceParticipants.PathParameters & Paths.ListWorkspaceParticipants.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ListWorkspaceParticipants.Responses.$200>
    /**
     * LeaveWorkspaceParticipant - Leave workspace
     *
     * Removes the requesting user from the given workspace.
     */
    'delete'(
      parameters?: Parameters<Paths.LeaveWorkspaceParticipant.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.LeaveWorkspaceParticipant.Responses.$204>
  }
  ['/orgs/{orgId}/workspaces/{workspaceId}/participants/add']: {
    /**
     * CreateWorkspaceParticipant - Create workspace participant
     *
     * Adds a new participant to the workspace identified by the given `workspaceId`.
     */
    'put'(
      parameters?: Parameters<Paths.CreateWorkspaceParticipant.PathParameters> | null,
      data?: Paths.CreateWorkspaceParticipant.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.CreateWorkspaceParticipant.Responses.$200>
  }
  ['/orgs/{orgId}/workspaces/{workspaceId}/participants/{participantId}']: {
    /**
     * DeleteWorkspaceParticipant - Delete workspace participant
     *
     * Deletes the given participant from the given workspace.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteWorkspaceParticipant.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DeleteWorkspaceParticipant.Responses.$204>
  }
  ['/orgs/{orgId}/workspaces/{workspaceId}/participants/{participantId}/role']: {
    /**
     * UpdateWorkspaceParticipantRole - Update participant role
     *
     * Updates the role of the given participant in the given workspace.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateWorkspaceParticipantRole.PathParameters> | null,
      data?: Paths.UpdateWorkspaceParticipantRole.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.UpdateWorkspaceParticipantRole.Responses.$204>
  }
  ['/pipeline-secrets']: {
    /**
     * ListPipelineSecrets - List pipeline secrets
     *
     * Lists all available pipeline secrets in a user context. Append `?workspaceId` to list secrets in a workspace context.
     */
    'get'(
      parameters?: Parameters<Paths.ListPipelineSecrets.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ListPipelineSecrets.Responses.$200>
    /**
     * CreatePipelineSecret - Create pipeline secret
     *
     * Creates a new pipeline secret in the user context. Append `?workspaceId` to create the secret in a workspace context.
     */
    'post'(
      parameters?: Parameters<Paths.CreatePipelineSecret.QueryParameters> | null,
      data?: Paths.CreatePipelineSecret.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.CreatePipelineSecret.Responses.$200>
  }
  ['/pipeline-secrets/validate']: {
    /**
     * ValidatePipelineSecretName - Validate secret name
     *
     * Confirms the validity of the given pipeline secret name in a user context. Append `?name=<your_secret_name>`. Append `?workspaceId` to validate the name in a workspace context.
     */
    'get'(
      parameters?: Parameters<Paths.ValidatePipelineSecretName.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ValidatePipelineSecretName.Responses.$204>
  }
  ['/pipeline-secrets/{secretId}']: {
    /**
     * DescribePipelineSecret - Describe pipeline secret
     *
     * Retrieves the details of the pipeline secret identified by the given `secretId`.
     */
    'get'(
      parameters?: Parameters<Paths.DescribePipelineSecret.PathParameters & Paths.DescribePipelineSecret.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DescribePipelineSecret.Responses.$200>
    /**
     * UpdatePipelineSecret - Update secret
     *
     * Updates the pipeline secret identified by the given `secretId`.
     */
    'put'(
      parameters?: Parameters<Paths.UpdatePipelineSecret.PathParameters & Paths.UpdatePipelineSecret.QueryParameters> | null,
      data?: Paths.UpdatePipelineSecret.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.UpdatePipelineSecret.Responses.$204>
    /**
     * DeletePipelineSecret - Delete secret
     *
     * Deletes the pipeline secret identified by the given `secretId`.
     */
    'delete'(
      parameters?: Parameters<Paths.DeletePipelineSecret.PathParameters & Paths.DeletePipelineSecret.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DeletePipelineSecret.Responses.$204>
  }
  ['/pipelines']: {
    /**
     * ListPipelines - List Tower pipelines
     *
     * Lists all available Tower pipelines in a user context. Append `?workspaceId` to list pipelines in a workspace context.
     */
    'get'(
      parameters?: Parameters<Paths.ListPipelines.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ListPipelines.Responses.$200>
    /**
     * CreatePipeline - Create pipeline
     *
     * Creates a new pipeline in a user context. Append `?workspaceId` to create the pipeline in a workspace context.
     */
    'post'(
      parameters?: Parameters<Paths.CreatePipeline.QueryParameters> | null,
      data?: Paths.CreatePipeline.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.CreatePipeline.Responses.$200>
  }
  ['/pipelines/info']: {
    /**
     * DescribePipelineRepository - Describe remote pipeline repository
     *
     * Retrieves the details of a remote Nextflow pipeline Git repository. Append the repository name or full URL with `?name`.
     */
    'get'(
      parameters?: Parameters<Paths.DescribePipelineRepository.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DescribePipelineRepository.Responses.$200>
  }
  ['/pipelines/labels/add']: {
    /**
     * AddLabelsToPipelines - Add labels to pipelines
     *
     * Adds the given list of labels to the given pipelines.
     */
    'post'(
      parameters?: Parameters<Paths.AddLabelsToPipelines.QueryParameters> | null,
      data?: Paths.AddLabelsToPipelines.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.AddLabelsToPipelines.Responses.$204>
  }
  ['/pipelines/labels/apply']: {
    /**
     * ApplyLabelsToPipelines - Apply labels to pipelines
     *
     * Applies the given list of labels to the given pipelines. Existing labels are replaced.
     */
    'post'(
      parameters?: Parameters<Paths.ApplyLabelsToPipelines.QueryParameters> | null,
      data?: Paths.ApplyLabelsToPipelines.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ApplyLabelsToPipelines.Responses.$204>
  }
  ['/pipelines/labels/remove']: {
    /**
     * RemoveLabelsFromPipelines - Remove labels from pipelines
     *
     * Removes the given list of labels from the given pipelines.
     */
    'post'(
      parameters?: Parameters<Paths.RemoveLabelsFromPipelines.QueryParameters> | null,
      data?: Paths.RemoveLabelsFromPipelines.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.RemoveLabelsFromPipelines.Responses.$204>
  }
  ['/pipelines/repositories']: {
    /**
     * ListPipelineRepositories - List user pipeline repositories
     *
     * Lists known Nextflow pipeline Git repositories, extracted from existing runs. Append `?workspaceId` to list repositories in a workspace context.
     */
    'get'(
      parameters?: Parameters<Paths.ListPipelineRepositories.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ListPipelineRepositories.Responses.$200>
  }
  ['/pipelines/validate']: {
    /**
     * ValidatePipelineName - Validate pipeline name
     *
     * Confirms the validity of the given pipeline `name` in a user context. Append `?name=<your_pipeline_name>`. Append `?workspaceId` to validate the name in a workspace context.
     */
    'get'(
      parameters?: Parameters<Paths.ValidatePipelineName.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ValidatePipelineName.Responses.$204>
  }
  ['/pipelines/{pipelineId}']: {
    /**
     * DescribePipeline - Describe pipeline
     *
     * Retrieves the details of the pipeline identified by the given `pipelineId`.
     */
    'get'(
      parameters?: Parameters<Paths.DescribePipeline.PathParameters & Paths.DescribePipeline.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DescribePipeline.Responses.$200>
    /**
     * UpdatePipeline - Update pipeline
     *
     * Updates the details of the pipeline identified by the given `pipelineId`.
     */
    'put'(
      parameters?: Parameters<Paths.UpdatePipeline.PathParameters & Paths.UpdatePipeline.QueryParameters> | null,
      data?: Paths.UpdatePipeline.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.UpdatePipeline.Responses.$200>
    /**
     * DeletePipeline - Delete pipeline
     *
     * Deletes the pipeline identified by the given `pipelineId`.
     */
    'delete'(
      parameters?: Parameters<Paths.DeletePipeline.PathParameters & Paths.DeletePipeline.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DeletePipeline.Responses.$204>
  }
  ['/pipelines/{pipelineId}/launch']: {
    /**
     * DescribePipelineLaunch - Describe pipeline launch
     *
     * Retrieves the launch details of the pipeline identified by the given `pipelineId`.
     */
    'get'(
      parameters?: Parameters<Paths.DescribePipelineLaunch.PathParameters & Paths.DescribePipelineLaunch.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DescribePipelineLaunch.Responses.$200>
  }
  ['/pipelines/{pipelineId}/schema']: {
    /**
     * DescribePipelineSchema - Describe pipeline schema
     *
     * Retrieves the pipeline schema of the pipeline identified by the given `pipelineId`.
     */
    'get'(
      parameters?: Parameters<Paths.DescribePipelineSchema.PathParameters & Paths.DescribePipelineSchema.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DescribePipelineSchema.Responses.$200 | Paths.DescribePipelineSchema.Responses.$204>
  }
  ['/platforms']: {
    /**
     * ListPlatforms - List platforms
     *
     * Lists all available computing platforms in a user context. Append `?workspaceId` to list platforms in a workspace context.
     */
    'get'(
      parameters?: Parameters<Paths.ListPlatforms.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ListPlatforms.Responses.$200>
  }
  ['/platforms/{platformId}']: {
    /**
     * DescribePlatform - Describe platform
     *
     * Retrieves the details of the computing platform identified by the given `platformId`.
     */
    'get'(
      parameters?: Parameters<Paths.DescribePlatform.PathParameters & Paths.DescribePlatform.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DescribePlatform.Responses.$200>
  }
  ['/platforms/{platformId}/regions']: {
    /**
     * ListPlatformRegions - List platform regions
     *
     * Lists the available regions for the computing platform identified by the given `platformId`.
     */
    'get'(
      parameters?: Parameters<Paths.ListPlatformRegions.PathParameters & Paths.ListPlatformRegions.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ListPlatformRegions.Responses.$200>
  }
  ['/service-info']: {
    /**
     * Info - General Tower service features and version
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.Info.Responses.$200>
  }
  ['/tokens']: {
    /**
     * TokenList - List all available API tokens
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.TokenList.Responses.$200>
    /**
     * CreateToken - Create an API token
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateToken.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.CreateToken.Responses.$200>
  }
  ['/tokens/delete-all']: {
    /**
     * DeleteAllTokens - Delete all user API tokens
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DeleteAllTokens.Responses.$204>
  }
  ['/tokens/{tokenId}']: {
    /**
     * DeleteToken - Delete an API token
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteToken.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DeleteToken.Responses.$204>
  }
  ['/trace/create']: {
    /**
     * CreateTrace - Create a new Workflow execution trace
     */
    'post'(
      parameters?: Parameters<Paths.CreateTrace.QueryParameters> | null,
      data?: Paths.CreateTrace.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.CreateTrace.Responses.$200>
  }
  ['/trace/{workflowId}/begin']: {
    /**
     * UpdateTraceBegin - Signal the Workflow execution has started
     */
    'put'(
      parameters?: Parameters<Paths.UpdateTraceBegin.PathParameters & Paths.UpdateTraceBegin.QueryParameters> | null,
      data?: Paths.UpdateTraceBegin.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.UpdateTraceBegin.Responses.$200>
  }
  ['/trace/{workflowId}/complete']: {
    /**
     * UpdateTraceComplete - Signal the Workflow execution has completed
     */
    'put'(
      parameters?: Parameters<Paths.UpdateTraceComplete.PathParameters & Paths.UpdateTraceComplete.QueryParameters> | null,
      data?: Paths.UpdateTraceComplete.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.UpdateTraceComplete.Responses.$200>
  }
  ['/trace/{workflowId}/heartbeat']: {
    /**
     * UpdateTraceHeartbeat - Period request to signal the execution is still on-going
     */
    'put'(
      parameters?: Parameters<Paths.UpdateTraceHeartbeat.PathParameters & Paths.UpdateTraceHeartbeat.QueryParameters> | null,
      data?: Paths.UpdateTraceHeartbeat.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.UpdateTraceHeartbeat.Responses.$200>
  }
  ['/trace/{workflowId}/progress']: {
    /**
     * UpdateTraceProgress - Store one or more task executions metadata for the specified Workflow
     */
    'put'(
      parameters?: Parameters<Paths.UpdateTraceProgress.PathParameters & Paths.UpdateTraceProgress.QueryParameters> | null,
      data?: Paths.UpdateTraceProgress.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.UpdateTraceProgress.Responses.$200>
  }
  ['/user-info']: {
    /**
     * UserInfo - Describe current user
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.UserInfo.Responses.$200>
  }
  ['/user/{userId}/workspaces']: {
    /**
     * ListWorkspacesUser - List user workspaces and organizations
     *
     * Lists the workspaces and organizations to which the user identified by the given `userId` belongs.
     */
    'get'(
      parameters?: Parameters<Paths.ListWorkspacesUser.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ListWorkspacesUser.Responses.$200>
  }
  ['/users/validate']: {
    /**
     * ValidateUserName - Check that the user name is valid
     */
    'get'(
      parameters?: Parameters<Paths.ValidateUserName.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ValidateUserName.Responses.$204>
  }
  ['/users/{userId}']: {
    /**
     * DescribeUser - Describe a user entity
     */
    'get'(
      parameters?: Parameters<Paths.DescribeUser.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DescribeUser.Responses.$200>
    /**
     * UpdateUser - Update an user entity
     */
    'post'(
      parameters?: Parameters<Paths.UpdateUser.PathParameters> | null,
      data?: Paths.UpdateUser.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.UpdateUser.Responses.$204>
    /**
     * DeleteUser - Delete a user entity
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteUser.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DeleteUser.Responses.$204>
  }
  ['/workflow']: {
    /**
     * ListWorkflows - List workflows
     *
     * Lists all workflow records, enriched by `attributes`. Append `?workspaceId` to list workflow records in a workspace context.
     */
    'get'(
      parameters?: Parameters<Paths.ListWorkflows.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ListWorkflows.Responses.$200>
  }
  ['/workflow/delete']: {
    /**
     * DeleteWorkflowMany - Delete workflows
     *
     * Deletes the workflow records identified by the given list of `workflowIds`.
     */
    'post'(
      parameters?: Parameters<Paths.DeleteWorkflowMany.QueryParameters> | null,
      data?: Paths.DeleteWorkflowMany.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DeleteWorkflowMany.Responses.$200>
  }
  ['/workflow/labels/add']: {
    /**
     * AddLabelsToWorkflows - Add labels to workflows
     *
     * Adds the given list of labels to the given workflows.
     */
    'post'(
      parameters?: Parameters<Paths.AddLabelsToWorkflows.QueryParameters> | null,
      data?: Paths.AddLabelsToWorkflows.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.AddLabelsToWorkflows.Responses.$204>
  }
  ['/workflow/labels/apply']: {
    /**
     * ApplyLabelsToWorkflows - Apply labels to workflows
     *
     * Applies the given list of labels to the given workflows. Existing labels are replaced.
     */
    'post'(
      parameters?: Parameters<Paths.ApplyLabelsToWorkflows.QueryParameters> | null,
      data?: Paths.ApplyLabelsToWorkflows.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ApplyLabelsToWorkflows.Responses.$204>
  }
  ['/workflow/labels/remove']: {
    /**
     * RemoveLabelsFromWorkflows - Remove labels from workflows
     *
     * Removes the given list of labels from the given workflows.
     */
    'post'(
      parameters?: Parameters<Paths.RemoveLabelsFromWorkflows.QueryParameters> | null,
      data?: Paths.RemoveLabelsFromWorkflows.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.RemoveLabelsFromWorkflows.Responses.$204>
  }
  ['/workflow/launch']: {
    /**
     * CreateWorkflowLaunch - Launch workflow
     *
     * Submits a workflow execution.
     */
    'post'(
      parameters?: Parameters<Paths.CreateWorkflowLaunch.QueryParameters> | null,
      data?: Paths.CreateWorkflowLaunch.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.CreateWorkflowLaunch.Responses.$200>
  }
  ['/workflow/random-name']: {
    /**
     * GenerateRandomWorkflowName - Generates a random name
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.GenerateRandomWorkflowName.Responses.$200>
  }
  ['/workflow/validate']: {
    /**
     * ValidateWorkflowConstraints - Check that the given run name of a workflow has a valid format. When the session ID is given: check that no other workflow in the system exists with the combination of both elements
     */
    'get'(
      parameters?: Parameters<Paths.ValidateWorkflowConstraints.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ValidateWorkflowConstraints.Responses.$204>
  }
  ['/workflow/{workflowId}']: {
    /**
     * DescribeWorkflow - Describe workflow
     *
     * Retrieves the details of the workflow record associated with the given `workflowId`.
     */
    'get'(
      parameters?: Parameters<Paths.DescribeWorkflow.PathParameters & Paths.DescribeWorkflow.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DescribeWorkflow.Responses.$200>
    /**
     * DeleteWorkflow - Delete the Workflow entity with the given ID
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteWorkflow.PathParameters & Paths.DeleteWorkflow.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DeleteWorkflow.Responses.$204>
  }
  ['/workflow/{workflowId}/cancel']: {
    /**
     * CancelWorkflow - Cancel workflow
     *
     * Cancels the workflow execution identified by the given `workflowId`.
     */
    'post'(
      parameters?: Parameters<Paths.CancelWorkflow.PathParameters & Paths.CancelWorkflow.QueryParameters> | null,
      data?: Paths.CancelWorkflow.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.CancelWorkflow.Responses.$204>
  }
  ['/workflow/{workflowId}/download']: {
    /**
     * DownloadWorkflowLog - Download workflow files
     *
     * Downloads the workflow files for the Nextflow main job associated with the given `workflowId`.
     */
    'get'(
      parameters?: Parameters<Paths.DownloadWorkflowLog.PathParameters & Paths.DownloadWorkflowLog.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DownloadWorkflowLog.Responses.$200>
  }
  ['/workflow/{workflowId}/download/{taskId}']: {
    /**
     * DownloadWorkflowTaskLog - Download workflow task files
     *
     * Downloads the workflow files of the task identified by the given `taskId`.
     */
    'get'(
      parameters?: Parameters<Paths.DownloadWorkflowTaskLog.PathParameters & Paths.DownloadWorkflowTaskLog.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DownloadWorkflowTaskLog.Responses.$200>
  }
  ['/workflow/{workflowId}/launch']: {
    /**
     * DescribeWorkflowLaunch - Describe workflow launch
     *
     * Retrieves the details of the workflow launch associated with the given `workflowId`.
     */
    'get'(
      parameters?: Parameters<Paths.DescribeWorkflowLaunch.PathParameters & Paths.DescribeWorkflowLaunch.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DescribeWorkflowLaunch.Responses.$200>
  }
  ['/workflow/{workflowId}/log']: {
    /**
     * WorkflowLogs - Get workflow logs
     *
     * Retrieves the output logs for the Nextflow main job of the workflow identified by the given `workflowId`.
     */
    'get'(
      parameters?: Parameters<Paths.WorkflowLogs.PathParameters & Paths.WorkflowLogs.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.WorkflowLogs.Responses.$200>
  }
  ['/workflow/{workflowId}/log/{taskId}']: {
    /**
     * GetWorkflowTaskLog - Get workflow task logs
     *
     * Retrieves the output logs for the workflow task identified by the given `taskId`.
     */
    'get'(
      parameters?: Parameters<Paths.GetWorkflowTaskLog.PathParameters & Paths.GetWorkflowTaskLog.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.GetWorkflowTaskLog.Responses.$200>
  }
  ['/workflow/{workflowId}/metrics']: {
    /**
     * DescribeWorkflowMetrics - Get the execution metrics for the given Workflow ID
     */
    'get'(
      parameters?: Parameters<Paths.DescribeWorkflowMetrics.PathParameters & Paths.DescribeWorkflowMetrics.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DescribeWorkflowMetrics.Responses.$200>
  }
  ['/workflow/{workflowId}/progress']: {
    /**
     * DescribeWorkflowProgress - Retrieve the execution progress for the given Workflow ID
     */
    'get'(
      parameters?: Parameters<Paths.DescribeWorkflowProgress.PathParameters & Paths.DescribeWorkflowProgress.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DescribeWorkflowProgress.Responses.$200>
  }
  ['/workflow/{workflowId}/star']: {
    /**
     * DescribeWorkflowStar - Check workflow star status
     *
     * Confirms whether the given `workflowId` is starred.
     */
    'get'(
      parameters?: Parameters<Paths.DescribeWorkflowStar.PathParameters & Paths.DescribeWorkflowStar.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DescribeWorkflowStar.Responses.$200>
    /**
     * CreateWorkflowStar - Star workflow
     *
     * Adds the workflow identified by the given `workflowId` to your list of starred workflows.
     */
    'post'(
      parameters?: Parameters<Paths.CreateWorkflowStar.PathParameters & Paths.CreateWorkflowStar.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.CreateWorkflowStar.Responses.$200>
    /**
     * DeleteWorkflowStar - Unstar workflow
     *
     * Removes the workflow identified by the given `workflowId` from your list of starred workflows.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteWorkflowStar.PathParameters & Paths.DeleteWorkflowStar.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DeleteWorkflowStar.Responses.$200>
  }
  ['/workflow/{workflowId}/task/{taskId}']: {
    /**
     * DescribeWorkflowTask - Describe a task entity with the given ID
     */
    'get'(
      parameters?: Parameters<Paths.DescribeWorkflowTask.PathParameters & Paths.DescribeWorkflowTask.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DescribeWorkflowTask.Responses.$200>
  }
  ['/workflow/{workflowId}/tasks']: {
    /**
     * ListWorkflowTasks - List the tasks for the given Workflow ID and filter parameters
     */
    'get'(
      parameters?: Parameters<Paths.ListWorkflowTasks.PathParameters & Paths.ListWorkflowTasks.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ListWorkflowTasks.Responses.$200>
  }
  ['/workspaces/{workspaceId}/datasets']: {
    /**
     * ListDatasets - List available datasets
     *
     * Lists all available datasets in the workspace context identified by the given `workspaceId`.
     */
    'get'(
      parameters?: Parameters<Paths.ListDatasets.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ListDatasets.Responses.$200>
    /**
     * CreateDataset - Create dataset
     *
     * Creates a new Tower dataset in the given workspace context. Include the dataset file and details in your request body.
     */
    'post'(
      parameters?: Parameters<Paths.CreateDataset.PathParameters> | null,
      data?: Paths.CreateDataset.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.CreateDataset.Responses.$200>
  }
  ['/workspaces/{workspaceId}/datasets/versions']: {
    /**
     * ListWorkspaceDatasetVersions - List latest dataset versions
     *
     * Lists the latest version of each dataset associated with the given `workspaceId`.
     */
    'get'(
      parameters?: Parameters<Paths.ListWorkspaceDatasetVersions.PathParameters & Paths.ListWorkspaceDatasetVersions.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ListWorkspaceDatasetVersions.Responses.$200>
  }
  ['/workspaces/{workspaceId}/datasets/{datasetId}']: {
    /**
     * UpdateDataset - Update dataset
     *
     * Updates the details of the dataset identified by the given `datasetId`.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateDataset.PathParameters> | null,
      data?: Paths.UpdateDataset.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.UpdateDataset.Responses.$204>
    /**
     * DeleteDataset - Delete dataset
     *
     * Deletes the dataset identified by the given `datasetId`.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteDataset.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DeleteDataset.Responses.$204>
  }
  ['/workspaces/{workspaceId}/datasets/{datasetId}/metadata']: {
    /**
     * DescribeDataset - Describe dataset
     *
     * Retrieves the metadata of the dataset identified by the given `datasetId`.
     */
    'get'(
      parameters?: Parameters<Paths.DescribeDataset.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DescribeDataset.Responses.$200>
  }
  ['/workspaces/{workspaceId}/datasets/{datasetId}/upload']: {
    /**
     * UploadDataset - Upload new dataset version
     *
     * Uploads the CSV or TSV content to create a new version of the dataset identified by the given `datasetId`.
     */
    'post'(
      parameters?: Parameters<Paths.UploadDataset.PathParameters & Paths.UploadDataset.QueryParameters> | null,
      data?: Paths.UploadDataset.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.UploadDataset.Responses.$200>
  }
  ['/workspaces/{workspaceId}/datasets/{datasetId}/v/{version}/n/{fileName}']: {
    /**
     * DownloadDataset - Download dataset content
     *
     * Downloads the content of the dataset identified by the given `datasetId` and `version`.
     */
    'get'(
      parameters?: Parameters<Paths.DownloadDataset.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DownloadDataset.Responses.$200>
  }
  ['/workspaces/{workspaceId}/datasets/{datasetId}/versions']: {
    /**
     * ListDatasetVersions - List all dataset versions
     *
     * Lists all versions of the given `datasetId`.
     */
    'get'(
      parameters?: Parameters<Paths.ListDatasetVersions.PathParameters & Paths.ListDatasetVersions.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ListDatasetVersions.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
