import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  // Rename id column to club_id and ensure all columns exist
  await knex.schema.alterTable('club', table => {
    table.renameColumn('id', 'club_id')
  })
}


export async function down(knex: Knex): Promise<void> {
  // Rename club_id back to id
  await knex.schema.alterTable('club', table => {
    table.renameColumn('club_id', 'id')
  })
}

