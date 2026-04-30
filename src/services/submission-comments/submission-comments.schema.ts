// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { SubmissionCommentsService } from './submission-comments.class'

const nullableString = () => Type.Union([Type.String(), Type.Null()])
const nullableNumber = () => Type.Union([Type.Number(), Type.Null()])
const nullableBoolean = () => Type.Union([Type.Boolean(), Type.Null()])

// Main data model schema
export const submissionCommentsSchema = Type.Object(
  {
    id: Type.Number(),
    submission_id: nullableNumber(),
    form_type: nullableString(),
    author: Type.Optional(nullableString()),
    author_id: Type.Optional(nullableNumber()),
    is_admin: Type.Optional(nullableBoolean()),
    text: nullableString(),
    created_at: Type.Optional(nullableString()),
  },
  { $id: 'SubmissionComments', additionalProperties: false }
)
export type SubmissionComments = Static<typeof submissionCommentsSchema>
export const submissionCommentsValidator = getValidator(submissionCommentsSchema, dataValidator)
export const submissionCommentsResolver = resolve<SubmissionComments, HookContext<SubmissionCommentsService>>({})
export const submissionCommentsExternalResolver = resolve<SubmissionComments, HookContext<SubmissionCommentsService>>({})

// Schema for creating new entries
export const submissionCommentsDataSchema = Type.Partial(Type.Pick(
  submissionCommentsSchema,
  ['submission_id', 'form_type', 'author', 'author_id', 'is_admin', 'text'],
  { $id: 'SubmissionCommentsData' }
))
export type SubmissionCommentsData = Static<typeof submissionCommentsDataSchema>
export const submissionCommentsDataValidator = getValidator(submissionCommentsDataSchema, dataValidator)
export const submissionCommentsDataResolver = resolve<SubmissionCommentsData, HookContext<SubmissionCommentsService>>({})

// Schema for updating existing entries
export const submissionCommentsPatchSchema = Type.Partial(submissionCommentsSchema, {
  $id: 'SubmissionCommentsPatch'
})
export type SubmissionCommentsPatch = Static<typeof submissionCommentsPatchSchema>
export const submissionCommentsPatchValidator = getValidator(submissionCommentsPatchSchema, dataValidator)
export const submissionCommentsPatchResolver = resolve<SubmissionCommentsPatch, HookContext<SubmissionCommentsService>>({})

// Schema for allowed query properties
export const submissionCommentsQueryProperties = Type.Pick(submissionCommentsSchema, [
  'id', 'submission_id', 'form_type', 'author_id'
])
export const submissionCommentsQuerySchema = Type.Intersect(
  [
    querySyntax(submissionCommentsQueryProperties),
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type SubmissionCommentsQuery = Static<typeof submissionCommentsQuerySchema>
export const submissionCommentsQueryValidator = getValidator(submissionCommentsQuerySchema, queryValidator)
export const submissionCommentsQueryResolver = resolve<SubmissionCommentsQuery, HookContext<SubmissionCommentsService>>({})
