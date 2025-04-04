const candidateModel = require("../../models/candidateModel")
const shortlistedCandidateRelationModel = require("../../models/shortlistedCandidateRelationModel")
const skillModel = require("../../models/skillModel")
const asyncHandler = require("../../utils/asyncHandler")
const fs = require("fs")
const { paths } = require("../../utils/files/createDirectories")
const { renderPage, sendResponse } = require("../../utils/responses/ApiResponse")
const chatWithGPT = require("../chatgpt/chat")


const candidateController = {

    renderShortlistedCandidatesForRolePage: asyncHandler(async (req, res) => {

        const { jobId } = req.params
        const session = req.session;

        const _shortlistedCandidates = await shortlistedCandidateRelationModel.getShortlistedCandidates(jobId)

        renderPage(res, 'candidate/shortlisted-candidates-page.ejs', { title: "Shortlisted Candidates", profileImageUrl: paths.candidate.renderPath, shortlistedCandidates: _shortlistedCandidates[0] || [], admin: session.admin, company: session.company })
    }),


    renderCandidatesListPage: asyncHandler(async (req, res) => {

        const session = req.session;

        const [_candidates, _metadata] = await candidateModel.list()

        renderPage(res, 'candidate/candidates-list-page.ejs', { title: "Candidates List", profileImageUrl: paths.candidate.renderPath, admin: session.admin, candidates: _candidates || [] })

    }),

    renderCandidateDataPage: asyncHandler(async (req, res) => {

        const { candidateId } = req.params

        const session = req.session

        const _candidate = await candidateModel.getCandidateById(candidateId)

        renderPage(res, 'candidate/candidate-data-page.ejs', { title: "Candidate Data", admin: session.admin, candidate: _candidate })

    }),

    renderCandidateDashboardPage: asyncHandler(async (req, res) => {

        const [_shortlistedCompanies] = await candidateModel.getCandidateShortlistedCompanies(req?.session?.candidate?.id)
        renderPage(res, 'candidate/candidate-dashboard-page.ejs', { title: 'Dashboard', candidate: req.session.candidate, shortlistedFor: _shortlistedCompanies.length })
    }),


    renderCandidateProfilePage: asyncHandler(async (req, res) => {
        const session = req.session;
        const { id: candidateId } = session.candidate;


        let [_candidate, _meta] = await candidateModel.getCandidateById(candidateId);


        let { password, ...candidateOtherData } = _candidate[0]

        const [_candidateSkills, _metadata] = await candidateModel.getCandiateSkills(candidateId)
        candidateOtherData.profileImageUrl = paths.candidate.renderPath


        // console.log(_candidateSkills)

        const [_skills, _metadat] = await skillModel.list();
        const [_education, _] = await candidateModel.getCandidateEducation(candidateId);
        renderPage(res, 'candidate/candidate-profile-page.ejs', { title: 'Profile', profileImageUrl: paths.candidate.renderPath, candidate: candidateOtherData, skills: _skills, candidateSkills: _candidateSkills, education: _education })
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
        if (candidateImage.size / 1024 > 200) {
            return sendResponse(res, 413, false, "Image size is too large.Selecte iamge below 200kb")
        }


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


    getChatResponse: asyncHandler(async (req, res) => {

        let userMessage = req.body.userMessage;
        const chatResponse = await chatWithGPT(userMessage)
        return sendResponse(res, 200, true, "Chat response", { chatResponse: chatResponse })
    }),


    uploadProfileImage: asyncHandler(async (req, res) => {
        if (!req?.files?.candidateImage) {
            return sendResponse(res, 400, false, "Candidate image is required")
        }


        const candidateImage = req.files.candidateImage
        if (candidateImage.size / 1024 > 200) {
            return sendResponse(res, 413, false, "Image size is too large.Selecte iamge below 200kb")
        }


        const imageExtension = candidateImage.name.split('.').pop();
        const imageName = `candidate_${Date.now()}_${Math.floor(Math.random() * 10000)}.${imageExtension}`;


        let savePath = `${paths.candidate.directoryPath}/${imageName}`

        await candidateImage.mv(savePath, (err, result) => {
            console.log(err)
        })


        let oldImageName = req.body?.old_image_name?.trim();
        let candidateId = req?.body?.id;
        if (oldImageName) {
            const oldImagePath = `${paths.candidate.directoryPath}/${oldImageName}`;
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }


        const [_result, _] = await candidateModel.updateImageName(imageName, candidateId)

        if (_result.affectedRows > 0) {
            req.session.candidate.image_name = imageName;
            return sendResponse(res, 200, true, "Profile image updated successfully")
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
            req.session.candidate = { ...req.session.candidate, candidateDetails }
            return sendResponse(res, 200, true, "Candidate details updated successfully")
        }
    }),

    shortlistCandidate: asyncHandler(async (req, res) => {
        const { candidate_id_fk: candidateId, job_id_fk: jobId } = req.body

        if (!candidateId || !jobId) {
            return sendResponse(res, 400, false, "Candidate and job id are required")
        }


        const [_existingEntries, _] = await candidateModel.shortlistedEntries(jobId, candidateId)

        console.log(_existingEntries);

        if (_existingEntries.length > 0) {
            return sendResponse(res, 409, false, "Candidate is already shortlisted for this job")
        }
        const [_result, _metadata] = await candidateModel.shortlist(jobId, candidateId)

        if (_result.affectedRows > 0) {
            return sendResponse(res, 200, true, "Candidate shortlisted successfully")
        }
    })
}


module.exports = candidateController 