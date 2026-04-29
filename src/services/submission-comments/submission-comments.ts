// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  submissionCommentsDataValidator,
  submissionCommentsPatchValidator,
  submissionCommentsQueryValidator,
  submissionCommentsResolver,
  submissionCommentsExternalResolver,
  submissionCommentsDataResolver,
  submissionCommentsPatchResolver,
  submissionCommentsQueryResolver
} from './submission-comments.schema'

import type { Application } from '../../declarations'
import { SubmissionCommentsService, getOptions } from './submission-comments.class'
import { submissionCommentsPath, submissionCommentsMethods } from './submission-comments.shared'

export * from './submission-comments.class'
export * from './submission-comments.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const submissionComments = (app: Application) => {
  // Register our service on the Feathers application
  app.use(submissionCommentsPath, new SubmissionCommentsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: submissionCommentsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(submissionCommentsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(submissionCommentsExternalResolver),
        schemaHooks.resolveResult(submissionCommentsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(submissionCommentsQueryValidator),
        schemaHooks.resolveQuery(submissionCommentsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(submissionCommentsDataValidator),
        schemaHooks.resolveData(submissionCommentsDataResolver)
      ],
      patch: [
        schemaHooks.validateData(submissionCommentsPatchValidator),
        schemaHooks.resolveData(submissionCommentsPatchResolver)
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
    [submissionCommentsPath]: SubmissionCommentsService
  }
}
