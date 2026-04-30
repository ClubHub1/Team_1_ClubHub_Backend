// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { TravelRequestsService } from './travel-requests.class'

// Main data model schema
export const travelRequestsSchema = Type.Object(
  {
    id: Type.Number(),
    club: Type.Number(),
    submitted_by: Type.Number(),
    destination: Type.Optional(Type.String()),
    departure_date: Type.Optional(Type.String()),
    return_date: Type.Optional(Type.String()),
    purpose: Type.Optional(Type.String()),
    estimated_cost: Type.Optional(Type.Number()),
    num_travelers: Type.Optional(Type.Number()),
    traveler_names: Type.Optional(Type.String()),
    transportation_type: Type.Optional(Type.String()),
    lodging_required: Type.Optional(Type.Boolean()),
    lodging_details: Type.Optional(Type.String()),
    notes: Type.Optional(Type.String()),
    status: Type.Optional(Type.String()),
    created_at: Type.Optional(Type.String()),
    updated_at: Type.Optional(Type.String()),
  },
  { $id: 'TravelRequests', additionalProperties: false }
)
export type TravelRequests = Static<typeof travelRequestsSchema>
export const travelRequestsValidator = getValidator(travelRequestsSchema, dataValidator)
export const travelRequestsResolver = resolve<TravelRequests, HookContext<TravelRequestsService>>({})
export const travelRequestsExternalResolver = resolve<TravelRequests, HookContext<TravelRequestsService>>({})

// Schema for creating new entries
export const travelRequestsDataSchema = Type.Pick(
  travelRequestsSchema,
  [
    'club', 'submitted_by', 'destination', 'departure_date', 'return_date',
    'purpose', 'estimated_cost', 'num_travelers', 'traveler_names',
    'transportation_type', 'lodging_required', 'lodging_details', 'notes',
  ],
  { $id: 'TravelRequestsData' }
)
export type TravelRequestsData = Static<typeof travelRequestsDataSchema>
export const travelRequestsDataValidator = getValidator(travelRequestsDataSchema, dataValidator)
export const travelRequestsDataResolver = resolve<TravelRequestsData, HookContext<TravelRequestsService>>({})

// Schema for updating existing entries
export const travelRequestsPatchSchema = Type.Partial(travelRequestsSchema, {
  $id: 'TravelRequestsPatch'
})
export type TravelRequestsPatch = Static<typeof travelRequestsPatchSchema>
export const travelRequestsPatchValidator = getValidator(travelRequestsPatchSchema, dataValidator)
export const travelRequestsPatchResolver = resolve<TravelRequestsPatch, HookContext<TravelRequestsService>>({})

// Schema for allowed query properties
export const travelRequestsQueryProperties = Type.Pick(travelRequestsSchema, [
  'id', 'club', 'submitted_by', 'status'
])
export const travelRequestsQuerySchema = Type.Intersect(
  [
    querySyntax(travelRequestsQueryProperties),
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type TravelRequestsQuery = Static<typeof travelRequestsQuerySchema>
export const travelRequestsQueryValidator = getValidator(travelRequestsQuerySchema, queryValidator)
export const travelRequestsQueryResolver = resolve<TravelRequestsQuery, HookContext<TravelRequestsService>>({})