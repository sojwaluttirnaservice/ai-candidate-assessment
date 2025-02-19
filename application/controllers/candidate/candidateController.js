const shortlistedCandidateRelationModel = require("../../models/shortlistedCandidateRelationModel")
const asyncHandler = require("../../utils/asyncHandler")
const { renderPage } = require("../../utils/responses/ApiResponse")

const candidateController = {

    renderShortlistedCandidatesForRolePage: asyncHandler(async (req, res) => {

        const { jobId } = req.params

        const _shortlistedCandidates = await shortlistedCandidateRelationModel.getShortlistedCandidates(jobId)

        renderPage(res, 'candidate/shortlisted-candidates-page.ejs', { title: "Shortlisted Candidates", shortlistedCandidates: _shortlistedCandidates[0] || [] })
    })
}


module.exports = candidateController 