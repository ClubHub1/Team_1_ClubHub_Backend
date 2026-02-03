// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import type { TransportConnection, Application } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'

import { attendanceClient } from './services/Attendance/Attendance.shared'
export type {
  Attendance,
  AttendanceData,
  AttendanceQuery,
  AttendancePatch
} from './services/Attendance/Attendance.shared'

import { taskClient } from './services/Task/Task.shared'
export type { Task, TaskData, TaskQuery, TaskPatch } from './services/Task/Task.shared'

import { eventClient } from './services/Event/Event.shared'
export type { Event, EventData, EventQuery, EventPatch } from './services/Event/Event.shared'

import { clubClient } from './services/Club/Club.shared'
export type { Club, ClubData, ClubQuery, ClubPatch } from './services/Club/Club.shared'

import { userClient } from './services/User/User.shared'
export type { User, UserData, UserQuery, UserPatch } from './services/User/User.shared'

export interface Configuration {
  connection: TransportConnection<ServiceTypes>
}

export interface ServiceTypes {}

export type ClientApplication = Application<ServiceTypes, Configuration>

/**
 * Returns a typed client for the CHBackend app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = <Configuration = any,>(
  connection: TransportConnection<ServiceTypes>,
  authenticationOptions: Partial<AuthenticationClientOptions> = {}
) => {
  const client: ClientApplication = feathers()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))
  client.set('connection', connection)

  client.configure(userClient)
  client.configure(clubClient)
  client.configure(eventClient)
  client.configure(taskClient)
  client.configure(attendanceClient)
  return client
}
