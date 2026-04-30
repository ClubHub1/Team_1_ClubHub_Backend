// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { PCardRequestsService } from './p-card-requests.class'

const nullableString = () => Type.Union([Type.String(), Type.Null()])
const nullableNumber = () => Type.Union([Type.Number(), Type.Null()])
const nullableBoolean = () => Type.Union([Type.Boolean(), Type.Null()])
const vendorSchema = Type.Object(
  {
    receipt_url: nullableString(),
    vendor_name: nullableString(),
    approximate_amount: nullableNumber(),
    items_to_purchase: nullableString(),
    reason_for_purchase: nullableString()
  },
  { additionalProperties: false }
)

// Main data model schema
export const pCardRequestsSchema = Type.Object(
  {
    id: Type.Number(),
    club: nullableNumber(),
    submitted_by: nullableNumber(),
    // Requestor info
    first_name: Type.Optional(nullableString()),
    last_name: Type.Optional(nullableString()),
    club_name: Type.Optional(nullableString()),
    // Yes/No questions
    packages_delivered: Type.Optional(nullableBoolean()),
    is_travel: Type.Optional(nullableBoolean()),
    is_gift: Type.Optional(nullableBoolean()),
    is_print: Type.Optional(nullableBoolean()),
    is_event: Type.Optional(nullableBoolean()),
    // Vendors & funding
    num_vendors: Type.Optional(nullableNumber()),
    funding_sources: Type.Optional(nullableString()),
    transaction_detail: Type.Optional(nullableString()),
    asun_funding_info: Type.Optional(nullableString()),
    // Conditional sections
    prize_receipt_acknowledged: Type.Optional(nullableBoolean()),
    using_unr_logo: Type.Optional(nullableBoolean()),
    logo_description: Type.Optional(nullableString()),
    design_file_url: Type.Optional(nullableString()),
    print_release_number: Type.Optional(nullableString()),
    // Event info
    event_name: Type.Optional(nullableString()),
    event_location: Type.Optional(nullableString()),
    event_date: Type.Optional(nullableString()),
    event_timeframe: Type.Optional(nullableString()),
    num_attendees: Type.Optional(nullableNumber()),
    attendee_names: Type.Optional(nullableString()),
    flyer_url: Type.Optional(nullableString()),
    // Vendor details
    vendors: Type.Optional(Type.Union([Type.Array(vendorSchema), Type.Null()])),
    // Department funding
    department_account: Type.Optional(nullableString()),
    budget_approved: Type.Optional(nullableString()),
    public_meeting_date: Type.Optional(nullableString()),
    // Signatures
    email: Type.Optional(nullableString()),
    asun_employee_verified: Type.Optional(nullableBoolean()),
    officer_signature: Type.Optional(nullableBoolean()),
    faculty_signature: Type.Optional(nullableBoolean()),
    // Status & timestamps
    status: Type.Optional(nullableString()),
    created_at: Type.Optional(nullableString()),
    updated_at: Type.Optional(nullableString()),
  },
  { $id: 'PCardRequests', additionalProperties: false }
)
export type PCardRequests = Static<typeof pCardRequestsSchema>
export const pCardRequestsValidator = getValidator(pCardRequestsSchema, dataValidator)
export const pCardRequestsResolver = resolve<PCardRequests, HookContext<PCardRequestsService>>({})
export const pCardRequestsExternalResolver = resolve<PCardRequests, HookContext<PCardRequestsService>>({})

// Schema for creating new entries
export const pCardRequestsDataSchema = Type.Partial(Type.Pick(
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
))
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
  'id', 'club', 'submitted_by', 'status', 'created_at', 'updated_at'
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
