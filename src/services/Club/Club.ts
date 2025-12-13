// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  clubDataValidator,
  clubPatchValidator,
  clubQueryValidator,
  clubResolver,
  clubExternalResolver,
  clubDataResolver,
  clubPatchResolver,
  clubQueryResolver
} from './Club.schema'

import type { Application } from '../../declarations'
import { ClubService, getOptions } from './Club.class'
import { clubPath, clubMethods } from './Club.shared'
import knex from 'knex'
import type { Knex } from 'knex'
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

export * from './Club.class'
export * from './Club.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const club = (app: Application) => {
  const options: KnexAdapterOptions = {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'Club',
    id: 'club_id'
  }
  app.use(clubPath, new ClubService(options)), {
    methods: clubMethods,

    events: []
  }
  // Register our service on the Feathers application
  // Initialize hooks
  app.service(clubPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(clubExternalResolver),
        schemaHooks.resolveResult(clubResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(clubQueryValidator), schemaHooks.resolveQuery(clubQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(clubDataValidator), schemaHooks.resolveData(clubDataResolver)],
      patch: [schemaHooks.validateData(clubPatchValidator), schemaHooks.resolveData(clubPatchResolver)],
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
    [clubPath]: ClubService
  }
}
