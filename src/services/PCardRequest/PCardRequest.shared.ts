import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { PCardRequest, PCardRequestData, PCardRequestPatch, PCardRequestQuery, PCardRequestService } from './PCardRequest.class'

export type { PCardRequest, PCardRequestData, PCardRequestPatch, PCardRequestQuery }
export type PCardRequestClientService = Pick<PCardRequestService<Params<PCardRequestQuery>>, (typeof pCardRequestMethods)[number]>
export const pCardRequestPath = 'p-card-requests'
export const pCardRequestMethods: Array<keyof PCardRequestService> = ['find','get','create','patch','remove']

export const pCardRequestClient = (client: ClientApplication) => {
  const connection = client.get('connection')
  client.use(pCardRequestPath, connection.service(pCardRequestPath), { methods: pCardRequestMethods })
}

declare module '../../client' {
  interface ServiceTypes {
    [pCardRequestPath]: PCardRequestClientService
  }
}
