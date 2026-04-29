import { submissionComments } from './submission-comments/submission-comments'
import { resourceCheckouts } from './resource-checkouts/resource-checkouts'
import { travelRequests } from './travel-requests/travel-requests'
import { pCardRequests } from './p-card-requests/p-card-requests'
import { fileResource } from './File Resource/File Resource'
import { taskAssignment } from './Task Assignment/Task Assignment'
import { notifications } from './Notifications/Notifications'
import { clubMembership } from './Club Membership/Club Membership'
import { attendance } from './Attendance/Attendance'
import { task } from './Task/Task'
import { event } from './Event/Event'
import { club } from './Club/Club'
import { user } from './User/User'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(submissionComments)
  app.configure(resourceCheckouts)
  app.configure(travelRequests)
  app.configure(pCardRequests)
  app.configure(fileResource)
  app.configure(taskAssignment)
  app.configure(notifications)
  app.configure(clubMembership)
  app.configure(attendance)
  app.configure(task)
  app.configure(event)
  app.configure(club)
  app.configure(user)
  // All services will be registered here
}
