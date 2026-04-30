// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  travelRequestsDataValidator,
  travelRequestsPatchValidator,
  travelRequestsQueryValidator,
  travelRequestsResolver,
  travelRequestsExternalResolver,
  travelRequestsDataResolver,
  travelRequestsPatchResolver,
  travelRequestsQueryResolver
} from './travel-requests.schema'

import type { Application } from '../../declarations'
import { TravelRequestsService, getOptions } from './travel-requests.class'
import { travelRequestsPath, travelRequestsMethods } from './travel-requests.shared'

export * from './travel-requests.class'
export * from './travel-requests.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const travelRequests = (app: Application) => {
  // Register our service on the Feathers application
  app.use(travelRequestsPath, new TravelRequestsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: travelRequestsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(travelRequestsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(travelRequestsExternalResolver),
        schemaHooks.resolveResult(travelRequestsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(travelRequestsQueryValidator),
        schemaHooks.resolveQuery(travelRequestsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(travelRequestsDataValidator),
        schemaHooks.resolveData(travelRequestsDataResolver)
      ],
      patch: [
        schemaHooks.validateData(travelRequestsPatchValidator),
        schemaHooks.resolveData(travelRequestsPatchResolver)
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
    [travelRequestsPath]: TravelRequestsService
  }
}
