const router = require('express').Router()
const knex = require('../database/connection')
const usersController = require('./../controllers/usersController')
// testing route with mysql2 js lib
// router.get('/', async (req,res,next) => {
//     try{
//         const results = await mysqlConnection.promise().query('SELECT * FROM users')

//         return res.json({
//             results
//         })
//     } catch(err){
//         res.json({
//             err
//         })
//     }
// })

router.get('/users', usersController.index)

router.get('/users/:id', usersController.show)

router.post('/users', usersController.store)

router.put('/users/:id', usersController.update)

router.delete('/users/:id', usersController.delete)

module.exports = router