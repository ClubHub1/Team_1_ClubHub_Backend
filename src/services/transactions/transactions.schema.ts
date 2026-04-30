// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { TransactionsService } from './transactions.class'

const nullableString = () => Type.Union([Type.String(), Type.Null()])
const nullableNumber = () => Type.Union([Type.Number(), Type.Null()])

// Main data model schema
export const transactionsSchema = Type.Object(
  {
    id: Type.Number(),
    club: nullableNumber(),
    created_by: nullableNumber(),
    submitted_by: Type.Optional(nullableNumber()),
    type: Type.Union([Type.Literal('income'), Type.Literal('expense'), Type.Null()]),
    title: nullableString(),
    amount: nullableNumber(),
    description: Type.Optional(nullableString()),
    transaction_date: nullableString(),
    category: nullableString(),
    created_at: Type.Optional(nullableString()),
  },
  { $id: 'Transactions', additionalProperties: false }
)
export type Transactions = Static<typeof transactionsSchema>
export const transactionsValidator = getValidator(transactionsSchema, dataValidator)
export const transactionsResolver = resolve<Transactions, HookContext<TransactionsService>>({})
export const transactionsExternalResolver = resolve<Transactions, HookContext<TransactionsService>>({})

// Schema for creating new entries
export const transactionsDataSchema = Type.Partial(Type.Pick(
  transactionsSchema,
  ['club', 'created_by', 'type', 'title', 'amount', 'description', 'transaction_date', 'category'],
  { $id: 'TransactionsData' }
))
export type TransactionsData = Static<typeof transactionsDataSchema>
export const transactionsDataValidator = getValidator(transactionsDataSchema, dataValidator)
export const transactionsDataResolver = resolve<TransactionsData, HookContext<TransactionsService>>({})

// Schema for updating existing entries
export const transactionsPatchSchema = Type.Partial(transactionsSchema, {
  $id: 'TransactionsPatch'
})
export type TransactionsPatch = Static<typeof transactionsPatchSchema>
export const transactionsPatchValidator = getValidator(transactionsPatchSchema, dataValidator)
export const transactionsPatchResolver = resolve<TransactionsPatch, HookContext<TransactionsService>>({})

// Schema for allowed query properties
export const transactionsQueryProperties = Type.Pick(transactionsSchema, [
  'id', 'club', 'created_by', 'type', 'category', 'transaction_date'
])
export const transactionsQuerySchema = Type.Intersect(
  [
    querySyntax(transactionsQueryProperties),
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type TransactionsQuery = Static<typeof transactionsQuerySchema>
export const transactionsQueryValidator = getValidator(transactionsQuerySchema, queryValidator)
export const transactionsQueryResolver = resolve<TransactionsQuery, HookContext<TransactionsService>>({})
