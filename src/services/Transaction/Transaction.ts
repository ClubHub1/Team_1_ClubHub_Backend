import { authenticate } from '@feathersjs/authentication'
import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  transactionDataValidator, transactionPatchValidator, transactionQueryValidator,
  transactionResolver, transactionExternalResolver, transactionDataResolver,
  transactionPatchResolver, transactionQueryResolver
} from './Transaction.schema'
import type { Application } from '../../declarations'
import { TransactionService, getOptions } from './Transaction.class'
import { transactionPath, transactionMethods } from './Transaction.shared'

export * from './Transaction.class'
export * from './Transaction.schema'

export const transaction = (app: Application) => {
  app.use(transactionPath, new TransactionService(getOptions(app)), { methods: transactionMethods, events: [] })
  app.service(transactionPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(transactionExternalResolver), schemaHooks.resolveResult(transactionResolver)],
      find: [authenticate('jwt')], get: [authenticate('jwt')], create: [authenticate('jwt')],
      update: [authenticate('jwt')], patch: [authenticate('jwt')], remove: [authenticate('jwt')]
    },
    before: {
      all: [schemaHooks.validateQuery(transactionQueryValidator), schemaHooks.resolveQuery(transactionQueryResolver)],
      find: [], get: [],
      create: [schemaHooks.validateData(transactionDataValidator), schemaHooks.resolveData(transactionDataResolver)],
      patch: [schemaHooks.validateData(transactionPatchValidator), schemaHooks.resolveData(transactionPatchResolver)],
      remove: []
    },
    after: { all: [] }, error: { all: [] }
  })
}

declare module '../../declarations' {
  interface ServiceTypes { [transactionPath]: TransactionService }
}
