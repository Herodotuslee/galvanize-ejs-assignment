exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('classes').del()
    .then(function () {
      // Inserts seed entries
      return knex('classes').insert([
        {teacher: 'A', classname: 'C_1'},
        {teacher: 'C', classname: 'C_2'},
        {teacher: 'B', classname: 'C_3'}
      ]);
    });
};
