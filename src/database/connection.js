const configuration = require('./../../knexfile')
const knex = require('knex')(configuration.development)

module.exports = knex;
