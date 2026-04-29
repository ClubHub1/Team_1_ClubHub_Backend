// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  pCardRequestsDataValidator,
  pCardRequestsPatchValidator,
  pCardRequestsQueryValidator,
  pCardRequestsResolver,
  pCardRequestsExternalResolver,
  pCardRequestsDataResolver,
  pCardRequestsPatchResolver,
  pCardRequestsQueryResolver
} from './p-card-requests.schema'

import type { Application } from '../../declarations'
import { PCardRequestsService, getOptions } from './p-card-requests.class'
import { pCardRequestsPath, pCardRequestsMethods } from './p-card-requests.shared'

export * from './p-card-requests.class'
export * from './p-card-requests.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const pCardRequests = (app: Application) => {
  // Register our service on the Feathers application
  app.use(pCardRequestsPath, new PCardRequestsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: pCardRequestsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(pCardRequestsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(pCardRequestsExternalResolver),
        schemaHooks.resolveResult(pCardRequestsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(pCardRequestsQueryValidator),
        schemaHooks.resolveQuery(pCardRequestsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(pCardRequestsDataValidator),
        schemaHooks.resolveData(pCardRequestsDataResolver)
      ],
      patch: [
        schemaHooks.validateData(pCardRequestsPatchValidator),
        schemaHooks.resolveData(pCardRequestsPatchResolver)
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
    [pCardRequestsPath]: PCardRequestsService
  }
}
