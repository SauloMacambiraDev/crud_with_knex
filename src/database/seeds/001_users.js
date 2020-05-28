const bcrypt = require('bcryptjs')

const firstUsers = [
  {
    first_name: "Saulo",
    last_name: "de Melo Macambira",
    email: "saulomacdev@gmail.com",
    username: "saulodev",
    password: bcrypt.hashSync('123456', 12)
  },
  {
    first_name: "Testando first name",
    last_name: "testando last name",
    email: "teste@gmail.com",
    username: "teste1",
    password: bcrypt.hashSync('123456', 12)
  },
  {
    first_name: "2 Testando first name",
    last_name: "2 testando last name",
    email: "teste2@gmail.com",
    username: "teste2",
    password: bcrypt.hashSync('123456', 12)
  }
]


exports.seed = knex => {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert(firstUsers);
    });
};
