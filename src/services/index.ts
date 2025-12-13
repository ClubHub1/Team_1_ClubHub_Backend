import { club } from './Club/Club'
import { user } from './User/User'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(club)
  app.configure(user)
  // All services will be registered here
}
