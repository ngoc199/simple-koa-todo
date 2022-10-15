import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('todos', (tableBuilder) => {
    tableBuilder.string('id', 20).primary();
    tableBuilder.string('name');
    tableBuilder.boolean('complete');
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('todos');
}

