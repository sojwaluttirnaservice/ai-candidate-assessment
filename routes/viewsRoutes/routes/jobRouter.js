const { checkAdminAuth } = require("../../../application/controllers/auth/adminAuthController");
const { checkCompanyAuth } = require("../../../application/controllers/auth/companyAuthController");
const jobController = require("../../../application/controllers/job/jobController");
const getRouter = require("../../utils/getRouter");

const jobRouter = getRouter();


jobRouter.get('/', checkCompanyAuth, jobController.renderJobPage)

jobRouter.get('/c/:companyId', checkAdminAuth, jobController.renderCompanyJobsPage)

jobRouter.get('/add', checkCompanyAuth, jobController.renderAddJobPage) 


module.exports = jobRouter
