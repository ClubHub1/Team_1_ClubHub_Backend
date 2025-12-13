// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Club, ClubData, ClubPatch, ClubQuery, ClubService } from './Club.class'

export type { Club, ClubData, ClubPatch, ClubQuery }

export type ClubClientService = Pick<ClubService<Params<ClubQuery>>, (typeof clubMethods)[number]>

export const clubPath = 'Club'

export const clubMethods: Array<keyof ClubService> = ['find', 'get', 'create', 'patch', 'remove']

export const clubClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(clubPath, connection.service(clubPath), {
    methods: clubMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [clubPath]: ClubClientService
  }
}
