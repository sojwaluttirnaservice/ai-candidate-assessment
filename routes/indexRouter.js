var express = require('express');
const apiRouter = require('./apiRoutes/apiRouter');
const viewsRouter = require('./viewsRoutes/viewsRouter');
var indexRouter = express.Router();


// VIEWS  CALLS
indexRouter.use('/', viewsRouter)

// PURE BACKEND CALLS
indexRouter.use('/api/v1', apiRouter);


module.exports = indexRouter;
