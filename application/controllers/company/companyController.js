const companyModel = require("../../models/companyModel");
const jobOpeningModel = require("../../models/jobOpeningModel");
const shortlistedCandidateRelationModel = require("../../models/shortlistedCandidateRelationModel");
const skillModel = require("../../models/skillModel");
const asyncHandler = require("../../utils/asyncHandler");
const { paths } = require("../../utils/files/createDirectories");
const { renderPage, sendResponse } = require("../../utils/responses/ApiResponse");

const companyController = {

    renderDashboardPage: asyncHandler(async (req, res) => {

        const { id: companyId } = req.session.company
        const [_jobResults, _jobMetadata] = await jobOpeningModel.count(companyId)

        const [_shortListingResult, _shortListingMetadata] = await shortlistedCandidateRelationModel.count(companyId)


        renderPage(res, 'company/dashboard-page.ejs', { title: 'Dashboard', totalJobOpenings: _jobResults[0]?.total_job_openings || 0, shortlistedCandidateCount: _shortListingResult[0]?.shortlisted_count || 0, company: req.session.company })
    }),

    renderSearchPage: asyncHandler(async (req, res) => {
        const [_skills, metadata] = await skillModel.list();
        renderPage(res, 'company/search-page.ejs', { title: 'Search', profileImageUrl: paths.candidate.renderPath, skills: _skills, company: req.session.company })
    }),

    renderCompaniesListPage: asyncHandler(async (req, res) => {
        const [_companies, metadata] = await companyModel.list();
        renderPage(res, 'company/companies-list-page.ejs', { title: 'Companies', companies: _companies, totalCompanies: _companies.length, company: req.session.company })
    }),


    // DATa manipulatin 

    add: asyncHandler(async (req, res) => {
        const companyDetails = req.body;

        console.log(companyDetails);


        console.log("here");
        if (!companyDetails) {
            return sendResponse(res, 400, false, 'Company Details not sent')
        }

        let { company_name, company_email, confirm_company_password, company_password, company_contact_number, company_address, company_established_year, company_website, company_hr_name, company_hr_email, company_hr_contact_number } = companyDetails;



        if (!company_name || !company_email || !company_password || !confirm_company_password  || !company_established_year ||
            !company_hr_name || !company_hr_email) {
            return sendResponse(res, 400, false, 'All fields are required')
        }

        if (company_password !== confirm_company_password) {
            return sendResponse(res, 400, false, 'Passwords do not match')
        }


        const [_result, _metadata] = await companyModel.add(companyDetails);

        if (_result.affectedRows > 0) {
            return sendResponse(res, 201, true, 'Company registered successfully')
        }
    })
}

module.exports = companyController;
