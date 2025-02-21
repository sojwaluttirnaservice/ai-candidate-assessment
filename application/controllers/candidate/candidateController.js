const candidateModel = require("../../models/candidateModel")
const shortlistedCandidateRelationModel = require("../../models/shortlistedCandidateRelationModel")
const skillModel = require("../../models/skillModel")
const asyncHandler = require("../../utils/asyncHandler")
const { paths } = require("../../utils/files/createDirectories")
const { renderPage, sendResponse } = require("../../utils/responses/ApiResponse")

const candidateController = {

    renderShortlistedCandidatesForRolePage: asyncHandler(async (req, res) => {

        const { jobId } = req.params
        const session = req.session;

        const _shortlistedCandidates = await shortlistedCandidateRelationModel.getShortlistedCandidates(jobId)

        renderPage(res, 'candidate/shortlisted-candidates-page.ejs', { title: "Shortlisted Candidates", shortlistedCandidates: _shortlistedCandidates[0] || [], admin: session.admin, company: session.company })
    }),


    renderCandidatesListPage: asyncHandler(async (req, res) => {

        const session = req.session;

        const [_candidates, _metadata] = await candidateModel.list()

        renderPage(res, 'candidate/candidates-list-page.ejs', { title: "Candidates List", admin: session.admin, candidates: _candidates || [] })

    }),

    renderCandidateDataPage: asyncHandler(async (req, res) => {

        const { candidateId } = req.params

        const session = req.session

        const _candidate = await candidateModel.getCandidateById(candidateId)

        renderPage(res, 'candidate/candidate-data-page.ejs', { title: "Candidate Data", admin: session.admin, candidate: _candidate })

    }),

    renderCandidateDashboardPage: asyncHandler(async (req, res) => {
        renderPage(res, 'candidate/candidate-dashboard-page.ejs', { title: 'Dashboard' })
    }),


    renderCandidateProfilePage: asyncHandler(async (req, res) => {
        const session = req.session;
        const { id: candidateId } = session.candidate;
        const [_candidateSkills, _metadata] = await candidateModel.getCandiateSkills(candidateId)


        // console.log(_candidateSkills)

        const [_skills, _metadat] = await skillModel.list();
        const [_education, _] = await candidateModel.getCandidateEducation(candidateId);
        renderPage(res, 'candidate/candidate-profile-page.ejs', { title: 'Profile', candidate: session.candidate, skills: _skills, candidateSkills: _candidateSkills, education: _education })
    }),


    renderCandidateShortlistedCompaniesPage: asyncHandler(async (req, res) => {
        const session = req.session;
        const { id: candidateId } = session.candidate;
        const [_shortlistedCompanies, _] = await candidateModel.getCandidateShortlistedCompanies(candidateId);
        renderPage(res, 'candidate/candidate-shortlisted-companies-page.ejs', { title: 'Shortlisted Companies', candidate: session.candidate, shortlistedCompanies: _shortlistedCompanies })
    }),




    // DATA MANIPULATION 

    saveCandidateDetails: asyncHandler(async (req, res) => {

        const candidateDetails = req.body;

        const {
            name,
            email,
            mobile,
            password,
            confirm_password,
            gender,
            years_of_experience,
            candidate_summary,
            candidate_description,
        } = candidateDetails;


        if (!name || !email || !password || !gender || !years_of_experience) {
            return sendResponse(res, 400, false, "All fields are required")
        }

        if (!req.files?.candidateImage) {
            return sendResponse(res, 400, false, "Candidate image is required")
        }


        const candidateImage = req.files.candidateImage


        const imageExtension = candidateImage.name.split('.').pop();
        const imageName = `candidate_${Date.now()}_${Math.floor(Math.random() * 10000)}.${imageExtension}`;


        let savePath = `${paths.candidate.directoryPath}/${imageName}`

        await candidateImage.mv(savePath)

        candidateDetails.image_name = imageName

        const [_result, _metadata] = await candidateModel.add(candidateDetails)

        if (_result.affectedRows > 0) {
            return sendResponse(res, 201, true, "Signup successful");
        }
    }),

    updateCandidateDetails: asyncHandler(async (req, res) => {

        let candidateDetails = req.body
        let { name, email, mobile, gender, years_of_experience, candidate_summary, candidate_description } = candidateDetails

        if (!name || !email || !mobile || !gender || !years_of_experience) {
            return sendResponse(res, 400, false, "All fields are required")
        }

        if (mobile.trim().length != 10) {
            return sendResponse(res, 400, false, "Invalid mobile number")
        }

        let [_result, _metadata] = await candidateModel.update(candidateDetails)

        if (_result.affectedRows > 0) {
            req.session.candidate = candidateDetails;
            return sendResponse(res, 200, true, "Candidate details updated successfully")
        }
    })
}


module.exports = candidateController 