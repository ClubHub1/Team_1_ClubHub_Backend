import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'
import type { Application } from '../../declarations'
import type { TravelRequest, TravelRequestData, TravelRequestPatch, TravelRequestQuery } from './TravelRequest.schema'

export type { TravelRequest, TravelRequestData, TravelRequestPatch, TravelRequestQuery }
export interface TravelRequestParams extends KnexAdapterParams<TravelRequestQuery> {}
export class TravelRequestService<ServiceParams extends Params = TravelRequestParams> extends KnexService<TravelRequest, TravelRequestData, TravelRequestParams, TravelRequestPatch> {}
export const getOptions = (app: Application): KnexAdapterOptions => ({
  paginate: app.get('paginate'),
  Model: app.get('postgresqlClient'),
  name: 'TravelRequest'
})
