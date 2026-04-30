// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type {
  TravelRequests,
  TravelRequestsData,
  TravelRequestsPatch,
  TravelRequestsQuery
} from './travel-requests.schema'

export type { TravelRequests, TravelRequestsData, TravelRequestsPatch, TravelRequestsQuery }

export interface TravelRequestsParams extends KnexAdapterParams<TravelRequestsQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class TravelRequestsService<ServiceParams extends Params = TravelRequestsParams> extends KnexService<
  TravelRequests,
  TravelRequestsData,
  TravelRequestsParams,
  TravelRequestsPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'travel_requests'
  }
}
