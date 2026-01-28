// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { TaskService } from './Task.class'

// Main data model schema
export const taskSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'Task', additionalProperties: false }
)
export type Task = Static<typeof taskSchema>
export const taskValidator = getValidator(taskSchema, dataValidator)
export const taskResolver = resolve<TaskQuery, HookContext<TaskService>>({})

export const taskExternalResolver = resolve<Task, HookContext<TaskService>>({})

// Schema for creating new entries
export const taskDataSchema = Type.Pick(taskSchema, ['text'], {
  $id: 'TaskData'
})
export type TaskData = Static<typeof taskDataSchema>
export const taskDataValidator = getValidator(taskDataSchema, dataValidator)
export const taskDataResolver = resolve<TaskData, HookContext<TaskService>>({})

// Schema for updating existing entries
export const taskPatchSchema = Type.Partial(taskSchema, {
  $id: 'TaskPatch'
})
export type TaskPatch = Static<typeof taskPatchSchema>
export const taskPatchValidator = getValidator(taskPatchSchema, dataValidator)
export const taskPatchResolver = resolve<TaskPatch, HookContext<TaskService>>({})

// Schema for allowed query properties
export const taskQueryProperties = Type.Pick(taskSchema, ['id', 'text'])
export const taskQuerySchema = Type.Intersect(
  [
    querySyntax(taskQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type TaskQuery = Static<typeof taskQuerySchema>
export const taskQueryValidator = getValidator(taskQuerySchema, queryValidator)
export const taskQueryResolver = resolve<TaskQuery, HookContext<TaskService>>({})
