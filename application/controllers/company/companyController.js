const jobOpeningModel = require("../../models/jobOpeningModel");
const shortlistedCandidateRelationModel = require("../../models/shortlistedCandidateRelationModel");
const skillModel = require("../../models/skillModel");
const asyncHandler = require("../../utils/asyncHandler");
const { renderPage } = require("../../utils/responses/ApiResponse");

const companyController = {

    renderDashboardPage: asyncHandler(async (req, res) => {

        const { id: companyId } = req.session.company
        const [_jobResults, _jobMetadata] = await jobOpeningModel.count(companyId)

        const [_shortListingResult, _shortListingMetadata] = await shortlistedCandidateRelationModel.count(companyId)


        renderPage(res, 'company/dashboard-page.ejs', { title: 'Dashboard', totalJobOpenings: _jobResults[0]?.total_job_openings || 0, shortlistedCandidateCount: _shortListingResult[0]?.shortlisted_count || 0 })
    }),

    renderSearchPage: asyncHandler(async (req, res) => {
        const _skills = await skillModel.list();
        renderPage(res, 'company/search-page.ejs', { title: 'Search', skills: _skills[0] })
    })
}

module.exports = companyController;
