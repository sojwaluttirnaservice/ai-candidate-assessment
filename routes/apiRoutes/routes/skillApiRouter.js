const { checkCandidateAuth } = require("../../../application/controllers/auth/candidateAuthController");
const skillController = require("../../../application/controllers/skill/skillController");
const getRouter = require("../../utils/getRouter");


const skillApiRouter = getRouter();

module.exports = skillApiRouter;
