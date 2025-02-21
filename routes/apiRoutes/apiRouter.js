const getRouter = require("../utils/getRouter");
const authApiRouter = require("./routes/authApiRouter");
const candidateApiRouter = require("./routes/candidateApiRouter");
const candidateSkillApiRouter = require("./routes/candidateSkillApiRouter");
const educationApiRouter = require("./routes/educationApiRouter");
const jobApiRouter = require("./routes/jobApiRouter");

const apiRouter = getRouter()




apiRouter.use('/auth', authApiRouter)

apiRouter.use('/candidate', candidateApiRouter)

apiRouter.use('/job', jobApiRouter) 

apiRouter.use('/education', educationApiRouter)

apiRouter.use('/candidate-skill', candidateSkillApiRouter)

module.exports = apiRouter