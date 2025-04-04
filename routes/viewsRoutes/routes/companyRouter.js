const { checkAdminAuth } = require("../../../application/controllers/auth/adminAuthController");
const { checkCompanyAuth } = require("../../../application/controllers/auth/companyAuthController");
const companyController = require("../../../application/controllers/company/companyController");
const getRouter = require("../../utils/getRouter");

const companyRouter = getRouter();


companyRouter.get('/dashboard', checkCompanyAuth, companyController.renderDashboardPage)

companyRouter.get('/search', checkCompanyAuth, companyController.renderSearchPage)

companyRouter.get('/', checkAdminAuth, companyController.renderCompaniesListPage)

module.exports = companyRouter;
