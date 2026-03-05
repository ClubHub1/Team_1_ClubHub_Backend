import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'
import type { Application } from '../../declarations'
import type { ClubTag, ClubTagData, ClubTagPatch, ClubTagQuery } from './ClubTag.schema'

export type { ClubTag, ClubTagData, ClubTagPatch, ClubTagQuery }
export interface ClubTagParams extends KnexAdapterParams<ClubTagQuery> {}
export class ClubTagService<ServiceParams extends Params = ClubTagParams> extends KnexService<ClubTag, ClubTagData, ClubTagParams, ClubTagPatch> {}
export const getOptions = (app: Application): KnexAdapterOptions => ({
  paginate: app.get('paginate'),
  Model: app.get('postgresqlClient'),
  name: 'ClubTag'
})
