// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('club', table => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.text('description')
    table.string('activity_status').notNullable()
    table.string('logo_url').nullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('club')
}
