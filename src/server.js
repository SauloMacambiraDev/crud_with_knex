const express = require('express')
const app = express()

// Testing mysql2 driver
// const mysql = require('mysql2')

// const mysqlConnection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'knex_test'
// })

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// Add routes
const userRouter = require('./routes/userRoutes')
const projectRouter = require('./routes/projectRoutes')
app.use(userRouter);
app.use(projectRouter);

app.use((req,res,next) => {
    let error = new Error(`This route ${req.url} doesn't exist`);
    error.statusCode = 404;
    return next(error);
})

app.use((err,req,res,next) => {
    return res.status(err.statusCode || 500).json({ message: err.message });
})

app.listen(3000, () => {
    console.log(`Server running on port 3000...`)
})