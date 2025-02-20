const asyncHandler = require("../../utils/asyncHandler");

const authController = {

    checkAdminOrCompanyAuth: asyncHandler(async (req, res, next) => {

        const session = req.session;



        if (session.admin || session.company) {
            next();
            return;
        }

        res.redirect("/auth/login");
    })

}

module.exports = authController;