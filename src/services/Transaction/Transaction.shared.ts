import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Transaction, TransactionData, TransactionPatch, TransactionQuery, TransactionService } from './Transaction.class'

export type { Transaction, TransactionData, TransactionPatch, TransactionQuery }
export type TransactionClientService = Pick<TransactionService<Params<TransactionQuery>>, (typeof transactionMethods)[number]>
export const transactionPath = 'transactions'
export const transactionMethods: Array<keyof TransactionService> = ['find','get','create','patch','remove']

export const transactionClient = (client: ClientApplication) => {
  const connection = client.get('connection')
  client.use(transactionPath, connection.service(transactionPath), { methods: transactionMethods })
}

declare module '../../client' {
  interface ServiceTypes {
    [transactionPath]: TransactionClientService
  }
}
