import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('temperature_humidity_readings', table => {
    table.increments('id').primary();

    table.float('temperature');
    table.float('humidity');

    table.timestamp('readAt');
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists('temperature_humidity_readings')
}

