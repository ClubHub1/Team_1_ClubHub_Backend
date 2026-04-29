// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
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
    text: Type.String()
  },
  { $id: 'ResourceCheckouts', additionalProperties: false }
)
export type ResourceCheckouts = Static<typeof resourceCheckoutsSchema>
export const resourceCheckoutsValidator = getValidator(resourceCheckoutsSchema, dataValidator)
export const resourceCheckoutsResolver = resolve<
  ResourceCheckoutsQuery,
  HookContext<ResourceCheckoutsService>
>({})

export const resourceCheckoutsExternalResolver = resolve<
  ResourceCheckouts,
  HookContext<ResourceCheckoutsService>
>({})

// Schema for creating new entries
export const resourceCheckoutsDataSchema = Type.Pick(resourceCheckoutsSchema, ['text'], {
  $id: 'ResourceCheckoutsData'
})
export type ResourceCheckoutsData = Static<typeof resourceCheckoutsDataSchema>
export const resourceCheckoutsDataValidator = getValidator(resourceCheckoutsDataSchema, dataValidator)
export const resourceCheckoutsDataResolver = resolve<
  ResourceCheckoutsData,
  HookContext<ResourceCheckoutsService>
>({})

// Schema for updating existing entries
export const resourceCheckoutsPatchSchema = Type.Partial(resourceCheckoutsSchema, {
  $id: 'ResourceCheckoutsPatch'
})
export type ResourceCheckoutsPatch = Static<typeof resourceCheckoutsPatchSchema>
export const resourceCheckoutsPatchValidator = getValidator(resourceCheckoutsPatchSchema, dataValidator)
export const resourceCheckoutsPatchResolver = resolve<
  ResourceCheckoutsPatch,
  HookContext<ResourceCheckoutsService>
>({})

// Schema for allowed query properties
export const resourceCheckoutsQueryProperties = Type.Pick(resourceCheckoutsSchema, ['id', 'text'])
export const resourceCheckoutsQuerySchema = Type.Intersect(
  [
    querySyntax(resourceCheckoutsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type ResourceCheckoutsQuery = Static<typeof resourceCheckoutsQuerySchema>
export const resourceCheckoutsQueryValidator = getValidator(resourceCheckoutsQuerySchema, queryValidator)
export const resourceCheckoutsQueryResolver = resolve<
  ResourceCheckoutsQuery,
  HookContext<ResourceCheckoutsService>
>({})
