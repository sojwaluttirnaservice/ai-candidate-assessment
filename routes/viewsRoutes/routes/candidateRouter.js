const { checkAdminAuth } = require("../../../application/controllers/auth/adminAuthController");
const { checkAdminOrCompanyAuth } = require("../../../application/controllers/auth/authController");
const candidateController = require("../../../application/controllers/candidate/candidateController");
const getRouter = require("../../utils/getRouter");

const candidateRouter = getRouter();

candidateRouter.get('/shortlisted/:jobId', checkAdminOrCompanyAuth, candidateController.renderShortlistedCandidatesForRolePage)

candidateRouter.get('/', checkAdminAuth, candidateController.renderCandidatesListPage)


candidateRouter.get('/c/:candidateId', checkAdminOrCompanyAuth, candidateController.renderCandidateDataPage)


module.exports = candidateRouter;