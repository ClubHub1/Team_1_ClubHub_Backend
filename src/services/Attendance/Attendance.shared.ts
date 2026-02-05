// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  Attendance,
  AttendanceData,
  AttendancePatch,
  AttendanceQuery,
  AttendanceService
} from './Attendance.class'

export type { Attendance, AttendanceData, AttendancePatch, AttendanceQuery }

export type AttendanceClientService = Pick<
  AttendanceService<Params<AttendanceQuery>>,
  (typeof attendanceMethods)[number]
>

export const attendancePath = 'Attendance'

export const attendanceMethods: Array<keyof AttendanceService> = ['find', 'get', 'create', 'patch', 'remove']

export const attendanceClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(attendancePath, connection.service(attendancePath), {
    methods: attendanceMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [attendancePath]: AttendanceClientService
  }
}
