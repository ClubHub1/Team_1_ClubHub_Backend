// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { ClubService } from './Club.class'

const clubCategoryEnum = Type.Union([
  Type.Literal('academic'),
  Type.Literal('activism'),
  Type.Literal('api'),
  Type.Literal('athletic'),
  Type.Literal('black_african'),
  Type.Literal('career_dev'),
  Type.Literal('christian'),
  Type.Literal('civic'),
  Type.Literal('sports_comp'),
  Type.Literal('sports_noncomp'),
  Type.Literal('community_svc'),
  Type.Literal('cooking'),
  Type.Literal('crafts_arts'),
  Type.Literal('cultural_lang'),
  Type.Literal('dance'),
  Type.Literal('democratic_engagement'),
  Type.Literal('environment'),
  Type.Literal('faith'),
  Type.Literal('greek_life'),
  Type.Literal('gaming'),
  Type.Literal('gender_sexuality'),
  Type.Literal('health'),
  Type.Literal('honor_societies'),
  Type.Literal('indigenous'),
  Type.Literal('international'),
  Type.Literal('sports_intramural'),
  Type.Literal('jewish'),
  Type.Literal('lake_tahoe'),
  Type.Literal('latinx'),
  Type.Literal('leadership'),
  Type.Literal('literary'),
  Type.Literal('martial_arts'),
  Type.Literal('media'),
  Type.Literal('men_of_color'),
  Type.Literal('mena'),
  Type.Literal('multicultural'),
  Type.Literal('music'),
  Type.Literal('muslim'),
  Type.Literal('neurodiversity'),
  Type.Literal('outdoor_rec'),
  Type.Literal('political'),
  Type.Literal('pre_professional'),
  Type.Literal('religious'),
  Type.Literal('research'),
  Type.Literal('social'),
  Type.Literal('social_justice'),
  Type.Literal('special_interest'),
  Type.Literal('stem'),
  Type.Literal('student_gov'),
  Type.Literal('student_resources'),
  Type.Literal('theater'),
  Type.Literal('women_of_color'),
  Type.Literal('women_centered'),
])

// Main data model schema
export const clubSchema = Type.Object(
  {
    club_id: Type.Number(),
    name: Type.String(),
    description: Type.String(),
    created_at: Type.String(),
    //EITHER 'Active' OR 'Inactive'
    activity_status: Type.String(),
    tags: Type.Optional(Type.Array(clubCategoryEnum))
  },
  { $id: 'Club', additionalProperties: true }
)
export type Club = Static<typeof clubSchema>
export const clubValidator = getValidator(clubSchema, dataValidator)
export const clubResolver = resolve<ClubQuery, HookContext<ClubService>>({})

export const clubExternalResolver = resolve<Club, HookContext<ClubService>>({})

// Schema for creating new entries
export const clubDataSchema = Type.Pick(clubSchema, ['name', 'description', 'created_at', 'activity_status', 'tags'], {
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
export const clubQueryProperties = Type.Pick(clubSchema, ['club_id', 'name', 'tags'])
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
