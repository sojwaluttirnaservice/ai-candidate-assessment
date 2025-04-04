const candidateModel = require("../../models/candidateModel");
const jobOpeningModel = require("../../models/jobOpeningModel");
const skillModel = require("../../models/skillModel");
const asyncHandler = require("../../utils/asyncHandler");
const { renderPage } = require("../../utils/responses/ApiResponse");

const resumeController = {


    renderCandidateResumePage: asyncHandler(async (req, res) => {

        const { candidateId } = req.params;
        const [_candidateSkills, _metadata] = await candidateModel.getCandiateSkills(candidateId)


        // console.log(_candidateSkills)

        const [_candidate, _] = await candidateModel.getCandidateById(candidateId)

        const [_skills, _metadat] = await skillModel.list();
        const [_education, _m] = await candidateModel.getCandidateEducation(candidateId);

        let jobs = [];

        if (req.session?.company) {
            let [_jobs, _met] = await jobOpeningModel.getByCompany(req.session?.company?.id)
            jobs = _jobs;
        }
        renderPage(res, 'resume/candidate-resume.ejs', { title: 'Profile', candidate: _candidate[0], skills: _skills, candidateSkills: _candidateSkills, candidateEducation: _education, company: req.session.company, jobs })
    })
}


module.exports = resumeController;