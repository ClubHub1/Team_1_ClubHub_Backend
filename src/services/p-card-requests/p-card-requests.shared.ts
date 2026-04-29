// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  PCardRequests,
  PCardRequestsData,
  PCardRequestsPatch,
  PCardRequestsQuery,
  PCardRequestsService
} from './p-card-requests.class'

export type { PCardRequests, PCardRequestsData, PCardRequestsPatch, PCardRequestsQuery }

export type PCardRequestsClientService = Pick<
  PCardRequestsService<Params<PCardRequestsQuery>>,
  (typeof pCardRequestsMethods)[number]
>

export const pCardRequestsPath = 'p-card-requests'

export const pCardRequestsMethods: Array<keyof PCardRequestsService> = [
  'find',
  'get',
  'create',
  'patch',
  'remove'
]

export const pCardRequestsClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(pCardRequestsPath, connection.service(pCardRequestsPath), {
    methods: pCardRequestsMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [pCardRequestsPath]: PCardRequestsClientService
  }
}
