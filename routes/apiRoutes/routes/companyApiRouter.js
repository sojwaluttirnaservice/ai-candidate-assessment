const companyController = require("../../../application/controllers/company/companyController");
const getRouter = require("../../utils/getRouter");

const companyApiRouter = getRouter();

companyApiRouter.post('/', companyController.add)

module.exports = companyApiRouter