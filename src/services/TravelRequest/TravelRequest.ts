import { authenticate } from '@feathersjs/authentication'
import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  travelRequestDataValidator, travelRequestPatchValidator, travelRequestQueryValidator,
  travelRequestResolver, travelRequestExternalResolver, travelRequestDataResolver,
  travelRequestPatchResolver, travelRequestQueryResolver
} from './TravelRequest.schema'
import type { Application } from '../../declarations'
import { TravelRequestService, getOptions } from './TravelRequest.class'
import { travelRequestPath, travelRequestMethods } from './TravelRequest.shared'

export * from './TravelRequest.class'
export * from './TravelRequest.schema'

export const travelRequest = (app: Application) => {
  app.use(travelRequestPath, new TravelRequestService(getOptions(app)), { methods: travelRequestMethods, events: [] })
  app.service(travelRequestPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(travelRequestExternalResolver), schemaHooks.resolveResult(travelRequestResolver)],
      find: [authenticate('jwt')], get: [authenticate('jwt')], create: [authenticate('jwt')],
      update: [authenticate('jwt')], patch: [authenticate('jwt')], remove: [authenticate('jwt')]
    },
    before: {
      all: [schemaHooks.validateQuery(travelRequestQueryValidator), schemaHooks.resolveQuery(travelRequestQueryResolver)],
      find: [], get: [],
      create: [schemaHooks.validateData(travelRequestDataValidator), schemaHooks.resolveData(travelRequestDataResolver)],
      patch: [schemaHooks.validateData(travelRequestPatchValidator), schemaHooks.resolveData(travelRequestPatchResolver)],
      remove: []
    },
    after: { all: [] }, error: { all: [] }
  })
}

declare module '../../declarations' {
  interface ServiceTypes { [travelRequestPath]: TravelRequestService }
}
