import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { TravelRequest, TravelRequestData, TravelRequestPatch, TravelRequestQuery, TravelRequestService } from './TravelRequest.class'

export type { TravelRequest, TravelRequestData, TravelRequestPatch, TravelRequestQuery }
export type TravelRequestClientService = Pick<TravelRequestService<Params<TravelRequestQuery>>, (typeof travelRequestMethods)[number]>
export const travelRequestPath = 'travel-requests'
export const travelRequestMethods: Array<keyof TravelRequestService> = ['find','get','create','patch','remove']

export const travelRequestClient = (client: ClientApplication) => {
  const connection = client.get('connection')
  client.use(travelRequestPath, connection.service(travelRequestPath), { methods: travelRequestMethods })
}

declare module '../../client' {
  interface ServiceTypes {
    [travelRequestPath]: TravelRequestClientService
  }
}
