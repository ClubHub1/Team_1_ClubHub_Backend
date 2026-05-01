// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { ResourceCheckoutsService } from './resource-checkouts.class'

const nullableString = () => Type.Union([Type.String(), Type.Null()])
const nullableNumber = () => Type.Union([Type.Number(), Type.Null()])
const nullableBoolean = () => Type.Union([Type.Boolean(), Type.Null()])
const nullableStringArray = () => Type.Union([Type.Array(Type.String()), Type.Null()])

// Main data model schema
export const resourceCheckoutsSchema = Type.Object(
  {
    id: Type.Number(),
    club: nullableNumber(),
    submitted_by: nullableNumber(),
    full_name: Type.Optional(nullableString()),
    email: Type.Optional(nullableString()),
    club_name: Type.Optional(nullableString()),
    leadership_position: Type.Optional(nullableString()),
    other_position: Type.Optional(nullableString()),
    event_title: Type.Optional(nullableString()),
    checkout_date: Type.Optional(nullableString()),
    checkout_time: Type.Optional(nullableString()),
    return_date: Type.Optional(nullableString()),
    return_time: Type.Optional(nullableString()),
    requested_items: Type.Optional(Type.Union([Type.String(), nullableStringArray()])),
    quantity_notes: Type.Optional(nullableString()),
    return_24hrs: Type.Optional(nullableBoolean()),
    late_return: Type.Optional(nullableBoolean()),
    on_campus: Type.Optional(nullableBoolean()),
    must_clean: Type.Optional(nullableBoolean()),
    financially_responsible: Type.Optional(nullableBoolean()),
    policy_warning: Type.Optional(nullableBoolean()),
    food_equipment: Type.Optional(nullableBoolean()),
    status: Type.Optional(nullableString()),
    created_at: Type.Optional(nullableString()),
    updated_at: Type.Optional(nullableString()),
  },
  { $id: 'ResourceCheckouts', additionalProperties: false }
)
export type ResourceCheckouts = Static<typeof resourceCheckoutsSchema>
export const resourceCheckoutsValidator = getValidator(resourceCheckoutsSchema, dataValidator)
export const resourceCheckoutsResolver = resolve<ResourceCheckouts, HookContext<ResourceCheckoutsService>>({})
export const resourceCheckoutsExternalResolver = resolve<ResourceCheckouts, HookContext<ResourceCheckoutsService>>({})

// Schema for creating new entries
export const resourceCheckoutsDataSchema = Type.Partial(Type.Pick(
  resourceCheckoutsSchema,
  [
    'club', 'submitted_by', 'full_name', 'email', 'club_name',
    'leadership_position', 'other_position', 'event_title',
    'checkout_date', 'checkout_time', 'return_date', 'return_time',
    'requested_items', 'quantity_notes', 'return_24hrs', 'late_return',
    'on_campus', 'must_clean', 'financially_responsible', 'policy_warning', 'food_equipment',
  ],
  { $id: 'ResourceCheckoutsData' }
))
export type ResourceCheckoutsData = Static<typeof resourceCheckoutsDataSchema>
export const resourceCheckoutsDataValidator = getValidator(resourceCheckoutsDataSchema, dataValidator)
export const resourceCheckoutsDataResolver = resolve<ResourceCheckoutsData, HookContext<ResourceCheckoutsService>>({})

// Schema for updating existing entries
export const resourceCheckoutsPatchSchema = Type.Partial(resourceCheckoutsSchema, {
  $id: 'ResourceCheckoutsPatch'
})
export type ResourceCheckoutsPatch = Static<typeof resourceCheckoutsPatchSchema>
export const resourceCheckoutsPatchValidator = getValidator(resourceCheckoutsPatchSchema, dataValidator)
export const resourceCheckoutsPatchResolver = resolve<ResourceCheckoutsPatch, HookContext<ResourceCheckoutsService>>({})

// Schema for allowed query properties
export const resourceCheckoutsQueryProperties = Type.Pick(resourceCheckoutsSchema, [
  'id', 'club', 'submitted_by', 'status', 'created_at', 'updated_at'
])
export const resourceCheckoutsQuerySchema = Type.Intersect(
  [
    querySyntax(resourceCheckoutsQueryProperties),
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type ResourceCheckoutsQuery = Static<typeof resourceCheckoutsQuerySchema>
export const resourceCheckoutsQueryValidator = getValidator(resourceCheckoutsQuerySchema, queryValidator)
export const resourceCheckoutsQueryResolver = resolve<ResourceCheckoutsQuery, HookContext<ResourceCheckoutsService>>({})
