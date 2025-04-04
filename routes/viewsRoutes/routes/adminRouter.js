const adminController = require("../../../application/controllers/admin/adminController");
const { checkAdminAuth } = require("../../../application/controllers/auth/adminAuthController");
const candidateModel = require("../../../application/models/candidateModel");
const companyModel = require("../../../application/models/companyModel");
const asyncHandler = require("../../../application/utils/asyncHandler");
const { renderPage } = require("../../../application/utils/responses/ApiResponse");
const getRouter = require("../../utils/getRouter");

const adminRouter = getRouter();


adminRouter.get('/login', adminController.renderAdminLoginPage)

adminRouter.get('/dashboard', checkAdminAuth, adminController.renderDashboardPage)

module.exports = adminRouter