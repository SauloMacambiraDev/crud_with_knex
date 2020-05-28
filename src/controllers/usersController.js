const knex = require('./../database/connection')
const bcrypt = require('bcryptjs')

exports.index = async(req,res,next) => {
    try{
        // const users = await knex('users').select('*');
        // does the same thing as above does
        const users = await knex('users').where({deleted_at: null})
        //.where(deleted_at, null) // same as above

        return res.json({
            users
        })
    }catch(err){
        res.json({
            err
        })
    }
}

exports.show = async (req,res,next) => {
    try {

        const {id} = req.params
        const user = await knex('users').where({id}).first()

        if(!user){
            let err = new Error('User doesnt exist')
            err.statusCode = 400;
            next(err)
        }

        return res.json({
            user
        })
    } catch (error) {
        next(error)
    }
}

exports.store = async (req,res,next) => {
    try{    
        let {firstName, lastName, email, username, password} = req.body;

        if (!firstName || !lastName || !email || !username || !password){
            let error = new Error('Need email, full name, username and password')
            error.statusCode = 400;
            return next(error)
        }

        password = await bcrypt.hash(password.toString(), 12)

        const result = await knex('users').insert({
            first_name: firstName,
            last_name: lastName,
            username,
            email,
            password
        })

        return res.status(200).json({
            result
        })
    }catch(err){
        next(err)
    }
}

exports.delete = async (req, res, next) => {
    try{
        const {id} = req.params

        // Since we're using soft delete, we'll only update
        await knex('users')
            .where({id})
            .update({
                deleted_at: new Date()
            })    
            // .del()

        return res.status(204).json({status: 'Success', data:null})
    }catch(err){
        return next(err)
    }
}

exports.update = async (req,res,next) => {
    try{   
        const {id} = req.params
        let { password} = req.body;

        if(password) {
            req.body.password = await bcrypt.hash(password, 12);
        }

        const updateUser = await knex('users')
            .update(req.body)
            .where({id})

        return res.status(200).json({result: updateUser})
    }catch(err){
        return next(err)
    }
}