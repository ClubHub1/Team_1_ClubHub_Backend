// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  resourceCheckoutsDataValidator,
  resourceCheckoutsPatchValidator,
  resourceCheckoutsQueryValidator,
  resourceCheckoutsResolver,
  resourceCheckoutsExternalResolver,
  resourceCheckoutsDataResolver,
  resourceCheckoutsPatchResolver,
  resourceCheckoutsQueryResolver
} from './resource-checkouts.schema'

import type { Application } from '../../declarations'
import { ResourceCheckoutsService, getOptions } from './resource-checkouts.class'
import { resourceCheckoutsPath, resourceCheckoutsMethods } from './resource-checkouts.shared'

export * from './resource-checkouts.class'
export * from './resource-checkouts.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const resourceCheckouts = (app: Application) => {
  // Register our service on the Feathers application
  app.use(resourceCheckoutsPath, new ResourceCheckoutsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: resourceCheckoutsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(resourceCheckoutsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(resourceCheckoutsExternalResolver),
        schemaHooks.resolveResult(resourceCheckoutsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(resourceCheckoutsQueryValidator),
        schemaHooks.resolveQuery(resourceCheckoutsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(resourceCheckoutsDataValidator),
        schemaHooks.resolveData(resourceCheckoutsDataResolver)
      ],
      patch: [
        schemaHooks.validateData(resourceCheckoutsPatchValidator),
        schemaHooks.resolveData(resourceCheckoutsPatchResolver)
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
    [resourceCheckoutsPath]: ResourceCheckoutsService
  }
}
