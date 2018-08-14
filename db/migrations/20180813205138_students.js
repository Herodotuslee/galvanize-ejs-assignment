
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', table=>{
    table.increments();
    table.string('name');
    table.integer('class_id')
    .references('id')
    .inTable('classes')
    .onDelete('cascade')
    .index();
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('students')
};
