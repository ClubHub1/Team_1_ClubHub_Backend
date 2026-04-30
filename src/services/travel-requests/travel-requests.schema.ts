// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
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
    text: Type.String()
  },
  { $id: 'TravelRequests', additionalProperties: false }
)
export type TravelRequests = Static<typeof travelRequestsSchema>
export const travelRequestsValidator = getValidator(travelRequestsSchema, dataValidator)
export const travelRequestsResolver = resolve<TravelRequestsQuery, HookContext<TravelRequestsService>>({})

export const travelRequestsExternalResolver = resolve<TravelRequests, HookContext<TravelRequestsService>>({})

// Schema for creating new entries
export const travelRequestsDataSchema = Type.Pick(travelRequestsSchema, ['text'], {
  $id: 'TravelRequestsData'
})
export type TravelRequestsData = Static<typeof travelRequestsDataSchema>
export const travelRequestsDataValidator = getValidator(travelRequestsDataSchema, dataValidator)
export const travelRequestsDataResolver = resolve<TravelRequestsData, HookContext<TravelRequestsService>>({})

// Schema for updating existing entries
export const travelRequestsPatchSchema = Type.Partial(travelRequestsSchema, {
  $id: 'TravelRequestsPatch'
})
export type TravelRequestsPatch = Static<typeof travelRequestsPatchSchema>
export const travelRequestsPatchValidator = getValidator(travelRequestsPatchSchema, dataValidator)
export const travelRequestsPatchResolver = resolve<TravelRequestsPatch, HookContext<TravelRequestsService>>(
  {}
)

// Schema for allowed query properties
export const travelRequestsQueryProperties = Type.Pick(travelRequestsSchema, ['id', 'text'])
export const travelRequestsQuerySchema = Type.Intersect(
  [
    querySyntax(travelRequestsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type TravelRequestsQuery = Static<typeof travelRequestsQuerySchema>
export const travelRequestsQueryValidator = getValidator(travelRequestsQuerySchema, queryValidator)
export const travelRequestsQueryResolver = resolve<TravelRequestsQuery, HookContext<TravelRequestsService>>(
  {}
)
