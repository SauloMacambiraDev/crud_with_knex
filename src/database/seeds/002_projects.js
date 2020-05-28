
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {
          title: "Rocketseat project",
          description: "Backend crud with Knex!",
          user_id: 1
        },
        {
          title: "Personal project",
          description: "Personal project i'm currently working on",
          user_id: 1
        },
        {
          title: "Weather project app",
          user_id: 2
        },
      ]);
    });
};
