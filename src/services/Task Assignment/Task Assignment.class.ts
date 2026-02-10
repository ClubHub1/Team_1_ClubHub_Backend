// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type {
  TaskAssignment,
  TaskAssignmentData,
  TaskAssignmentPatch,
  TaskAssignmentQuery
} from './Task Assignment.schema'

export type { TaskAssignment, TaskAssignmentData, TaskAssignmentPatch, TaskAssignmentQuery }

export interface TaskAssignmentParams extends KnexAdapterParams<TaskAssignmentQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class TaskAssignmentService<ServiceParams extends Params = TaskAssignmentParams> extends KnexService<
  TaskAssignment,
  TaskAssignmentData,
  TaskAssignmentParams,
  TaskAssignmentPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'Task Assignment'
  }
}
