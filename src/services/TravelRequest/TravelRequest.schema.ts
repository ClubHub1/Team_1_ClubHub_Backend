import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'
import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { TravelRequestService } from './TravelRequest.class'

export const travelRequestSchema = Type.Object(
  {
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
    updated_at: Type.Optional(Type.String())
  },
  { $id: 'TravelRequest', additionalProperties: false }
)
export type TravelRequest = Static<typeof travelRequestSchema>
export const travelRequestValidator = getValidator(travelRequestSchema, dataValidator)
export const travelRequestResolver = resolve<TravelRequest, HookContext<TravelRequestService>>({})
export const travelRequestExternalResolver = resolve<TravelRequest, HookContext<TravelRequestService>>({})

export const travelRequestDataSchema = Type.Pick(
  travelRequestSchema,
  ['club','requested_by','destination','purpose','departure_date','return_date','num_travelers','estimated_cost','transportation','lodging','notes'],
  { $id: 'TravelRequestData' }
)
export type TravelRequestData = Static<typeof travelRequestDataSchema>
export const travelRequestDataValidator = getValidator(travelRequestDataSchema, dataValidator)
export const travelRequestDataResolver = resolve<TravelRequest, HookContext<TravelRequestService>>({})

export const travelRequestPatchSchema = Type.Partial(travelRequestSchema, { $id: 'TravelRequestPatch' })
export type TravelRequestPatch = Static<typeof travelRequestPatchSchema>
export const travelRequestPatchValidator = getValidator(travelRequestPatchSchema, dataValidator)
export const travelRequestPatchResolver = resolve<TravelRequest, HookContext<TravelRequestService>>({})

export const travelRequestQueryProperties = Type.Pick(travelRequestSchema, ['travel_id','club','requested_by','status'])
export const travelRequestQuerySchema = Type.Intersect(
  [querySyntax(travelRequestQueryProperties), Type.Object({}, { additionalProperties: false })],
  { additionalProperties: false }
)
export type TravelRequestQuery = Static<typeof travelRequestQuerySchema>
export const travelRequestQueryValidator = getValidator(travelRequestQuerySchema, queryValidator)
export const travelRequestQueryResolver = resolve<TravelRequestQuery, HookContext<TravelRequestService>>({})
