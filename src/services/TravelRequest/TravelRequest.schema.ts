import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'
import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { TravelRequestService } from './TravelRequest.class'

export const travelRequestSchema = Type.Object(
  {
    // ── Original fields ──────────────────────────────────────
    travel_id: Type.Number(),
    club: Type.Number(),
    requested_by: Type.Number(),
    destination: Type.String(),
    purpose: Type.String(),
    departure_date: Type.String(),
    return_date: Type.String(),
    num_travelers: Type.Number(),
    estimated_cost: Type.Number(),
    transportation: Type.Optional(Type.String()),
    lodging: Type.Optional(Type.String()),
    notes: Type.Optional(Type.String()),
    status: Type.String(),
    created_at: Type.Optional(Type.String()),
    updated_at: Type.Optional(Type.String()),

    // ── Step 1: Basic Info ───────────────────────────────────
    club_name: Type.Optional(Type.String()),
    full_name: Type.Optional(Type.String()),
    email: Type.Optional(Type.String()),
    travel_budget_url: Type.Optional(Type.String()),

    // ── Step 2: Trip Details ─────────────────────────────────
    transportation_funding: Type.Optional(Type.String()),
    business_purpose: Type.Optional(Type.String()),
    departure_time: Type.Optional(Type.String()),
    return_time: Type.Optional(Type.String()),
    has_registration: Type.Optional(Type.String()),
    conference_registration_url: Type.Optional(Type.String()),
    registration_cost: Type.Optional(Type.Number()),
    registration_funding: Type.Optional(Type.String()),
    agenda_url: Type.Optional(Type.String()),
    nightly_rate: Type.Optional(Type.Number()),
    lodging_funding: Type.Optional(Type.String()),
    lodging_screenshot_url: Type.Optional(Type.String()),
    lodging_total_cost: Type.Optional(Type.Number()),

    // ── Step 3: Group Travel ─────────────────────────────────
    travel_roster_url: Type.Optional(Type.String()),
    business_travel_form_url: Type.Optional(Type.String()),

    // ── Step 4: Acknowledgement ──────────────────────────────
    acknowledged: Type.Optional(Type.Boolean()),
  },
  { $id: 'TravelRequest', additionalProperties: false }
)
export type TravelRequest = Static<typeof travelRequestSchema>
export const travelRequestValidator = getValidator(travelRequestSchema, dataValidator)
export const travelRequestResolver = resolve<TravelRequest, HookContext<TravelRequestService>>({})
export const travelRequestExternalResolver = resolve<TravelRequest, HookContext<TravelRequestService>>({})

export const travelRequestDataSchema = Type.Pick(
  travelRequestSchema,
  [
    // Original
    'club', 'requested_by', 'destination', 'purpose',
    'departure_date', 'return_date', 'num_travelers', 'estimated_cost',
    'transportation', 'lodging', 'notes',
    // Step 1
    'club_name', 'full_name', 'email', 'travel_budget_url',
    // Step 2
    'transportation_funding', 'business_purpose',
    'departure_time', 'return_time',
    'has_registration', 'conference_registration_url',
    'registration_cost', 'registration_funding',
    'agenda_url', 'nightly_rate', 'lodging_funding',
    'lodging_screenshot_url', 'lodging_total_cost',
    // Step 3
    'travel_roster_url', 'business_travel_form_url',
    // Step 4
    'acknowledged',
  ],
  { $id: 'TravelRequestData' }
)
export type TravelRequestData = Static<typeof travelRequestDataSchema>
export const travelRequestDataValidator = getValidator(travelRequestDataSchema, dataValidator)
export const travelRequestDataResolver = resolve<TravelRequest, HookContext<TravelRequestService>>({})

export const travelRequestPatchSchema = Type.Partial(travelRequestSchema, { $id: 'TravelRequestPatch' })
export type TravelRequestPatch = Static<typeof travelRequestPatchSchema>
export const travelRequestPatchValidator = getValidator(travelRequestPatchSchema, dataValidator)
export const travelRequestPatchResolver = resolve<TravelRequest, HookContext<TravelRequestService>>({})

export const travelRequestQueryProperties = Type.Pick(travelRequestSchema, ['travel_id', 'club', 'requested_by', 'status'])
export const travelRequestQuerySchema = Type.Intersect(
  [querySyntax(travelRequestQueryProperties), Type.Object({}, { additionalProperties: false })],
  { additionalProperties: false }
)
export type TravelRequestQuery = Static<typeof travelRequestQuerySchema>
export const travelRequestQueryValidator = getValidator(travelRequestQuerySchema, queryValidator)
export const travelRequestQueryResolver = resolve<TravelRequestQuery, HookContext<TravelRequestService>>({})
