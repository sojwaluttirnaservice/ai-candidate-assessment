
const { checkCandidateAuth } = require("../../../application/controllers/auth/candidateAuthController");
const skillController = require("../../../application/controllers/skill/skillController");
const getRouter = require("../../utils/getRouter");


const candidateSkillApiRouter = getRouter();


candidateSkillApiRouter.post('/', checkCandidateAuth, skillController.addSkillCandidateRelation)

candidateSkillApiRouter.delete('/', checkCandidateAuth, skillController.deleteSkillCandidateRelation)

module.exports = candidateSkillApiRouter;
