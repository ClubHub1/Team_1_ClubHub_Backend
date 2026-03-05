import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'
import type { Application } from '../../declarations'
import type { Transaction, TransactionData, TransactionPatch, TransactionQuery } from './Transaction.schema'

export type { Transaction, TransactionData, TransactionPatch, TransactionQuery }
export interface TransactionParams extends KnexAdapterParams<TransactionQuery> {}
export class TransactionService<ServiceParams extends Params = TransactionParams> extends KnexService<Transaction, TransactionData, TransactionParams, TransactionPatch> {}
export const getOptions = (app: Application): KnexAdapterOptions => ({
  paginate: app.get('paginate'),
  Model: app.get('postgresqlClient'),
  name: 'Transaction'
})
