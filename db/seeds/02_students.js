
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {class_id: 1, name:'NA'},
        {class_id: 2, name:'NB'},
        {class_id: 3, name:'NC'},
        {class_id: 1, name:'D'},
        {class_id: 2, name:'E'},
        {class_id: 3, name:'F'},
        {class_id: 1, name:'G'},
        {class_id: 2, name:'H'},
        {class_id: 3, name:'I'}
      ]);
    });
};
