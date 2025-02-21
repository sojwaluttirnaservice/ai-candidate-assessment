const { checkAdminAuth } = require("../../../application/controllers/auth/adminAuthController");
const { checkAdminOrCompanyAuth } = require("../../../application/controllers/auth/authController");
const { checkCandidateAuth } = require("../../../application/controllers/auth/candidateAuthController");
const candidateController = require("../../../application/controllers/candidate/candidateController");
const getRouter = require("../../utils/getRouter");

const candidateRouter = getRouter();

candidateRouter.get('/', checkAdminAuth, candidateController.renderCandidatesListPage)

candidateRouter.get('/dashboard', checkCandidateAuth, candidateController.renderCandidateDashboardPage)

candidateRouter.get('/profile', checkCandidateAuth, candidateController.renderCandidateProfilePage)

candidateRouter.get('/shortlisted/:jobId', checkAdminOrCompanyAuth, candidateController.renderShortlistedCandidatesForRolePage)

candidateRouter.get('/c/:candidateId', checkAdminOrCompanyAuth, candidateController.renderCandidateDataPage)


candidateRouter.get('/shortlisted', checkCandidateAuth, candidateController.renderCandidateShortlistedCompaniesPage)

module.exports = candidateRouter;