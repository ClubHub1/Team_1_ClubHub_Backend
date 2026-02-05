// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import { feathers } from '@feathersjs/feathers'
import { type NextFunction } from '../declarations'
import { BadRequest } from '@feathersjs/errors';

import { HookContext } from '@feathersjs/feathers';

module.exports = (options = {}) => {
  return async (context: HookContext) => {
    const { data, app, method } = context;

    // Only run for create method
    if (method !== 'create') {
      return context;
    }

    // Check if an email is provided in the request data
    if (!data.email) {
      // You might want to handle this with a different validation hook/schema
      return context; 
    }
    const email = data.email

    // Use the user service to find existing users with the same email
    const userService = app.service('User'); // Replace 'users' with your actual service name
    const existingUsers = await userService.find({
      query: {
        email,
        $limit: 1 // Limit to one result for efficiency
      }
    });

    // If any user is found, throw a BadRequest error
    if (existingUsers.total > 0) {
      throw new BadRequest('An account with this email address already exists.');
    }

    // If no existing user, proceed with the creation
    return context;
  };
};