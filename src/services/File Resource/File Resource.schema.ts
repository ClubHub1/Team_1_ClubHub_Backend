// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { FileResourceService } from './File Resource.class'

// Main data model schema
export const fileResourceSchema = Type.Object(
  {
    id: Type.Number(),
    club: Type.Integer(),
    event: Type.Integer(),
    source_url: Type.String(),
    created_at: Type.String()
  },
  { $id: 'FileResource', additionalProperties: false }
)
export type FileResource = Static<typeof fileResourceSchema>
export const fileResourceValidator = getValidator(fileResourceSchema, dataValidator)
export const fileResourceResolver = resolve<FileResourceQuery, HookContext<FileResourceService>>({})

export const fileResourceExternalResolver = resolve<FileResource, HookContext<FileResourceService>>({})

// Schema for creating new entries
export const fileResourceDataSchema = Type.Pick(fileResourceSchema, ['club', 'event', 'source_url', 'created_at'], {
  $id: 'FileResourceData'
})
export type FileResourceData = Static<typeof fileResourceDataSchema>
export const fileResourceDataValidator = getValidator(fileResourceDataSchema, dataValidator)
export const fileResourceDataResolver = resolve<FileResourceData, HookContext<FileResourceService>>({})

// Schema for updating existing entries
export const fileResourcePatchSchema = Type.Partial(fileResourceSchema, {
  $id: 'FileResourcePatch'
})
export type FileResourcePatch = Static<typeof fileResourcePatchSchema>
export const fileResourcePatchValidator = getValidator(fileResourcePatchSchema, dataValidator)
export const fileResourcePatchResolver = resolve<FileResourcePatch, HookContext<FileResourceService>>({})

// Schema for allowed query properties
export const fileResourceQueryProperties = Type.Pick(fileResourceSchema, ['club', 'event', 'source_url'])
export const fileResourceQuerySchema = Type.Intersect(
  [
    querySyntax(fileResourceQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type FileResourceQuery = Static<typeof fileResourceQuerySchema>
export const fileResourceQueryValidator = getValidator(fileResourceQuerySchema, queryValidator)
export const fileResourceQueryResolver = resolve<FileResourceQuery, HookContext<FileResourceService>>({})
