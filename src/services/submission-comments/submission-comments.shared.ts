// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  SubmissionComments,
  SubmissionCommentsData,
  SubmissionCommentsPatch,
  SubmissionCommentsQuery,
  SubmissionCommentsService
} from './submission-comments.class'

export type { SubmissionComments, SubmissionCommentsData, SubmissionCommentsPatch, SubmissionCommentsQuery }

export type SubmissionCommentsClientService = Pick<
  SubmissionCommentsService<Params<SubmissionCommentsQuery>>,
  (typeof submissionCommentsMethods)[number]
>

export const submissionCommentsPath = 'submission-comments'

export const submissionCommentsMethods: Array<keyof SubmissionCommentsService> = [
  'find',
  'get',
  'create',
  'patch',
  'remove'
]

export const submissionCommentsClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(submissionCommentsPath, connection.service(submissionCommentsPath), {
    methods: submissionCommentsMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [submissionCommentsPath]: SubmissionCommentsClientService
  }
}
