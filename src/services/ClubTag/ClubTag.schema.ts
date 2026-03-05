import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'
import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { ClubTagService } from './ClubTag.class'

export const clubTagSchema = Type.Object(
  { tag_id: Type.Number(), club: Type.Number(), tag: Type.String() },
  { $id: 'ClubTag', additionalProperties: false }
)
export type ClubTag = Static<typeof clubTagSchema>
export const clubTagValidator = getValidator(clubTagSchema, dataValidator)
export const clubTagResolver = resolve<ClubTag, HookContext<ClubTagService>>({})
export const clubTagExternalResolver = resolve<ClubTag, HookContext<ClubTagService>>({})

export const clubTagDataSchema = Type.Pick(clubTagSchema, ['club','tag'], { $id: 'ClubTagData' })
export type ClubTagData = Static<typeof clubTagDataSchema>
export const clubTagDataValidator = getValidator(clubTagDataSchema, dataValidator)
export const clubTagDataResolver = resolve<ClubTag, HookContext<ClubTagService>>({})

export const clubTagPatchSchema = Type.Partial(clubTagSchema, { $id: 'ClubTagPatch' })
export type ClubTagPatch = Static<typeof clubTagPatchSchema>
export const clubTagPatchValidator = getValidator(clubTagPatchSchema, dataValidator)
export const clubTagPatchResolver = resolve<ClubTag, HookContext<ClubTagService>>({})

export const clubTagQueryProperties = Type.Pick(clubTagSchema, ['tag_id','club','tag'])
export const clubTagQuerySchema = Type.Intersect(
  [querySyntax(clubTagQueryProperties), Type.Object({}, { additionalProperties: false })],
  { additionalProperties: false }
)
export type ClubTagQuery = Static<typeof clubTagQuerySchema>
export const clubTagQueryValidator = getValidator(clubTagQuerySchema, queryValidator)
export const clubTagQueryResolver = resolve<ClubTagQuery, HookContext<ClubTagService>>({})
