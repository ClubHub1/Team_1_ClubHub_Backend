import { authenticate } from '@feathersjs/authentication'
import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  pCardRequestDataValidator, pCardRequestPatchValidator, pCardRequestQueryValidator,
  pCardRequestResolver, pCardRequestExternalResolver, pCardRequestDataResolver,
  pCardRequestPatchResolver, pCardRequestQueryResolver
} from './PCardRequest.schema'
import type { Application } from '../../declarations'
import { PCardRequestService, getOptions } from './PCardRequest.class'
import { pCardRequestPath, pCardRequestMethods } from './PCardRequest.shared'

export * from './PCardRequest.class'
export * from './PCardRequest.schema'

export const pCardRequest = (app: Application) => {
  app.use(pCardRequestPath, new PCardRequestService(getOptions(app)), { methods: pCardRequestMethods, events: [] })
  app.service(pCardRequestPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(pCardRequestExternalResolver), schemaHooks.resolveResult(pCardRequestResolver)],
      find: [authenticate('jwt')], get: [authenticate('jwt')], create: [authenticate('jwt')],
      update: [authenticate('jwt')], patch: [authenticate('jwt')], remove: [authenticate('jwt')]
    },
    before: {
      all: [schemaHooks.validateQuery(pCardRequestQueryValidator), schemaHooks.resolveQuery(pCardRequestQueryResolver)],
      find: [], get: [],
      create: [schemaHooks.validateData(pCardRequestDataValidator), schemaHooks.resolveData(pCardRequestDataResolver)],
      patch: [schemaHooks.validateData(pCardRequestPatchValidator), schemaHooks.resolveData(pCardRequestPatchResolver)],
      remove: []
    },
    after: { all: [] }, error: { all: [] }
  })
}

declare module '../../declarations' {
  interface ServiceTypes { [pCardRequestPath]: PCardRequestService }
}
