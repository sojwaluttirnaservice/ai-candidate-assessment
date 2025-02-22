const asyncHandler = require("../../utils/asyncHandler");
const { renderPage } = require("../../utils/responses/ApiResponse");

const viewAuthController = {
    renderLoginPage: asyncHandler(async (req, res) => {
        let session = req.session

        let { candidate, admin, company } = session

        if (candidate) {
            return res.redirect('/candidate/dashboard')
        }
        if (admin) {
            return res.redirect('/admin/dashboard')
        }
        if(company){
            return res.redirect('/company/dashboard')
        }
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
