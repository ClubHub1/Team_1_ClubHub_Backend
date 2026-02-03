// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  attendanceDataValidator,
  attendancePatchValidator,
  attendanceQueryValidator,
  attendanceResolver,
  attendanceExternalResolver,
  attendanceDataResolver,
  attendancePatchResolver,
  attendanceQueryResolver
} from './Attendance.schema'

import type { Application } from '../../declarations'
import { AttendanceService, getOptions } from './Attendance.class'
import { attendancePath, attendanceMethods } from './Attendance.shared'

export * from './Attendance.class'
export * from './Attendance.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const attendance = (app: Application) => {
  // Register our service on the Feathers application
  app.use(attendancePath, new AttendanceService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: attendanceMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(attendancePath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(attendanceExternalResolver),
        schemaHooks.resolveResult(attendanceResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(attendanceQueryValidator),
        schemaHooks.resolveQuery(attendanceQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(attendanceDataValidator),
        schemaHooks.resolveData(attendanceDataResolver)
      ],
      patch: [
        schemaHooks.validateData(attendancePatchValidator),
        schemaHooks.resolveData(attendancePatchResolver)
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
    [attendancePath]: AttendanceService
  }
}
