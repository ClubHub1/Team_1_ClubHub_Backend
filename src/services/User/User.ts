// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import { BadRequest, NotAuthenticated } from '@feathersjs/errors'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  userDataValidator,
  userPatchValidator,
  userQueryValidator,
  userResolver,
  userExternalResolver,
  userDataResolver,
  userPatchResolver,
  userQueryResolver
} from './User.schema'

import type { Application } from '../../declarations'
import { UserService, getOptions } from './User.class'
import { userPath, userMethods } from './User.shared'

export * from './User.class'
export * from './User.schema'

const userEmailCheck = require('../../hooks/user-email-check');

const publicUserLookupFields = ['id', 'email', 'first_name', 'last_name', 'profile_photo_url'] as const

const allowPublicEmailLookupOnly = async (context: any) => {
  const { params } = context
  const isExternal = Boolean(params.provider)
  const isAuthenticated = Boolean(params.authentication || params.user || params.User)

  if (!isExternal || isAuthenticated) {
    return context
  }

  const query = params.query ?? {}
  const queryKeys = Object.keys(query)
  const allowedKeys = ['email', '$limit', '$select']
  const hasOnlyAllowedKeys = queryKeys.every(key => allowedKeys.includes(key))

  if (typeof query.email !== 'string' || query.email.trim() === '') {
    throw new BadRequest('Public user lookup requires a non-empty email query.')
  }

  if (!hasOnlyAllowedKeys) {
    throw new NotAuthenticated('Authentication is required for User queries other than email lookup.')
  }

  params.query = {
    email: query.email.trim(),
    $limit: 1,
    $select: [...publicUserLookupFields]
  }

  return context
}

// A configure function that registers the service and its hooks via `app.configure`
export const user = (app: Application) => {
  // Register our service on the Feathers application
  app.use(userPath, new UserService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: userMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(userPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(userExternalResolver), schemaHooks.resolveResult(userResolver)],
      find: [],
      get: [authenticate('jwt')],
      create: [],
      update: [authenticate('jwt')],
      patch: [authenticate('jwt')],
      remove: [authenticate('jwt')]
    },
    before: {
      all: [schemaHooks.validateQuery(userQueryValidator), schemaHooks.resolveQuery(userQueryResolver)],
      find: [allowPublicEmailLookupOnly],
      get: [],
      create: [schemaHooks.validateData(userDataValidator), schemaHooks.resolveData(userDataResolver), 
      userEmailCheck()],
      patch: [schemaHooks.validateData(userPatchValidator), schemaHooks.resolveData(userPatchResolver)],
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
    [userPath]: UserService
  }
}
