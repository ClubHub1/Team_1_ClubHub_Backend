// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  taskAssignmentDataValidator,
  taskAssignmentPatchValidator,
  taskAssignmentQueryValidator,
  taskAssignmentResolver,
  taskAssignmentExternalResolver,
  taskAssignmentDataResolver,
  taskAssignmentPatchResolver,
  taskAssignmentQueryResolver
} from './Task Assignment.schema'

import type { Application } from '../../declarations'
import { TaskAssignmentService, getOptions } from './Task Assignment.class'
import { taskAssignmentPath, taskAssignmentMethods } from './Task Assignment.shared'

export * from './Task Assignment.class'
export * from './Task Assignment.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const taskAssignment = (app: Application) => {
  // Register our service on the Feathers application
  app.use(taskAssignmentPath, new TaskAssignmentService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: taskAssignmentMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(taskAssignmentPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(taskAssignmentExternalResolver),
        schemaHooks.resolveResult(taskAssignmentResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(taskAssignmentQueryValidator),
        schemaHooks.resolveQuery(taskAssignmentQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(taskAssignmentDataValidator),
        schemaHooks.resolveData(taskAssignmentDataResolver)
      ],
      patch: [
        schemaHooks.validateData(taskAssignmentPatchValidator),
        schemaHooks.resolveData(taskAssignmentPatchResolver)
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
    [taskAssignmentPath]: TaskAssignmentService
  }
}
