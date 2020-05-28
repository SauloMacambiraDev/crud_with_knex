# CRUD operations with Knex in NodeJs
This is a small project where i use two models in my local MySql database: 'users' and 'projects'. All you gotta to do is create your own database at MySql and execute the following commands:

- **git clone https://github.com/SauloMacambiraDev/crud_with_knex.git **

- **yarn install**

- Configure the credentials access at: **./Knexfile.js**

- **npx knex migrate:latest** to create tables and a trigger

- **npx knex seed:run** to populate data with predefined data

- **yarn start-dev**

