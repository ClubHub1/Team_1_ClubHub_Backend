import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'
import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { TransactionService } from './Transaction.class'

export const transactionSchema = Type.Object(
  {
    transaction_id: Type.Number(),
    club: Type.Number(),
    created_by: Type.Number(),
    title: Type.String(),
    amount: Type.Number(),
    category: Type.String(),
    transaction_date: Type.String(),
    notes: Type.Optional(Type.String()),
    created_at: Type.Optional(Type.String())
  },
  { $id: 'Transaction', additionalProperties: false }
)
export type Transaction = Static<typeof transactionSchema>
export const transactionValidator = getValidator(transactionSchema, dataValidator)
export const transactionResolver = resolve<Transaction, HookContext<TransactionService>>({})
export const transactionExternalResolver = resolve<Transaction, HookContext<TransactionService>>({})

export const transactionDataSchema = Type.Pick(
  transactionSchema,
  ['club','created_by','title','amount','category','transaction_date','notes'],
  { $id: 'TransactionData' }
)
export type TransactionData = Static<typeof transactionDataSchema>
export const transactionDataValidator = getValidator(transactionDataSchema, dataValidator)
export const transactionDataResolver = resolve<Transaction, HookContext<TransactionService>>({})

export const transactionPatchSchema = Type.Partial(transactionSchema, { $id: 'TransactionPatch' })
export type TransactionPatch = Static<typeof transactionPatchSchema>
export const transactionPatchValidator = getValidator(transactionPatchSchema, dataValidator)
export const transactionPatchResolver = resolve<Transaction, HookContext<TransactionService>>({})

export const transactionQueryProperties = Type.Pick(transactionSchema, ['transaction_id','club','created_by','category'])
export const transactionQuerySchema = Type.Intersect(
  [querySyntax(transactionQueryProperties), Type.Object({}, { additionalProperties: false })],
  { additionalProperties: false }
)
export type TransactionQuery = Static<typeof transactionQuerySchema>
export const transactionQueryValidator = getValidator(transactionQuerySchema, queryValidator)
export const transactionQueryResolver = resolve<TransactionQuery, HookContext<TransactionService>>({})
