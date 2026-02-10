// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  TaskAssignment,
  TaskAssignmentData,
  TaskAssignmentPatch,
  TaskAssignmentQuery,
  TaskAssignmentService
} from './Task Assignment.class'

export type { TaskAssignment, TaskAssignmentData, TaskAssignmentPatch, TaskAssignmentQuery }

export type TaskAssignmentClientService = Pick<
  TaskAssignmentService<Params<TaskAssignmentQuery>>,
  (typeof taskAssignmentMethods)[number]
>

export const taskAssignmentPath = 'TaskAssignment'

export const taskAssignmentMethods: Array<keyof TaskAssignmentService> = [
  'find',
  'get',
  'create',
  'patch',
  'remove'
]

export const taskAssignmentClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(taskAssignmentPath, connection.service(taskAssignmentPath), {
    methods: taskAssignmentMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [taskAssignmentPath]: TaskAssignmentClientService
  }
}
