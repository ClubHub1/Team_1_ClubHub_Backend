// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { EventService } from './Event.class'

// Main data model schema
export const eventSchema = Type.Object(
  {
    event_id: Type.Number(),
    club: Type.String(),
    name: Type.String(),
    description: Type.String(),
    start_datetime: Type.Optional(Type.String()),
    end_datetime: Type.Optional(Type.String()),
    location: Type.String(),
    created_at: Type.String()
  },
  { $id: 'Event', additionalProperties: true }
)
export type Event = Static<typeof eventSchema>
export const eventValidator = getValidator(eventSchema, dataValidator)
export const eventResolver = resolve<EventQuery, HookContext<EventService>>({})

export const eventExternalResolver = resolve<Event, HookContext<EventService>>({})

// Schema for creating new entries
export const eventDataSchema = Type.Pick(eventSchema, ['club', 'name', 'description', 'start_datetime', 'end_datetime', 'location', 'created_at'], {
  $id: 'EventData'
})
export type EventData = Static<typeof eventDataSchema>
export const eventDataValidator = getValidator(eventDataSchema, dataValidator)
export const eventDataResolver = resolve<EventData, HookContext<EventService>>({})

// Schema for updating existing entries
export const eventPatchSchema = Type.Partial(eventSchema, {
  $id: 'EventPatch'
})
export type EventPatch = Static<typeof eventPatchSchema>
export const eventPatchValidator = getValidator(eventPatchSchema, dataValidator)
export const eventPatchResolver = resolve<EventPatch, HookContext<EventService>>({})

// Schema for allowed query properties
export const eventQueryProperties = Type.Pick(eventSchema, ['event_id', 'name'])
export const eventQuerySchema = Type.Intersect(
  [
    querySyntax(eventQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type EventQuery = Static<typeof eventQuerySchema>
export const eventQueryValidator = getValidator(eventQuerySchema, queryValidator)
export const eventQueryResolver = resolve<EventQuery, HookContext<EventService>>({})
