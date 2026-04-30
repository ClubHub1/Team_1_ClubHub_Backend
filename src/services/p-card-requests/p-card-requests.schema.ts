// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
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
    club: Type.Number(),
    submitted_by: Type.Number(),
    // Requestor info
    first_name: Type.Optional(Type.String()),
    last_name: Type.Optional(Type.String()),
    club_name: Type.Optional(Type.String()),
    // Yes/No questions
    packages_delivered: Type.Optional(Type.Boolean()),
    is_travel: Type.Optional(Type.Boolean()),
    is_gift: Type.Optional(Type.Boolean()),
    is_print: Type.Optional(Type.Boolean()),
    is_event: Type.Optional(Type.Boolean()),
    // Vendors & funding
    num_vendors: Type.Optional(Type.Number()),
    funding_sources: Type.Optional(Type.String()),
    transaction_detail: Type.Optional(Type.String()),
    asun_funding_info: Type.Optional(Type.String()),
    // Conditional sections
    prize_receipt_acknowledged: Type.Optional(Type.Boolean()),
    using_unr_logo: Type.Optional(Type.Boolean()),
    logo_description: Type.Optional(Type.String()),
    design_file_url: Type.Optional(Type.String()),
    print_release_number: Type.Optional(Type.String()),
    // Event info
    event_name: Type.Optional(Type.String()),
    event_location: Type.Optional(Type.String()),
    event_date: Type.Optional(Type.String()),
    event_timeframe: Type.Optional(Type.String()),
    num_attendees: Type.Optional(Type.Number()),
    attendee_names: Type.Optional(Type.String()),
    flyer_url: Type.Optional(Type.String()),
    // Vendor details
    vendors: Type.Optional(Type.String()),
    // Department funding
    department_account: Type.Optional(Type.String()),
    budget_approved: Type.Optional(Type.String()),
    public_meeting_date: Type.Optional(Type.String()),
    // Signatures
    email: Type.Optional(Type.String()),
    asun_employee_verified: Type.Optional(Type.Boolean()),
    officer_signature: Type.Optional(Type.Boolean()),
    faculty_signature: Type.Optional(Type.Boolean()),
    // Status & timestamps
    status: Type.Optional(Type.String()),
    created_at: Type.Optional(Type.String()),
    updated_at: Type.Optional(Type.String()),
  },
  { $id: 'PCardRequests', additionalProperties: false }
)
export type PCardRequests = Static<typeof pCardRequestsSchema>
export const pCardRequestsValidator = getValidator(pCardRequestsSchema, dataValidator)
export const pCardRequestsResolver = resolve<PCardRequests, HookContext<PCardRequestsService>>({})
export const pCardRequestsExternalResolver = resolve<PCardRequests, HookContext<PCardRequestsService>>({})

// Schema for creating new entries
export const pCardRequestsDataSchema = Type.Pick(
  pCardRequestsSchema,
  [
    'club', 'submitted_by', 'first_name', 'last_name', 'club_name',
    'packages_delivered', 'is_travel', 'is_gift', 'is_print', 'is_event',
    'num_vendors', 'funding_sources', 'transaction_detail', 'asun_funding_info',
    'prize_receipt_acknowledged', 'using_unr_logo', 'logo_description',
    'design_file_url', 'print_release_number', 'event_name', 'event_location',
    'event_date', 'event_timeframe', 'num_attendees', 'attendee_names', 'flyer_url',
    'vendors', 'department_account', 'budget_approved', 'public_meeting_date',
    'email', 'asun_employee_verified', 'officer_signature', 'faculty_signature',
  ],
  { $id: 'PCardRequestsData' }
)
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
export const pCardRequestsQueryProperties = Type.Pick(pCardRequestsSchema, [
  'id', 'club', 'submitted_by', 'status'
])
export const pCardRequestsQuerySchema = Type.Intersect(
  [
    querySyntax(pCardRequestsQueryProperties),
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type PCardRequestsQuery = Static<typeof pCardRequestsQuerySchema>
export const pCardRequestsQueryValidator = getValidator(pCardRequestsQuerySchema, queryValidator)
export const pCardRequestsQueryResolver = resolve<PCardRequestsQuery, HookContext<PCardRequestsService>>({})