// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { TravelRequestsService } from './travel-requests.class'

const nullableString = () => Type.Union([Type.String(), Type.Null()])
const nullableNumber = () => Type.Union([Type.Number(), Type.Null()])
const nullableBoolean = () => Type.Union([Type.Boolean(), Type.Null()])

// Main data model schema
export const travelRequestsSchema = Type.Object(
  {
    id: Type.Number(),
    club: nullableNumber(),
    submitted_by: nullableNumber(),
    destination: Type.Optional(nullableString()),
    departure_date: Type.Optional(nullableString()),
    return_date: Type.Optional(nullableString()),
    purpose: Type.Optional(nullableString()),
    estimated_cost: Type.Optional(nullableNumber()),
    num_travelers: Type.Optional(nullableNumber()),
    traveler_names: Type.Optional(nullableString()),
    transportation_type: Type.Optional(nullableString()),
    lodging_required: Type.Optional(nullableBoolean()),
    lodging_details: Type.Optional(nullableString()),
    notes: Type.Optional(nullableString()),
    status: Type.Optional(nullableString()),
    created_at: Type.Optional(nullableString()),
    updated_at: Type.Optional(nullableString()),
  },
  { $id: 'TravelRequests', additionalProperties: false }
)
export type TravelRequests = Static<typeof travelRequestsSchema>
export const travelRequestsValidator = getValidator(travelRequestsSchema, dataValidator)
export const travelRequestsResolver = resolve<TravelRequests, HookContext<TravelRequestsService>>({})
export const travelRequestsExternalResolver = resolve<TravelRequests, HookContext<TravelRequestsService>>({})

// Schema for creating new entries
export const travelRequestsDataSchema = Type.Partial(Type.Pick(
  travelRequestsSchema,
  [
    'club', 'submitted_by', 'destination', 'departure_date', 'return_date',
    'purpose', 'estimated_cost', 'num_travelers', 'traveler_names',
    'transportation_type', 'lodging_required', 'lodging_details', 'notes',
  ],
  { $id: 'TravelRequestsData' }
))
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
  'id', 'club', 'submitted_by', 'status', 'created_at', 'updated_at'
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
