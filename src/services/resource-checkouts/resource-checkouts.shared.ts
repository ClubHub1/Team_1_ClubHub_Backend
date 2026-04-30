// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  ResourceCheckouts,
  ResourceCheckoutsData,
  ResourceCheckoutsPatch,
  ResourceCheckoutsQuery,
  ResourceCheckoutsService
} from './resource-checkouts.class'

export type { ResourceCheckouts, ResourceCheckoutsData, ResourceCheckoutsPatch, ResourceCheckoutsQuery }

export type ResourceCheckoutsClientService = Pick<
  ResourceCheckoutsService<Params<ResourceCheckoutsQuery>>,
  (typeof resourceCheckoutsMethods)[number]
>

export const resourceCheckoutsPath = 'resource-checkouts'

export const resourceCheckoutsMethods: Array<keyof ResourceCheckoutsService> = [
  'find',
  'get',
  'create',
  'patch',
  'remove'
]

export const resourceCheckoutsClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(resourceCheckoutsPath, connection.service(resourceCheckoutsPath), {
    methods: resourceCheckoutsMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [resourceCheckoutsPath]: ResourceCheckoutsClientService
  }
}
