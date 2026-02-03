// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  ClubMembership,
  ClubMembershipData,
  ClubMembershipPatch,
  ClubMembershipQuery,
  ClubMembershipService
} from './Club Membership.class'

export type { ClubMembership, ClubMembershipData, ClubMembershipPatch, ClubMembershipQuery }

export type ClubMembershipClientService = Pick<
  ClubMembershipService<Params<ClubMembershipQuery>>,
  (typeof clubMembershipMethods)[number]
>

export const clubMembershipPath = 'ClubMembership'

export const clubMembershipMethods: Array<keyof ClubMembershipService> = [
  'find',
  'get',
  'create',
  'patch',
  'remove'
]

export const clubMembershipClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(clubMembershipPath, connection.service(clubMembershipPath), {
    methods: clubMembershipMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [clubMembershipPath]: ClubMembershipClientService
  }
}
