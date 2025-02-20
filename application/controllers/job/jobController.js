const companyModel = require("../../models/companyModel");
const jobOpeningModel = require("../../models/jobOpeningModel");
const asyncHandler = require("../../utils/asyncHandler");
const { renderPage, sendResponse } = require("../../utils/responses/ApiResponse");

const jobController = {

    renderJobPage: asyncHandler(async (req, res) => {

        let { company } = req.session

        const _jobs = await jobOpeningModel.getByCompany(company.id)
        renderPage(res, 'job/jobs-list-page.ejs', { title: 'Jobs', jobs: _jobs[0] })
    }),

    renderAddJobPage: asyncHandler(async (req, res) => {
        renderPage(res, 'job/add-job-page.ejs', { title: 'Add Job', company: req?.session?.company })
    }),


    // For the company jobs for admin panel
    renderCompanyJobsPage: asyncHandler(async (req, res) => {

        const session = req.session;

        const { companyId } = req.params;

        const [_jobs, _metadata] = await jobOpeningModel.getByCompany(companyId)

        const [_company, _] = await companyModel.getById(companyId);

        renderPage(res, 'job/jobs-list-page.ejs', { title: 'Company Jobs', jobs: _jobs, admin: session.admin, company: _company[0] })

    }),


    saveJob: asyncHandler(async (req, res) => {
        const { company } = req.session
        const jobData = req.body
        const { job_title, job_description, job_type, job_location, last_date_to_apply, job_salary } = jobData

        if (!job_title || !job_description || !job_type || !job_location || !last_date_to_apply || !job_salary) {
            // Return a 400 Bad Request with an error message
            return sendResponse(res, 400, false, 'All fields are required')
        }

        // jobData.company_id_fk = company.id

        await jobOpeningModel.add(jobData)

        return sendResponse(res, 200, true, 'Job created successfully')
    })
}



module.exports = jobController;
