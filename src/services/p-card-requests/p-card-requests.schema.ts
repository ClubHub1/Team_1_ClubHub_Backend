// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { PCardRequestsService } from './p-card-requests.class'

// Main data model schema
export const pCardRequestsSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'PCardRequests', additionalProperties: false }
)
export type PCardRequests = Static<typeof pCardRequestsSchema>
export const pCardRequestsValidator = getValidator(pCardRequestsSchema, dataValidator)
export const pCardRequestsResolver = resolve<PCardRequestsQuery, HookContext<PCardRequestsService>>({})

export const pCardRequestsExternalResolver = resolve<PCardRequests, HookContext<PCardRequestsService>>({})

// Schema for creating new entries
export const pCardRequestsDataSchema = Type.Pick(pCardRequestsSchema, ['text'], {
  $id: 'PCardRequestsData'
})
export type PCardRequestsData = Static<typeof pCardRequestsDataSchema>
export const pCardRequestsDataValidator = getValidator(pCardRequestsDataSchema, dataValidator)
export const pCardRequestsDataResolver = resolve<PCardRequestsData, HookContext<PCardRequestsService>>({})

// Schema for updating existing entries
export const pCardRequestsPatchSchema = Type.Partial(pCardRequestsSchema, {
  $id: 'PCardRequestsPatch'
})
export type PCardRequestsPatch = Static<typeof pCardRequestsPatchSchema>
export const pCardRequestsPatchValidator = getValidator(pCardRequestsPatchSchema, dataValidator)
export const pCardRequestsPatchResolver = resolve<PCardRequestsPatch, HookContext<PCardRequestsService>>({})

// Schema for allowed query properties
export const pCardRequestsQueryProperties = Type.Pick(pCardRequestsSchema, ['id', 'text'])
export const pCardRequestsQuerySchema = Type.Intersect(
  [
    querySyntax(pCardRequestsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type PCardRequestsQuery = Static<typeof pCardRequestsQuerySchema>
export const pCardRequestsQueryValidator = getValidator(pCardRequestsQuerySchema, queryValidator)
export const pCardRequestsQueryResolver = resolve<PCardRequestsQuery, HookContext<PCardRequestsService>>({})
