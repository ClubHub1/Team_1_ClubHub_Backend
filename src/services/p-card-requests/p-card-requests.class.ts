// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type {
  PCardRequests,
  PCardRequestsData,
  PCardRequestsPatch,
  PCardRequestsQuery
} from './p-card-requests.schema'

export type { PCardRequests, PCardRequestsData, PCardRequestsPatch, PCardRequestsQuery }

export interface PCardRequestsParams extends KnexAdapterParams<PCardRequestsQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class PCardRequestsService<ServiceParams extends Params = PCardRequestsParams> extends KnexService<
  PCardRequests,
  PCardRequestsData,
  PCardRequestsParams,
  PCardRequestsPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'p-card-requests'
  }
}
