const getRouter = require("../../../utils/getRouter");
const viewAuthController = require("../../../../application/controllers/auth/viewAuthController");

const authRouter = getRouter();


// Routes for pages

authRouter.get('/login', viewAuthController.renderLoginPage)


authRouter.get('/signup', viewAuthController.renderSignupPage)


module.exports = authRouter;
