// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Club, ClubData, ClubPatch, ClubQuery } from './Club.schema'

export type { Club, ClubData, ClubPatch, ClubQuery }

export interface ClubParams extends KnexAdapterParams<ClubQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class ClubService<ServiceParams extends Params = ClubParams> extends KnexService<
  Club,
  ClubData,
  ClubParams,
  ClubPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'Club'
  }
}
