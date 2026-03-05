import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'
import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { PCardRequestService } from './PCardRequest.class'

export const pCardRequestSchema = Type.Object(
  {
    request_id: Type.Number(),
    club: Type.Number(),
    requested_by: Type.Number(),
    vendor_name: Type.String(),
    purchase_date: Type.String(),
    amount: Type.Number(),
    category: Type.String(),
    description: Type.Optional(Type.String()),
    receipt_url: Type.Optional(Type.String()),
    status: Type.String(),
    created_at: Type.Optional(Type.String()),
    updated_at: Type.Optional(Type.String())
  },
  { $id: 'PCardRequest', additionalProperties: false }
)
export type PCardRequest = Static<typeof pCardRequestSchema>
export const pCardRequestValidator = getValidator(pCardRequestSchema, dataValidator)
export const pCardRequestResolver = resolve<PCardRequest, HookContext<PCardRequestService>>({})
export const pCardRequestExternalResolver = resolve<PCardRequest, HookContext<PCardRequestService>>({})

export const pCardRequestDataSchema = Type.Pick(
  pCardRequestSchema,
  ['club','requested_by','vendor_name','purchase_date','amount','category','description','receipt_url'],
  { $id: 'PCardRequestData' }
)
export type PCardRequestData = Static<typeof pCardRequestDataSchema>
export const pCardRequestDataValidator = getValidator(pCardRequestDataSchema, dataValidator)
export const pCardRequestDataResolver = resolve<PCardRequest, HookContext<PCardRequestService>>({})

export const pCardRequestPatchSchema = Type.Partial(pCardRequestSchema, { $id: 'PCardRequestPatch' })
export type PCardRequestPatch = Static<typeof pCardRequestPatchSchema>
export const pCardRequestPatchValidator = getValidator(pCardRequestPatchSchema, dataValidator)
export const pCardRequestPatchResolver = resolve<PCardRequest, HookContext<PCardRequestService>>({})

export const pCardRequestQueryProperties = Type.Pick(pCardRequestSchema, ['request_id','club','requested_by','status'])
export const pCardRequestQuerySchema = Type.Intersect(
  [querySyntax(pCardRequestQueryProperties), Type.Object({}, { additionalProperties: false })],
  { additionalProperties: false }
)
export type PCardRequestQuery = Static<typeof pCardRequestQuerySchema>
export const pCardRequestQueryValidator = getValidator(pCardRequestQuerySchema, queryValidator)
export const pCardRequestQueryResolver = resolve<PCardRequestQuery, HookContext<PCardRequestService>>({})
