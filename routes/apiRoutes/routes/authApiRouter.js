const candidateAuthController = require("../../../application/controllers/auth/candidateAuthController");
const companyAuthController = require("../../../application/controllers/auth/companyAuthController");
const { sendResponse } = require("../../../application/utils/responses/ApiResponse");
const getRouter = require("../../utils/getRouter");

const authApiRouter = getRouter()


authApiRouter.post("/login", async (req, res) => {

    const { role } = req.body
    if (role == 'candidate') {
        return candidateAuthController.login(req, res)
    }
    if (role == 'company') {
        return companyAuthController.login(req, res)
    }
})

authApiRouter.post("/logout", async (req, res) => {
    let session = req.session;


    if (session) {
        req.session.destroy((err) => {
            if (err) {
                console.error("Error destroying session:", err);
                return res.status(500).send("Error during logout.");
            }
            // Now perform the redirect after session is destroyed
            return sendResponse(res, 200, true, "Logged out successfully")
        });
    } else {
        return sendResponse(res, 200, true, "Logged out successfully")
    }
});



module.exports = authApiRouter;
