// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  fileResourceDataValidator,
  fileResourcePatchValidator,
  fileResourceQueryValidator,
  fileResourceResolver,
  fileResourceExternalResolver,
  fileResourceDataResolver,
  fileResourcePatchResolver,
  fileResourceQueryResolver
} from './File Resource.schema'

import type { Application } from '../../declarations'
import { FileResourceService, getOptions } from './File Resource.class'
import { fileResourcePath, fileResourceMethods } from './File Resource.shared'

export * from './File Resource.class'
export * from './File Resource.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const fileResource = (app: Application) => {
  // Register our service on the Feathers application
  app.use(fileResourcePath, new FileResourceService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: fileResourceMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(fileResourcePath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(fileResourceExternalResolver),
        schemaHooks.resolveResult(fileResourceResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(fileResourceQueryValidator),
        schemaHooks.resolveQuery(fileResourceQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(fileResourceDataValidator),
        schemaHooks.resolveData(fileResourceDataResolver)
      ],
      patch: [
        schemaHooks.validateData(fileResourcePatchValidator),
        schemaHooks.resolveData(fileResourcePatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [fileResourcePath]: FileResourceService
  }
}
