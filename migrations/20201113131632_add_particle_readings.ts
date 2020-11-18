import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('particle_readings', table => {
    table.increments('id').primary();

    table.float('pm2_5');
    table.float('pm10');

    table.timestamp('readAt');
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists('particle_readings')
}

