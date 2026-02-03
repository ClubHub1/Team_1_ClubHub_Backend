// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { AttendanceService } from './Attendance.class'

// Main data model schema
export const attendanceSchema = Type.Object(
  {
    attendance_id: Type.Number(),
    event: Type.Integer(),
    user: Type.Integer()
  },
  { $id: 'Attendance', additionalProperties: true }
)
export type Attendance = Static<typeof attendanceSchema>
export const attendanceValidator = getValidator(attendanceSchema, dataValidator)
export const attendanceResolver = resolve<AttendanceQuery, HookContext<AttendanceService>>({})

export const attendanceExternalResolver = resolve<Attendance, HookContext<AttendanceService>>({})

// Schema for creating new entries
export const attendanceDataSchema = Type.Pick(attendanceSchema, ['event', 'user', ], {
  $id: 'AttendanceData'
})
export type AttendanceData = Static<typeof attendanceDataSchema>
export const attendanceDataValidator = getValidator(attendanceDataSchema, dataValidator)
export const attendanceDataResolver = resolve<AttendanceData, HookContext<AttendanceService>>({})

// Schema for updating existing entries
export const attendancePatchSchema = Type.Partial(attendanceSchema, {
  $id: 'AttendancePatch'
})
export type AttendancePatch = Static<typeof attendancePatchSchema>
export const attendancePatchValidator = getValidator(attendancePatchSchema, dataValidator)
export const attendancePatchResolver = resolve<AttendancePatch, HookContext<AttendanceService>>({})

// Schema for allowed query properties
export const attendanceQueryProperties = Type.Pick(attendanceSchema, ['event', 'user'])
export const attendanceQuerySchema = Type.Intersect(
  [
    querySyntax(attendanceQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type AttendanceQuery = Static<typeof attendanceQuerySchema>
export const attendanceQueryValidator = getValidator(attendanceQuerySchema, queryValidator)
export const attendanceQueryResolver = resolve<AttendanceQuery, HookContext<AttendanceService>>({})
