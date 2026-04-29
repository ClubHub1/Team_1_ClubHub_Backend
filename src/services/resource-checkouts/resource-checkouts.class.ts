// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type {
  ResourceCheckouts,
  ResourceCheckoutsData,
  ResourceCheckoutsPatch,
  ResourceCheckoutsQuery
} from './resource-checkouts.schema'

export type { ResourceCheckouts, ResourceCheckoutsData, ResourceCheckoutsPatch, ResourceCheckoutsQuery }

export interface ResourceCheckoutsParams extends KnexAdapterParams<ResourceCheckoutsQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class ResourceCheckoutsService<
  ServiceParams extends Params = ResourceCheckoutsParams
> extends KnexService<
  ResourceCheckouts,
  ResourceCheckoutsData,
  ResourceCheckoutsParams,
  ResourceCheckoutsPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'resource-checkouts'
  }
}
