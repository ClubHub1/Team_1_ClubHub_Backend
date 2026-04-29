// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('file-resource', table => {
    table.increments('id')
    table.integer('club').unsigned().nullable()
    table.integer('event').unsigned().nullable()
    table.string('source_url')
    table.string('file_name')
    table.string('file_size')
    table.string('mime_type')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.foreign('club').references('id').inTable('club').onDelete('SET NULL')
    table.foreign('event').references('id').inTable('event').onDelete('SET NULL')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('file-resource')
}
