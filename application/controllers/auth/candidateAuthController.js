const candidateModel = require("../../models/candidateModel");
const asyncHandler = require("../../utils/asyncHandler");
const { sendResponse } = require("../../utils/responses/ApiResponse");

const candidateAuthController = {

    candidateAuth: asyncHandler(async (req, res, next) => {


        let session = req.session

        if (session && session.candidate) {
            next()
            return;
        }
        res.redirect('/auth/login')
    }),

    login: asyncHandler(async (req, res) => {

        const { email, password, role } = req.body;

        

        console.log(req.body)

        if (!email || !password) {
            return sendResponse(res, 400, false, "Email and password are required");
        }

        const _candidates = await candidateModel.getCandidateByEmail(email);

        if (!_candidates || _candidates[0].length === 0) {
            return sendResponse(res, 401, false, "Invalid email or password");
        }


        let candidate = _candidates[0][0]


        if (candidate.password != password) {
            return sendResponse(res, 401, false, "Invalid email or password");
        }

        const { password: _candidatePassword, ...candidateData } = candidate

        req.session.candidate = { ...candidateData, role }

        return sendResponse(res, 200, true, "Login successful", { candidate: candidateData });
    }),

}

module.exports = candidateAuthController;
