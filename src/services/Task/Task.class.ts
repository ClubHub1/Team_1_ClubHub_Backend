// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Task, TaskData, TaskPatch, TaskQuery } from './Task.schema'

export type { Task, TaskData, TaskPatch, TaskQuery }

export interface TaskParams extends KnexAdapterParams<TaskQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class TaskService<ServiceParams extends Params = TaskParams> extends KnexService<
  Task,
  TaskData,
  TaskParams,
  TaskPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'Task'
  }
}
