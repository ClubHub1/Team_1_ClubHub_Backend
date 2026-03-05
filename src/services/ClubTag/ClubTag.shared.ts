import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { ClubTag, ClubTagData, ClubTagPatch, ClubTagQuery, ClubTagService } from './ClubTag.class'

export type { ClubTag, ClubTagData, ClubTagPatch, ClubTagQuery }
export type ClubTagClientService = Pick<ClubTagService<Params<ClubTagQuery>>, (typeof clubTagMethods)[number]>
export const clubTagPath = 'club-tags'
export const clubTagMethods: Array<keyof ClubTagService> = ['find','get','create','patch','remove']

export const clubTagClient = (client: ClientApplication) => {
  const connection = client.get('connection')
  client.use(clubTagPath, connection.service(clubTagPath), { methods: clubTagMethods })
}

declare module '../../client' {
  interface ServiceTypes {
    [clubTagPath]: ClubTagClientService
  }
}
