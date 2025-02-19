const { checkCompanyAuth } = require("../../../application/controllers/auth/companyAuthController");
const candidateController = require("../../../application/controllers/candidate/candidateController");
const getRouter = require("../../utils/getRouter");

const candidateRouter = getRouter();

candidateRouter.get('/shortlisted/:jobId', checkCompanyAuth, candidateController.renderShortlistedCandidatesForRolePage)

module.exports = candidateRouter;