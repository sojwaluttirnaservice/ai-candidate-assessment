const candidateModel = require("../../models/candidateModel");
const asyncHandler = require("../../utils/asyncHandler");
const { paths } = require("../../utils/files/createDirectories");
const { sendResponse } = require("../../utils/responses/ApiResponse");

const candidateAuthController = {

    checkCandidateAuth: asyncHandler(async (req, res, next) => {


        let session = req.session

        if (process.env.PROJECT_ENV == 'DEV') {
            if (!req.session.candidate) {
                let [_candidate, _] = await candidateModel.getCandidateById(2);
                req.session.candidate = _candidate[0];
            }
        }

        if (session?.candidate) {
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

        req.session.candidate = { ...candidateData, role, profileImageUrl: paths.candidate.renderPath }

        console.log(candidateData)

        return sendResponse(res, 200, true, "Login successful", { candidate: candidateData });
    }),

}

module.exports = candidateAuthController;
