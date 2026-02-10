// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  FileResource,
  FileResourceData,
  FileResourcePatch,
  FileResourceQuery,
  FileResourceService
} from './File Resource.class'

export type { FileResource, FileResourceData, FileResourcePatch, FileResourceQuery }

export type FileResourceClientService = Pick<
  FileResourceService<Params<FileResourceQuery>>,
  (typeof fileResourceMethods)[number]
>

export const fileResourcePath = 'FileResource'

export const fileResourceMethods: Array<keyof FileResourceService> = [
  'find',
  'get',
  'create',
  'patch',
  'remove'
]

export const fileResourceClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(fileResourcePath, connection.service(fileResourcePath), {
    methods: fileResourceMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [fileResourcePath]: FileResourceClientService
  }
}
