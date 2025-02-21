const asyncHandler = require("../../utils/asyncHandler");
const { renderPage } = require("../../utils/responses/ApiResponse");

const viewAuthController = {
    renderLoginPage: asyncHandler(async (req, res) => {
        renderPage(res, 'auth/login-page.ejs', { title: 'Login' })
    }),

    renderSignupPage: asyncHandler(async (req, res) => {

        let { r: role } = req.query;
        if (role == 'org') {
            renderPage(res, 'auth/company-signup-page.ejs', { title: "Signup page" })
        } else {
            renderPage(res, 'auth/signup-page.ejs', { title: 'Signup' })
        }
    })
}


module.exports = viewAuthController;
