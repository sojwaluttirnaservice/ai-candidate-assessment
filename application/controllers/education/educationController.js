const educationModel = require("../../models/educationModel");
const asyncHandler = require("../../utils/asyncHandler");
const { sendResponse } = require("../../utils/responses/ApiResponse");

const educationController = {

    saveEducation: asyncHandler(async (req, res) => {
        let educationDetails = req.body;
        const { candidate_id_fk, degree_type, institution_name, board_university, passing_year, percentage_cgpa, specialization } = educationDetails


        let [_existingEducationEntryForCandidateDegree, _] = await educationModel.existsDegreeForCandidate(degree_type, candidate_id_fk)


        console.log(_existingEducationEntryForCandidateDegree)
        if (_existingEducationEntryForCandidateDegree.length > 0) {
            return sendResponse(res, 400, false, `Education details of ${degree_type} already exists`);
        }

        if (!candidate_id_fk || !board_university || !degree_type || !institution_name || !passing_year || !percentage_cgpa || !specialization) {
            return sendResponse(res, 400, false, 'All Fields required fields');
        }


        const [_result, _metadata] = await educationModel.saveEducation(educationDetails)


        if (_result.affectedRows > 0) {
            return sendResponse(res, 200, true, 'Education saved successfully');
        }
    }),

    updateEducation: asyncHandler(async (req, res) => {
        let educationDetails = req.body;
        const { candidate_id_fk, degree_type, institution_name, board_university, passing_year, percentage_cgpa, specialization, id } = educationDetails


        if (!board_university || !degree_type || !institution_name || !passing_year || !percentage_cgpa || !specialization) {
            return sendResponse(res, 400, false, 'All Fields required fields');
        }




        console.log('hiiiii')
        console.log(req.body)
        if (!id) {
            return sendResponse(res, 400, false, 'Education ID is required');
        }

        const [_result, _metadata] = await educationModel.updateEducation(educationDetails);

        if (_result.affectedRows > 0) {
            return sendResponse(res, 200, true, 'Education updated successfully');
        } else {
            return sendResponse(res, 404, false, 'Failed to update education or record not found');
        }
    }),

    deleteEducation: asyncHandler(async (req, res) => {
        const { id } = req.body;




        if (!id) {
            return sendResponse(res, 400, false, 'Education ID is required');
        }

        const [_result, _metadata] = await educationModel.deleteEducation(id);

        if (_result.affectedRows > 0) {
            return sendResponse(res, 200, true, 'Education deleted successfully');
        } else {
            return sendResponse(res, 404, false, 'Failed to delete education or record not found');
        }
    })

}

module.exports = educationController