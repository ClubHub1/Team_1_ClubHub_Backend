// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { ClubMembershipService } from './Club Membership.class'

// Main data model schema
export const clubMembershipSchema = Type.Object(
  {
    id: Type.Number(),
    clubid: Type.Number(),
    userid: Type.Number(),
    role: Type.String(),
    is_active: Type.Boolean(),
    dues_paid: Type.Boolean()
  },
  { $id: 'ClubMembership', additionalProperties: true }
)
export type ClubMembership = Static<typeof clubMembershipSchema>
export const clubMembershipValidator = getValidator(clubMembershipSchema, dataValidator)
export const clubMembershipResolver = resolve<ClubMembershipQuery, HookContext<ClubMembershipService>>({})

export const clubMembershipExternalResolver = resolve<ClubMembership, HookContext<ClubMembershipService>>({})

// Schema for creating new entries
export const clubMembershipDataSchema = Type.Object(
  {
    clubid: Type.Number(),
    userid: Type.Number(),
    role: Type.String(),
    is_active: Type.Boolean(),
    dues_paid: Type.Boolean()
  },
  {
    $id: 'ClubMembershipData',
    additionalProperties: false
  }
)
export type ClubMembershipData = Static<typeof clubMembershipDataSchema>
export const clubMembershipDataValidator = getValidator(clubMembershipDataSchema, dataValidator)
export const clubMembershipDataResolver = resolve<ClubMembershipData, HookContext<ClubMembershipService>>({})

// Schema for updating existing entries
export const clubMembershipPatchSchema = Type.Partial(
  Type.Object(
    {
      clubid: Type.Number(),
      userid: Type.Number(),
      role: Type.String(),
      is_active: Type.Boolean(),
      dues_paid: Type.Boolean()
    },
    { additionalProperties: false }
  ),
  {
    $id: 'ClubMembershipPatch'
  }
)
export type ClubMembershipPatch = Static<typeof clubMembershipPatchSchema>
export const clubMembershipPatchValidator = getValidator(clubMembershipPatchSchema, dataValidator)
export const clubMembershipPatchResolver = resolve<ClubMembershipPatch, HookContext<ClubMembershipService>>(
  {}
)

// Schema for allowed query properties
export const clubMembershipQueryProperties = Type.Pick(clubMembershipSchema, [
  'id',
  'clubid',
  'userid',
  'role',
  'is_active',
  'dues_paid'
])
export const clubMembershipQuerySchema = Type.Intersect(
  [
    querySyntax(clubMembershipQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type ClubMembershipQuery = Static<typeof clubMembershipQuerySchema>
export const clubMembershipQueryValidator = getValidator(clubMembershipQuerySchema, queryValidator)
export const clubMembershipQueryResolver = resolve<ClubMembershipQuery, HookContext<ClubMembershipService>>(
  {}
)
