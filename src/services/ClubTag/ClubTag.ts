import { authenticate } from '@feathersjs/authentication'
import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  clubTagDataValidator, clubTagPatchValidator, clubTagQueryValidator,
  clubTagResolver, clubTagExternalResolver, clubTagDataResolver,
  clubTagPatchResolver, clubTagQueryResolver
} from './ClubTag.schema'
import type { Application } from '../../declarations'
import { ClubTagService, getOptions } from './ClubTag.class'
import { clubTagPath, clubTagMethods } from './ClubTag.shared'

export * from './ClubTag.class'
export * from './ClubTag.schema'

export const clubTag = (app: Application) => {
  app.use(clubTagPath, new ClubTagService(getOptions(app)), { methods: clubTagMethods, events: [] })
  app.service(clubTagPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(clubTagExternalResolver), schemaHooks.resolveResult(clubTagResolver)],
      find: [], get: [], create: [authenticate('jwt')],
      update: [authenticate('jwt')], patch: [authenticate('jwt')], remove: [authenticate('jwt')]
    },
    before: {
      all: [schemaHooks.validateQuery(clubTagQueryValidator), schemaHooks.resolveQuery(clubTagQueryResolver)],
      find: [], get: [],
      create: [schemaHooks.validateData(clubTagDataValidator), schemaHooks.resolveData(clubTagDataResolver)],
      patch: [schemaHooks.validateData(clubTagPatchValidator), schemaHooks.resolveData(clubTagPatchResolver)],
      remove: []
    },
    after: { all: [] }, error: { all: [] }
  })
}

declare module '../../declarations' {
  interface ServiceTypes { [clubTagPath]: ClubTagService }
}
