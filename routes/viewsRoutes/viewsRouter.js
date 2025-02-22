const asyncHandler = require("../../application/utils/asyncHandler")
const { renderPage } = require("../../application/utils/responses/ApiResponse")
const getRouter = require("../utils/getRouter")
const adminRouter = require("./routes/adminRouter")
const authRouter = require("./routes/auth/authRouter")
const candidateRouter = require("./routes/candidateRouter")
const companyRouter = require("./routes/companyRouter")
const jobRouter = require("./routes/jobRouter")
const resumeRouter = require("./routes/resumeRouter")


const viewsRouter = getRouter()

viewsRouter.get('/', asyncHandler(async (req, res) => {
    let session = req.session

    let { candidate, admin, company } = session

    if (candidate) {
        return res.redirect('/candidate/dashboard')
    }
    if (admin) {
        return res.redirect('/admin/dashboard')
    }
    if (company) {
        return res.redirect('/company/dashboard')
    }
    renderPage(res, 'homepage.ejs', { title: 'Homepage' })
}))


viewsRouter.use('/admin', adminRouter)

viewsRouter.use('/auth', authRouter)

viewsRouter.use('/company', companyRouter)

viewsRouter.use('/job', jobRouter)

viewsRouter.use('/candidate', candidateRouter)

viewsRouter.use('/resume', resumeRouter)

module.exports = viewsRouter