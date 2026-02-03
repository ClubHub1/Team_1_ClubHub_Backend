// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type {
  ClubMembership,
  ClubMembershipData,
  ClubMembershipPatch,
  ClubMembershipQuery
} from './Club Membership.schema'

export type { ClubMembership, ClubMembershipData, ClubMembershipPatch, ClubMembershipQuery }

export interface ClubMembershipParams extends KnexAdapterParams<ClubMembershipQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class ClubMembershipService<ServiceParams extends Params = ClubMembershipParams> extends KnexService<
  ClubMembership,
  ClubMembershipData,
  ClubMembershipParams,
  ClubMembershipPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'Club Membership'
  }
}
