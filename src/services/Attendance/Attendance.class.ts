// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Attendance, AttendanceData, AttendancePatch, AttendanceQuery } from './Attendance.schema'

export type { Attendance, AttendanceData, AttendancePatch, AttendanceQuery }

export interface AttendanceParams extends KnexAdapterParams<AttendanceQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class AttendanceService<ServiceParams extends Params = AttendanceParams> extends KnexService<
  Attendance,
  AttendanceData,
  AttendanceParams,
  AttendancePatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'Attendance'
  }
}
