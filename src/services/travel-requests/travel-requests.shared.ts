// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  TravelRequests,
  TravelRequestsData,
  TravelRequestsPatch,
  TravelRequestsQuery,
  TravelRequestsService
} from './travel-requests.class'

export type { TravelRequests, TravelRequestsData, TravelRequestsPatch, TravelRequestsQuery }

export type TravelRequestsClientService = Pick<
  TravelRequestsService<Params<TravelRequestsQuery>>,
  (typeof travelRequestsMethods)[number]
>

export const travelRequestsPath = 'travel-requests'

export const travelRequestsMethods: Array<keyof TravelRequestsService> = [
  'find',
  'get',
  'create',
  'patch',
  'remove'
]

export const travelRequestsClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(travelRequestsPath, connection.service(travelRequestsPath), {
    methods: travelRequestsMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [travelRequestsPath]: TravelRequestsClientService
  }
}
