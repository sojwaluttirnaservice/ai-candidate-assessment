const candidateModel = require("../../models/candidateModel")
const shortlistedCandidateRelationModel = require("../../models/shortlistedCandidateRelationModel")
const asyncHandler = require("../../utils/asyncHandler")
const { renderPage } = require("../../utils/responses/ApiResponse")

const candidateController = {

    renderShortlistedCandidatesForRolePage: asyncHandler(async (req, res) => {

        const { jobId } = req.params
        const session = req.session;

        const _shortlistedCandidates = await shortlistedCandidateRelationModel.getShortlistedCandidates(jobId)

        renderPage(res, 'candidate/shortlisted-candidates-page.ejs', { title: "Shortlisted Candidates", shortlistedCandidates: _shortlistedCandidates[0] || [], admin: session.admin, company: session.company })
    }),


    renderCandidatesListPage: asyncHandler(async (req, res) => {

        const session = req.session;

        const [_candidates, _metadata] = await candidateModel.list()

        renderPage(res, 'candidate/candidates-list-page.ejs', { title: "Candidates List", admin: session.admin, candidates: _candidates || [] })

    }),

    renderCandidateDataPage: asyncHandler(async (req, res) => {

        const { candidateId } = req.params

        const session = req.session

        const _candidate = await candidateModel.getCandidateById(candidateId)

        renderPage(res, 'candidate/candidate-data-page.ejs', { title: "Candidate Data", admin: session.admin, candidate: _candidate })


    })

}


module.exports = candidateController 