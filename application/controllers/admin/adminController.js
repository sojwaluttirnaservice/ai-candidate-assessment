const candidateModel = require("../../models/candidateModel");
const companyModel = require("../../models/companyModel");
const asyncHandler = require("../../utils/asyncHandler");
const { renderPage } = require("../../utils/responses/ApiResponse");

const adminController = {

    renderAdminLoginPage: asyncHandler(async (req, res) => {
        renderPage(res, 'auth/admin-login.ejs', { title: 'Admin Login' })
    }),

    renderDashboardPage: asyncHandler(async (req, res) => {
        const [_companyData, _metadata] = await companyModel.count();

        const [_candidates, _candidateMetadata] = await candidateModel.count();
        renderPage(res, 'admin/admin-dashboard-page.ejs', {
            title: 'Admin Dashboard', totalCompanies: _companyData[0].total_companies,
            totalCandidates: _candidates[0]?.total_candidates
        })
    })
}

module.exports = adminController;
