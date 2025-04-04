const { checkAuth } = require("../../../application/controllers/auth/authController");
const resumeController = require("../../../application/controllers/resume/resumeController");
const getRouter = require("../../utils/getRouter");

const resumeRouter = getRouter();


resumeRouter.get('/c/:candidateId', checkAuth, resumeController.renderCandidateResumePage)

module.exports = resumeRouter