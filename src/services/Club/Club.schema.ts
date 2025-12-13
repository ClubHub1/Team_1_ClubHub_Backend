// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { ClubService } from './Club.class'

// Main data model schema
export const clubSchema = Type.Object(
  {
    club_id: Type.Number(),
    name: Type.String(),
    description: Type.String()
  },
  { $id: 'Club', additionalProperties: true }
)
export type Club = Static<typeof clubSchema>
export const clubValidator = getValidator(clubSchema, dataValidator)
export const clubResolver = resolve<ClubQuery, HookContext<ClubService>>({})

export const clubExternalResolver = resolve<Club, HookContext<ClubService>>({})

// Schema for creating new entries
export const clubDataSchema = Type.Pick(clubSchema, ['name'], {
  $id: 'ClubData'
})
export type ClubData = Static<typeof clubDataSchema>
export const clubDataValidator = getValidator(clubDataSchema, dataValidator)
export const clubDataResolver = resolve<ClubData, HookContext<ClubService>>({})

// Schema for updating existing entries
export const clubPatchSchema = Type.Partial(clubSchema, {
  $id: 'ClubPatch'
})
export type ClubPatch = Static<typeof clubPatchSchema>
export const clubPatchValidator = getValidator(clubPatchSchema, dataValidator)
export const clubPatchResolver = resolve<ClubPatch, HookContext<ClubService>>({})

// Schema for allowed query properties
export const clubQueryProperties = Type.Pick(clubSchema, ['club_id', 'name'])
export const clubQuerySchema = Type.Intersect(
  [
    querySyntax(clubQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type ClubQuery = Static<typeof clubQuerySchema>
export const clubQueryValidator = getValidator(clubQuerySchema, queryValidator)
export const clubQueryResolver = resolve<ClubQuery, HookContext<ClubService>>({})
