const candidateModel = require("../../../application/models/candidateModel");
const asyncHandler = require("../../../application/utils/asyncHandler");
const { sendResponse } = require("../../../application/utils/responses/ApiResponse");
const getRouter = require("../../utils/getRouter");

const candidateApiRouter = getRouter();


candidateApiRouter.post('/list', asyncHandler(async (req, res) => {
    let { skills } = req.body

    let _candidateWithMatchingSkills = await candidateModel.getCandidatesBySkills(skills);

    return sendResponse(res, 200, true, 'Candidates matching skills fetched successfully', { candidatesMatchingSkills: _candidateWithMatchingSkills[0] })
}))
module.exports = candidateApiRouter;
