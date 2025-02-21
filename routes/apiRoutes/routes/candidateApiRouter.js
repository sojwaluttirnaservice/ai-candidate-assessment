const { checkCandidateAuth } = require("../../../application/controllers/auth/candidateAuthController");
const { checkCompanyAuth } = require("../../../application/controllers/auth/companyAuthController");
const candidateController = require("../../../application/controllers/candidate/candidateController");
const candidateModel = require("../../../application/models/candidateModel");
const asyncHandler = require("../../../application/utils/asyncHandler");
const { sendResponse } = require("../../../application/utils/responses/ApiResponse");
const getRouter = require("../../utils/getRouter");

const candidateApiRouter = getRouter();


candidateApiRouter.post('/list', checkCompanyAuth, asyncHandler(async (req, res) => {
    let { skills } = req.body

    let _candidateWithMatchingSkills = await candidateModel.getCandidatesBySkills(skills);

    return sendResponse(res, 200, true, 'Candidates matching skills fetched successfully', { candidatesMatchingSkills: _candidateWithMatchingSkills[0] })
}))

candidateApiRouter.post('/', candidateController.saveCandidateDetails)



candidateApiRouter.put('/', checkCandidateAuth, candidateController.updateCandidateDetails)

module.exports = candidateApiRouter;
