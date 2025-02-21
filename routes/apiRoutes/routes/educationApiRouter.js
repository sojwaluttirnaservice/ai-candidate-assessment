const { checkCandidateAuth } = require("../../../application/controllers/auth/candidateAuthController");
const educationController = require("../../../application/controllers/education/educationController");
const getRouter = require("../../utils/getRouter");

const educationApiRouter = getRouter();


educationApiRouter.post('/', checkCandidateAuth, educationController.saveEducation)

educationApiRouter.put('/', checkCandidateAuth, educationController.updateEducation)

educationApiRouter.delete('/', checkCandidateAuth, educationController.deleteEducation)



module.exports = educationApiRouter;