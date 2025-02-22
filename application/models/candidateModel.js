const db = require("../config/db.connect");
const candidateModel = {

    add: (insertData) => {
        let q = `INSERT INTO candidate 
                (
                    name,
                    email,
                    password,
                    mobile,
                    gender,
                    years_of_experience,
                    image_name,
                    candidate_summary,
                    candidate_description,
                    candidate_objective
                ) VALUES (?)
                `

        const insertArray = [
            insertData.name,
            insertData.email,
            insertData.password,
            insertData.mobile,
            insertData.gender,
            insertData.years_of_experience,
            insertData.image_name || '',
            insertData.candidate_summary || '',
            insertData.candidate_description || '',
            insertData.candidate_objective || ''
        ]

        return db.query(q, [insertArray])
    },

    update: (updateData) => {
        console.log(updateData);
        let q = `UPDATE candidate SET 
                name = ?,
                email = ?,
                mobile = ?,
                gender = ?,

                years_of_experience = ?,
                candidate_summary = ?,
                candidate_description = ?,
                candidate_objective = ?

                WHERE id = ?
                `

        const updateArray = [
            updateData.name,
            updateData.email,
            updateData.mobile,
            updateData.gender,

            updateData.years_of_experience,
            updateData.candidate_summary || '',
            updateData.candidate_description || '',
            updateData.candidate_objective || '',

            updateData.id
        ]
        return db.query(q, updateArray)
    },

    updateImageName: (imageName, candidateId) => {
        let q = `UPDATE candidate SET image_name = ? WHERE id =?`
        return db.query(q, [imageName, candidateId])
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
                        c.candidate_status,
                        c.image_name,
                        
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
                      WHERE c.candidate_status = ? AND s.id IN (${skills.map(() => '?').join(', ')})  -- Bind skills dynamically
                  )
                  GROUP BY c.id
                  ORDER BY c.years_of_experience DESC`;

        let candidateStatus = 'ACTIVE'
        // Execute the query with the 'skills' array passed as values
        return db.query(q, [candidateStatus, ...skills]);  // The 'skills' array will replace the '?' placeholders
    },


    count: () => {
        let q = `SELECT COUNT(*) AS total_candidates FROM candidate`

        return db.query(q)
    },

    list: () => {
        const q =

            `SELECT 
                        c.id,
                        c.name,
                        c.email,
                        c.mobile,
                        c.gender,
                        c.years_of_experience,
                        c.candidate_status,
                        c.image_name,
                        
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
                  GROUP BY c.id
                  ORDER BY c.years_of_experience DESC`;
        return db.query(q)
    },

    getCandiateSkills: (candidateId) => {
        let q = `
                SELECT 
                    s.id AS skill_id,
                    s.skill_name,
                    c.id AS candidate_id,
                    c.image_name
                FROM 
                    candidate_skills cs
                JOIN 
                    skill s ON cs.skill_id_fk = s.id
                JOIN 
                    candidate c ON cs.candidate_id_fk = c.id
                WHERE 
                    c.id = ?;
                `

        return db.query(q, [candidateId])
    },


    getCandidateEducation: (candidateId) => {

        let q = `SELECT
                    id,
                    candidate_id_fk as candidate_id,
                    degree_type,
                    institution_name,
                    board_university,
                    passing_year,
                    percentage_cgpa,
                    specialization,
                  
                    createdAt,
                    updatedAt
                
                FROM 
                    candidate_education
                WHERE 
                    candidate_id_fk = ?
                ORDER BY 
                    passing_year ASC;`

        return db.query(q, [candidateId])
    },
    shortlist: (jobId, candidateId) => {
        let q = `INSERT INTO shortlisted_candidate_relation
                (
                job_id_fk,
                candidate_id_fk
                ) VALUES (?, ?)`


        return db.query(q, [jobId, candidateId])

    },

    shortlistedEntries: (jobId, candidateId) => {
        console.log(jobId, candidateId);
        let q = `SELECT * FROM shortlisted_candidate_relation WHERE job_id_fk = ? AND candidate_id_fk =?`
        return db.query(q, [jobId, candidateId])
    }

}

module.exports = candidateModel;
