const asyncHandler = require("../../utils/asyncHandler");

const authController = {

    checkAdminOrCompanyAuth: asyncHandler(async (req, res, next) => {

        const session = req.session;



        if (session.admin || session.company) {
            next();
            return;
        }

        res.redirect("/auth/login");
    }),

    checkAuth: asyncHandler(async (req, res, next) => {

        const session = req.session;



        if (session.admin || session.company || session.candidate) {
            next();
            return;
        }

        res.redirect("/auth/login");
    }),

}

module.exports = authController;