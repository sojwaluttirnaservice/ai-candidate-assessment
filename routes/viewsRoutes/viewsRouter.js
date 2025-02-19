const asyncHandler = require("../../application/utils/asyncHandler")
const { renderPage } = require("../../application/utils/responses/ApiResponse")
const getRouter = require("../utils/getRouter")
const adminRouter = require("./routes/adminRouter")
const authRouter = require("./routes/auth/authRouter")
const candidateRouter = require("./routes/candidateRouter")
const companyRouter = require("./routes/companyRouter")
const jobRouter = require("./routes/jobRouter")


const viewsRouter = getRouter()

viewsRouter.get('/', asyncHandler(async (req, res) => {
    renderPage(res, 'homepage.ejs', { title: 'Homepage' })
}))


viewsRouter.use('/admin', adminRouter)

viewsRouter.use('/auth', authRouter)

viewsRouter.use('/company', companyRouter)

viewsRouter.use('/job', jobRouter)

viewsRouter.use('/candidate', candidateRouter)

module.exports = viewsRouter