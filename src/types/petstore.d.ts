import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Schemas {
        export interface Error {
            code: number; // int32
            message: string;
        }
        export interface Pet {
            id: number; // int64
            name: string;
            tag?: string;
        }
        export type Pets = [
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?,
            Pet?
        ];
    }
}
declare namespace Paths {
    namespace CreatePets {
        namespace Responses {
            export interface $201 {
            }
            export type Default = Components.Schemas.Error;
        }
    }
    namespace ListPets {
        namespace Parameters {
            export type Limit = number; // int32
        }
        export interface QueryParameters {
            limit?: Parameters.Limit /* int32 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Pets;
            export type Default = Components.Schemas.Error;
        }
    }
    namespace ShowPetById {
        namespace Parameters {
            export type PetId = string;
        }
        export interface PathParameters {
            petId: Parameters.PetId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Pet;
            export type Default = Components.Schemas.Error;
        }
    }
}

export interface OperationMethods {
  /**
   * listPets - List all pets
   */
  'listPets'(
    parameters?: Parameters<Paths.ListPets.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ListPets.Responses.$200>
  /**
   * createPets - Create a pet
   */
  'createPets'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.CreatePets.Responses.$201>
  /**
   * showPetById - Info for a specific pet
   */
  'showPetById'(
    parameters?: Parameters<Paths.ShowPetById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ShowPetById.Responses.$200>
}

export interface PathsDictionary {
  ['/pets']: {
    /**
     * listPets - List all pets
     */
    'get'(
      parameters?: Parameters<Paths.ListPets.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ListPets.Responses.$200>
    /**
     * createPets - Create a pet
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.CreatePets.Responses.$201>
  }
  ['/pets/{petId}']: {
    /**
     * showPetById - Info for a specific pet
     */
    'get'(
      parameters?: Parameters<Paths.ShowPetById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ShowPetById.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
