const adminModel = require("../../models/adminModel");
const companyModel = require("../../models/companyModel");
const asyncHandler = require("../../utils/asyncHandler");
const { sendResponse } = require("../../utils/responses/ApiResponse");


const dotenv = require('dotenv');

dotenv.config();


const adminAuthController = {


    checkAdminAuth: asyncHandler(async (req, res, next) => {

        let session = req.session

        if (process.env.PROJECT_ENV != 'PROD') {
            req.session.admin = { role: 'admin' }
        }

        if (!session?.admin) {
            // return sendResponse(res, 401, false, "Unauthorized")
            res.redirect('/admin/login')
            return;
        }

        next()
    }),


    login: asyncHandler(async (req, res) => {
        const { username, password, role } = req.body


        if (!username || !password) {
            return sendResponse(res, 400, false, "Email and password are required");
        }

        const [_admins, _metadata] = await adminModel.getAdminByUsername(username)

        if (_admins?.length === 0) {
            return sendResponse(res, 401, false, "Invalid username or password");
        }

        const admin = _admins[0]

        if (admin.password !== password) {
            return sendResponse(res, 401, false, "Invalid crendentials");
        }


        req.session.admin = { ...admin, role }

        const { password: p, ...adminData } = admin

        return sendResponse(res, 200, true, "Login successful", {
            admin: adminData
        })

    })
}

module.exports = adminAuthController;
