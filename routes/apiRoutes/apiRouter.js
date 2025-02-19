const getRouter = require("../utils/getRouter");
const authApiRouter = require("./routes/authApiRouter");
const candidateApiRouter = require("./routes/candidateApiRouter");
const jobApiRouter = require("./routes/jobApiRouter");

const apiRouter = getRouter()




apiRouter.use('/auth', authApiRouter)

apiRouter.use('/candidate', candidateApiRouter)

apiRouter.use('/job', jobApiRouter) 

module.exports = apiRouter