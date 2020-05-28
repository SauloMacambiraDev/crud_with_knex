const projectsController = require('./../controllers/projectsController')
const projectRouter = require('express').Router( {mergeParams: true})
const userRouter = require('./userRoutes')

// Since we're going to provide all projects without passing the userId
// Doesn't make sense to create a nested route to projects
// userRouter.use('/user/:userId', projectRouter)

projectRouter.get('/projects', projectsController.indexAll);

projectRouter.get('/users/:userId/projects', projectsController.index)
projectRouter.post('/users/:userId/projects', projectsController.store)
projectRouter.get('/users/:userId/projects/:projectId', projectsController.show)
projectRouter.put('/users/:userId/projects/:projectId', projectsController.update)
projectRouter.delete('/users/:userId/projects/:projectId', projectsController.delete)


module.exports = projectRouter