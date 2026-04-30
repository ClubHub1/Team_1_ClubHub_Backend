/**
 * Migration: create_new_tables
 * Creates tables for:
 * - transactions
 * - p_card_requests
 * - travel_requests
 * - resource_checkouts
 * - submission_comments
 */

import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  // ── Transactions ──────────────────────────────────────────────
  const hasTransactions = await knex.schema.hasTable('transactions')
  if (!hasTransactions) {
    await knex.schema.createTable('transactions', (table: Knex.TableBuilder) => {
      table.increments('id').primary()
      table.integer('club').references('club_id').inTable('club').onDelete('CASCADE')
      table.integer('created_by').references('id').inTable('user')
      table.integer('submitted_by').references('id').inTable('user')
      table.string('type', 10).notNullable().checkIn(['income', 'expense'])
      table.string('title', 255).notNullable()
      table.decimal('amount', 10, 2).notNullable()
      table.text('description')
      table.date('transaction_date').defaultTo(knex.fn.now())
      table.string('category', 50).notNullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now())
    })
    console.log('Created table: transactions')
  }

  // ── P-Card Requests ───────────────────────────────────────────
  const hasPCard = await knex.schema.hasTable('p_card_requests')
  if (!hasPCard) {
    await knex.schema.createTable('p_card_requests', (table: Knex.TableBuilder) => {
      table.increments('id').primary()
      table.integer('club').references('club_id').inTable('club').onDelete('CASCADE')
      table.integer('submitted_by').references('id').inTable('user')
      // Requestor info
      table.string('first_name', 100)
      table.string('last_name', 100)
      table.string('club_name', 255)
      // Yes/No questions
      table.boolean('packages_delivered').defaultTo(false)
      table.boolean('is_travel').defaultTo(false)
      table.boolean('is_gift').defaultTo(false)
      table.boolean('is_print').defaultTo(false)
      table.boolean('is_event').defaultTo(false)
      // Vendors & funding
      table.integer('num_vendors').defaultTo(1)
      table.text('funding_sources')
      table.text('transaction_detail')
      table.text('asun_funding_info')
      // Conditional sections
      table.boolean('prize_receipt_acknowledged').defaultTo(false)
      table.boolean('using_unr_logo').defaultTo(false)
      table.text('logo_description')
      table.text('design_file_url')
      table.string('print_release_number', 100)
      // Event info
      table.string('event_name', 255)
      table.string('event_location', 255)
      table.date('event_date')
      table.string('event_timeframe', 100)
      table.integer('num_attendees')
      table.text('attendee_names')
      table.text('flyer_url')
      // Vendor details stored as JSON string
      table.text('vendors')
      // Department funding
      table.string('department_account', 255)
      table.string('budget_approved', 10)
      table.date('public_meeting_date')
      // Signatures
      table.string('email', 255)
      table.boolean('asun_employee_verified').defaultTo(false)
      table.boolean('officer_signature').defaultTo(false)
      table.boolean('faculty_signature').defaultTo(false)
      // Status
      table.string('status', 50).defaultTo('Submitted')
      table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now())
    })
    console.log('Created table: p_card_requests')
  }

  // ── Travel Requests ───────────────────────────────────────────
  const hasTravel = await knex.schema.hasTable('travel_requests')
  if (!hasTravel) {
    await knex.schema.createTable('travel_requests', (table: Knex.TableBuilder) => {
      table.increments('id').primary()
      table.integer('club').references('club_id').inTable('club').onDelete('CASCADE')
      table.integer('submitted_by').references('id').inTable('user')
      table.string('destination', 255)
      table.date('departure_date')
      table.date('return_date')
      table.text('purpose')
      table.decimal('estimated_cost', 10, 2)
      table.integer('num_travelers')
      table.text('traveler_names')
      table.string('transportation_type', 100)
      table.boolean('lodging_required').defaultTo(false)
      table.text('lodging_details')
      table.text('notes')
      table.string('status', 50).defaultTo('Submitted')
      table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now())
    })
    console.log('Created table: travel_requests')
  }

  // ── Resource Checkouts ────────────────────────────────────────
  const hasResource = await knex.schema.hasTable('resource_checkouts')
  if (!hasResource) {
    await knex.schema.createTable('resource_checkouts', (table: Knex.TableBuilder) => {
      table.increments('id').primary()
      table.integer('club').references('club_id').inTable('club').onDelete('CASCADE')
      table.integer('submitted_by').references('id').inTable('user')
      table.string('full_name', 255)
      table.string('email', 255)
      table.string('club_name', 255)
      table.string('leadership_position', 100)
      table.string('other_position', 100)
      table.string('event_title', 255)
      table.date('checkout_date')
      table.string('checkout_time', 50)
      table.date('return_date')
      table.string('return_time', 50)
      table.text('requested_items')
      table.text('quantity_notes')
      // Acknowledgements
      table.boolean('return_24hrs').defaultTo(false)
      table.boolean('late_return').defaultTo(false)
      table.boolean('on_campus').defaultTo(false)
      table.boolean('must_clean').defaultTo(false)
      table.boolean('financially_responsible').defaultTo(false)
      table.boolean('policy_warning').defaultTo(false)
      table.boolean('food_equipment').defaultTo(false)
      table.string('status', 50).defaultTo('Submitted')
      table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now())
    })
    console.log('Created table: resource_checkouts')
  }

  // ── Submission Comments ───────────────────────────────────────
  const hasComments = await knex.schema.hasTable('submission_comments')
  if (!hasComments) {
    await knex.schema.createTable('submission_comments', (table: Knex.TableBuilder) => {
      table.increments('id').primary()
      table.integer('submission_id').notNullable()
      table.string('form_type', 50).notNullable()
      table.string('author', 255)
      table.integer('author_id').references('id').inTable('user')
      table.boolean('is_admin').defaultTo(false)
      table.text('text').notNullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now())
    })
    console.log('Created table: submission_comments')
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('submission_comments')
  await knex.schema.dropTableIfExists('resource_checkouts')
  await knex.schema.dropTableIfExists('travel_requests')
  await knex.schema.dropTableIfExists('p_card_requests')
  await knex.schema.dropTableIfExists('transactions')
}
