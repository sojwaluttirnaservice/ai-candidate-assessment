const asyncHandler = require("../../utils/asyncHandler");
const { renderPage } = require("../../utils/responses/ApiResponse");

const viewAuthController = {
    renderLoginPage: asyncHandler(async (req, res) => {
        renderPage(res, 'auth/login-page.ejs', { title: 'Login' })
    }),

    renderSignupPage: asyncHandler(async (req, res) => {
        renderPage(res, 'auth/signup-page.ejs', { title: 'Signup' })
    })
}


module.exports = viewAuthController;
