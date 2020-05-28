const knex = require('./../database/connection')

exports.indexAll = async (req,res,next) => {
    try {

        const {page = 1} = req.query

        const projects = await knex('projects')
                                .limit(5)
                                .offset((page - 1) * 5 )

        const [count] = await knex('projects').count()

        res.header('X-Total-Count', count["count(*)"])

        res.status(200).json({projects})
    } catch (error) {
        next(error)
    }
}

exports.index = async (req,res,next) => {
    try {
        const { page = 1 } = req.query
        const { userId } = req.params;
        const query = knex('projects')
                            .where({user_id: userId})
                            .join('users', 'users.id', '=', 'projects.user_id')
                            .select('projects.*', 'users.username')
                            .where('users.deleted_at', null)
                            .limit(5)
                            .offset((page - 1) * 5);                    
        const projects = await query

        const countObj = knex('projects').count()
        const [count] = await countObj.where({user_id: userId})
        
        res.header('X-Total-Count', count["count(*)"])

        return res.status(200).json({
            projects
        })
    } catch (error) {
        next(error);
    }
}

exports.show = async (req,res,next) => {
    try {  
        const { userId, projectId } = req.params
        const project = await knex('projects')
                                .where({ id: projectId, user_id: userId })
                                .first();
        if(!project){
            let error = new Error('This project doesnt exist')
            error.statusCode = 400;
            return next(error)
        }
    
        return res.status(200).json({
            project
        })
        
    } catch (error) {
        next(error);
    }
}

exports.update = async (req,res,next) => {
    try {
        const { userId, projectId } = req.params;
        // const {title, description} = req.body
        const project = await knex('projects')
                        .update(req.body)
                        .where({id:projectId, user_id: userId});
        
        if(!project){
            let error = new Error('This project doesnt exist');
            error.statusCode = 404;
            return next(error)
        }

        return res.status(200).json({
            project
        })

    } catch (error) {
        next(error)
    }
}

exports.store = async (req,res,next) => {
    try {
        const {userId} = req.params
        const { title, description } = req.body

        if(!title){
            let error = new Error('title cannot be empty')
            error.statusCode = 400;
            return next(error)
        }

        const project = await knex('projects').insert({ 
            title,
            description,
            user_id: userId
        })
        
        return res.status(201).json({
            project
        })
    } catch (error) {
        return next(error)
    }
}

exports.delete = async (req,res,next) => {
    try {
        const {projectId} = req.params

        await knex('projects').where({id: projectId}).del()

        return res.status(204).json({ 
            status: 'Success', 
            data: null
        })
    } catch (error) {
        return next(error)
    }
}