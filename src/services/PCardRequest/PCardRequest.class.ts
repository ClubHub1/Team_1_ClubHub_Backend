import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'
import type { Application } from '../../declarations'
import type { PCardRequest, PCardRequestData, PCardRequestPatch, PCardRequestQuery } from './PCardRequest.schema'

export type { PCardRequest, PCardRequestData, PCardRequestPatch, PCardRequestQuery }
export interface PCardRequestParams extends KnexAdapterParams<PCardRequestQuery> {}
export class PCardRequestService<ServiceParams extends Params = PCardRequestParams> extends KnexService<PCardRequest, PCardRequestData, PCardRequestParams, PCardRequestPatch> {}
export const getOptions = (app: Application): KnexAdapterOptions => ({
  paginate: app.get('paginate'),
  Model: app.get('postgresqlClient'),
  name: 'PCardRequest'
})
