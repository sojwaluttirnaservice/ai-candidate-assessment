const { checkCompanyAuth } = require("../../../application/controllers/auth/companyAuthController");
const jobController = require("../../../application/controllers/job/jobController");
const getRouter = require("../../utils/getRouter");


const jobApiRouter = getRouter();


jobApiRouter.post('/', checkCompanyAuth, jobController.saveJob)


module.exports = jobApiRouter;