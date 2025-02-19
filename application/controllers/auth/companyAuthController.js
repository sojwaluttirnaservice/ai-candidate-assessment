const companyModel = require("../../models/companyModel");
const asyncHandler = require("../../utils/asyncHandler");
const { sendResponse } = require("../../utils/responses/ApiResponse");


const dotenv = require('dotenv');

dotenv.config();


const companyAuthController = {


    checkCompanyAuth: asyncHandler(async (req, res, next) => {

        let session = req.session
        
        if (process.env.PROJECT_ENV != 'PROD') {
            req.session.company = { id: 1, role: 'company' }
        }

        if (!session?.company) {
            // return sendResponse(res, 401, false, "Unauthorized")
            res.redirect('/auth/login')
            return;
        }

        next()

    }),


    login: asyncHandler(async (req, res) => {
        const { email, password, role } = req.body


        if (!email || !password) {
            return sendResponse(res, 400, false, "Email and password are required");
        }

        const _companies = await companyModel.getCompanyByEmail(email)

        if (!_companies || _companies[0]?.length === 0) {
            return sendResponse(res, 401, false, "Invalid email or password");
        }

        const company = _companies[0][0]

        if (company.company_password !== password) {
            return sendResponse(res, 401, false, "Invalid crendentials");
        }


        req.session.company = { ...company, role }

        const { company_password, ...companyData } = company

        return sendResponse(res, 200, true, "Login successful", {
            company: companyData
        })

    })
}

module.exports = companyAuthController;
