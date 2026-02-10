// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { TaskAssignmentService } from './Task Assignment.class'

// Main data model schema
export const taskAssignmentSchema = Type.Object(
  {
    id: Type.Number(),
    task: Type.Integer(),
    user: Type.Integer(),
    assigned_at: Type.String()
  },
  { $id: 'TaskAssignment', additionalProperties: false }
)
export type TaskAssignment = Static<typeof taskAssignmentSchema>
export const taskAssignmentValidator = getValidator(taskAssignmentSchema, dataValidator)
export const taskAssignmentResolver = resolve<TaskAssignmentQuery, HookContext<TaskAssignmentService>>({})

export const taskAssignmentExternalResolver = resolve<TaskAssignment, HookContext<TaskAssignmentService>>({})

// Schema for creating new entries
export const taskAssignmentDataSchema = Type.Pick(taskAssignmentSchema, ['task', 'user', 'assigned_at'], {
  $id: 'TaskAssignmentData'
})
export type TaskAssignmentData = Static<typeof taskAssignmentDataSchema>
export const taskAssignmentDataValidator = getValidator(taskAssignmentDataSchema, dataValidator)
export const taskAssignmentDataResolver = resolve<TaskAssignmentData, HookContext<TaskAssignmentService>>({})

// Schema for updating existing entries
export const taskAssignmentPatchSchema = Type.Partial(taskAssignmentSchema, {
  $id: 'TaskAssignmentPatch'
})
export type TaskAssignmentPatch = Static<typeof taskAssignmentPatchSchema>
export const taskAssignmentPatchValidator = getValidator(taskAssignmentPatchSchema, dataValidator)
export const taskAssignmentPatchResolver = resolve<TaskAssignmentPatch, HookContext<TaskAssignmentService>>(
  {}
)

// Schema for allowed query properties
export const taskAssignmentQueryProperties = Type.Pick(taskAssignmentSchema, ['task', 'user'])
export const taskAssignmentQuerySchema = Type.Intersect(
  [
    querySyntax(taskAssignmentQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type TaskAssignmentQuery = Static<typeof taskAssignmentQuerySchema>
export const taskAssignmentQueryValidator = getValidator(taskAssignmentQuerySchema, queryValidator)
export const taskAssignmentQueryResolver = resolve<TaskAssignmentQuery, HookContext<TaskAssignmentService>>(
  {}
)
