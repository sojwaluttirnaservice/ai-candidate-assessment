const skillModel = require("../../models/skillModel");
const asyncHandler = require("../../utils/asyncHandler");
const { sendResponse } = require("../../utils/responses/ApiResponse");

const skillController = {

    addSkillCandidateRelation: asyncHandler(async (req, res) => {
        const { skill_id_fk: skillId, candidate_id_fk: candidateId } = req.body;


        if (!skillId || !candidateId) {
            return sendResponse(res, 400, false, 'Either skill or candidate missing')
        }


        const [_existingRelation, _metadata] = await skillModel.checkSkillCandidateRelation(skillId, candidateId)

        if (_existingRelation.length) {
            return sendResponse(res, 400, false, 'Skill-Candidate relation already exists')
        }

        const [_result, _] = await skillModel.addSkillCandidateRelation(skillId, candidateId)

        if (_result.affectedRows > 0) {
            return sendResponse(res, 200, true, 'Skill added successfully')
        }
    }),


    deleteSkillCandidateRelation: asyncHandler(async (req, res) => {
        const { skill_id_fk: skillId, candidate_id_fk: candidateId } = req.body;


        if (!skillId || !candidateId) {
            return sendResponse(res, 400, false, 'Either skill or candidate missing')
        }
        
        const [_existingRelation, _metadata] = await skillModel.checkSkillCandidateRelation(skillId, candidateId)

        if (!_existingRelation.length) {
            return sendResponse(res, 400, false, 'Skill already was not present ')
        }


        const [_result, _] = await skillModel.deleteSkillCandidateRelation(skillId, candidateId)

        if (_result.affectedRows > 0) {
            return sendResponse(res, 200, true, 'Skill removed successfully')
        }

    })

}


module.exports = skillController