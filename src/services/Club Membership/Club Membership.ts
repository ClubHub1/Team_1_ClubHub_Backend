// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  clubMembershipDataValidator,
  clubMembershipPatchValidator,
  clubMembershipQueryValidator,
  clubMembershipResolver,
  clubMembershipExternalResolver,
  clubMembershipDataResolver,
  clubMembershipPatchResolver,
  clubMembershipQueryResolver
} from './Club Membership.schema'

import type { Application } from '../../declarations'
import { ClubMembershipService, getOptions } from './Club Membership.class'
import { clubMembershipPath, clubMembershipMethods } from './Club Membership.shared'

export * from './Club Membership.class'
export * from './Club Membership.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const clubMembership = (app: Application) => {
  // Register our service on the Feathers application
  app.use(clubMembershipPath, new ClubMembershipService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: clubMembershipMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(clubMembershipPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(clubMembershipExternalResolver),
        schemaHooks.resolveResult(clubMembershipResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(clubMembershipQueryValidator),
        schemaHooks.resolveQuery(clubMembershipQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(clubMembershipDataValidator),
        schemaHooks.resolveData(clubMembershipDataResolver)
      ],
      patch: [
        schemaHooks.validateData(clubMembershipPatchValidator),
        schemaHooks.resolveData(clubMembershipPatchResolver)
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
    [clubMembershipPath]: ClubMembershipService
  }
}
