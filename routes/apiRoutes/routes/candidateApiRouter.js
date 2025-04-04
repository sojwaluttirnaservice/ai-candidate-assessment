const { checkAdminAuth } = require("../../../application/controllers/auth/adminAuthController");
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

    console.log(_candidateWithMatchingSkills[0]);

    return sendResponse(res, 200, true, 'Candidates matching skills fetched successfully', {  candidatesMatchingSkills: _candidateWithMatchingSkills[0] })
}))

candidateApiRouter.put('/upload-image', checkCandidateAuth, candidateController.uploadProfileImage)

candidateApiRouter.post('/', candidateController.saveCandidateDetails)


candidateApiRouter.post('/chat', checkCandidateAuth, candidateController.getChatResponse)

candidateApiRouter.put('/', checkCandidateAuth, candidateController.updateCandidateDetails)

candidateApiRouter.post('/shortlist', checkCompanyAuth, candidateController.shortlistCandidate)

module.exports = candidateApiRouter;
