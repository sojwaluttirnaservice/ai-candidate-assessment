const db = require("../config/db.connect");

const skillModel = {


    list: () => {
        let q = `SELECT * FROM skill`
        return db.query(q)
    },
    addSkillCandidateRelation: (skillId, candidateId) => {
        let q = `INSERT INTO 
                    candidate_skills 
                (skill_id_fk,
                candidate_id_fk) 
                VALUES (?,?)`;
        return db.query(q, [skillId, candidateId])

    },

    deleteSkillCandidateRelation: (skillId, candidateId) => {
        let q = `DELETE FROM 
                    candidate_skills 
                WHERE skill_id_fk = ? AND candidate_id_fk = ?`
        return db.query(q, [skillId, candidateId])
    },


    checkSkillCandidateRelation: (skillId, candidateId) => {
        let q = `SELECT * 
                    FROM 
                candidate_skills 
        
                WHERE skill_id_fk = ?
                AND candidate_id_fk =?`;


        return db.query(q, [skillId, candidateId])
    }

}



module.exports = skillModel;


