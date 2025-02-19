const db = require("../config/db.connect");
const asyncHandler = require("../utils/asyncHandler");

const candidateModel = {

    add: (insertData) => {
        let q = `INSERT INTO candidate 
                (
                    name,
                    email,
                    password,
                    mobile,
                    gender,
                    years_of_experience
                ) VALUES (?)
                `

        const insertArray = [
            insertData.name,
            insertData.email,
            insertData.password,
            insertData.mobile,
            insertData.gender,
            insertData.years_of_experience
        ]

        return db.query(q, [insertArray])
    },

    update: (updateData) => {
        let q = `UPDATE candidate SET 
                name = ?,
                email = ?,
                password = ?,
                mobile = ?,
                gender = ?,
                years_of_experience = ?
                WHERE id = ?
                `

        const updateArray = [
            updateData.name,
            updateData.email,
            updateData.password,
            updateData.mobile,
            updateData.gender,
            updateData.years_of_experience,
            updateData.id
        ]

        return db.query(q, updateArray)
    },

    getCandidateById: (id) => {
        let q = `SELECT * FROM candidate WHERE id = ?`

        return db.query(q, [id])
    },

    getCandidateByEmail: (email) => {
        let q = `SELECT * FROM candidate WHERE email = ?`

        return db.query(q, [email])
    },

    getCandidateByMobile: (mobile) => {
        let q = `SELECT * FROM candidate WHERE mobile = ?`

        return db.query(q, [mobile])
    },

    getCandidatesBySkills: (skills) => {
        // The 'skills' parameter is an array of skill IDs (e.g., [1, 2, 3])
        
        // Build the SQL query
        let q = `SELECT 
                        c.id,
                        c.name,
                        c.email,
                        c.mobile,
                        c.gender,
                        c.years_of_experience,
                        
                        -- Aggregate all skills related to the candidate into a JSON array
                        JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'id', s.id,               -- Skill ID
                                'skill_name', s.skill_name, -- Skill name
                                'description', s.description -- Skill description
                            )
                        ) AS candidate_skills
    
                  FROM candidate AS c
                  INNER JOIN candidate_skills AS cs
                      ON c.id = cs.candidate_id_fk
                  INNER JOIN skill AS s
                      ON cs.skill_id_fk = s.id
                  WHERE c.id IN (
                      SELECT DISTINCT c.id
                      FROM candidate AS c
                      INNER JOIN candidate_skills AS cs
                          ON c.id = cs.candidate_id_fk
                      INNER JOIN skill AS s
                          ON cs.skill_id_fk = s.id
                      WHERE s.id IN (${skills.map(() => '?').join(', ')})  -- Bind skills dynamically
                  )
                  GROUP BY c.id
                  ORDER BY c.years_of_experience DESC`;
    
        // Execute the query with the 'skills' array passed as values
        return db.query(q, skills);  // The 'skills' array will replace the '?' placeholders
    },
    


}

module.exports = candidateModel;
