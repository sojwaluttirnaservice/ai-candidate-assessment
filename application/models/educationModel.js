const db = require("../config/db.connect");

const educationModel = {

    saveEducation: (educationDetails) => {
        const { candidate_id_fk, degree_type, institution_name, board_university, passing_year, percentage_cgpa, specialization } = educationDetails;

        let q = `INSERT INTO candidate_education (
                    candidate_id_fk,
                    degree_type,
                    institution_name,
                    board_university,
                    passing_year,
                    percentage_cgpa,
                    specialization
                ) VALUES (?, ?, ?, ?, ?, ?, ?)`;

        const insertArray = [candidate_id_fk, degree_type, institution_name, board_university, passing_year, percentage_cgpa, specialization];

        return db.query(q, insertArray);
    },

    existsDegreeForCandidate: (degreeType, candidateId) => {
        let q = `SELECT * FROM 
                candidate_education
             WHERE degree_type = ?
             AND candidate_id_fk =?`;

        return db.query(q, [degreeType, candidateId])
    },

    updateEducation: (educationDetails) => {
        const { id, institution_name, board_university, passing_year, percentage_cgpa, specialization } = educationDetails;

        let q = `UPDATE candidate_education SET
                    institution_name = ?,
                    board_university = ?,
                    passing_year = ?,
                    percentage_cgpa = ?,
                    specialization = ?
                WHERE id = ?`;

        const updateArray = [institution_name, board_university, passing_year, percentage_cgpa, specialization, id];

        return db.query(q, updateArray);
    },


    deleteEducation: (educationId) => {
        let q = `DELETE FROM candidate_education WHERE id =?`;
        return db.query(q, [educationId]);
    },

    getEducationByCandidateId: (candidateId) => {
        let q = `SELECT * FROM candidate_education WHERE candidate_id_fk = ? order by passing_year`;
        return db.query(q, [candidateId]);
    }
}

module.exports = educationModel;
