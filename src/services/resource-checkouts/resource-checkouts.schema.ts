// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { ResourceCheckoutsService } from './resource-checkouts.class'

// Main data model schema
export const resourceCheckoutsSchema = Type.Object(
  {
    id: Type.Number(),
    club: Type.Number(),
    submitted_by: Type.Number(),
    full_name: Type.Optional(Type.String()),
    email: Type.Optional(Type.String()),
    club_name: Type.Optional(Type.String()),
    leadership_position: Type.Optional(Type.String()),
    other_position: Type.Optional(Type.String()),
    event_title: Type.Optional(Type.String()),
    checkout_date: Type.Optional(Type.String()),
    checkout_time: Type.Optional(Type.String()),
    return_date: Type.Optional(Type.String()),
    return_time: Type.Optional(Type.String()),
    requested_items: Type.Optional(Type.String()),
    quantity_notes: Type.Optional(Type.String()),
    return_24hrs: Type.Optional(Type.Boolean()),
    late_return: Type.Optional(Type.Boolean()),
    on_campus: Type.Optional(Type.Boolean()),
    must_clean: Type.Optional(Type.Boolean()),
    financially_responsible: Type.Optional(Type.Boolean()),
    policy_warning: Type.Optional(Type.Boolean()),
    food_equipment: Type.Optional(Type.Boolean()),
    status: Type.Optional(Type.String()),
    created_at: Type.Optional(Type.String()),
    updated_at: Type.Optional(Type.String()),
  },
  { $id: 'ResourceCheckouts', additionalProperties: false }
)
export type ResourceCheckouts = Static<typeof resourceCheckoutsSchema>
export const resourceCheckoutsValidator = getValidator(resourceCheckoutsSchema, dataValidator)
export const resourceCheckoutsResolver = resolve<ResourceCheckouts, HookContext<ResourceCheckoutsService>>({})
export const resourceCheckoutsExternalResolver = resolve<ResourceCheckouts, HookContext<ResourceCheckoutsService>>({})

// Schema for creating new entries
export const resourceCheckoutsDataSchema = Type.Pick(
  resourceCheckoutsSchema,
  [
    'club', 'submitted_by', 'full_name', 'email', 'club_name',
    'leadership_position', 'other_position', 'event_title',
    'checkout_date', 'checkout_time', 'return_date', 'return_time',
    'requested_items', 'quantity_notes', 'return_24hrs', 'late_return',
    'on_campus', 'must_clean', 'financially_responsible', 'policy_warning', 'food_equipment',
  ],
  { $id: 'ResourceCheckoutsData' }
)
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
  'id', 'club', 'submitted_by', 'status'
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