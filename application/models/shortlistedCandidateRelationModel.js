const db = require("../config/db.connect")

const shortlistedCandidateRelationModel = {

    shortlist: (candiateId, jobId) => {

        let q = `INSERT INTO 
                (
                    candidate_id_fk,
                    job_id_fk
                )
                VALUES
                (?)`

        return db.query(q, [candiateId, jobId])
    },

    getShortlistedCandidates: (jobId) => {

        let q = `
                    SELECT 
                        c.id,
                        c.name,
                        c.email,
                        c.gender,
                        c.years_of_experience,
                        sc.job_id_fk AS job_id,
                        JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'id', s.id,
                                'skill_name', s.skill_name,
                                'description', s.description
                            )
                        ) AS candidate_skills
                    FROM 
                        shortlisted_candidate_relation AS sc
                    INNER JOIN 
                        candidate AS c ON c.id = sc.candidate_id_fk
                    INNER JOIN 
                        candidate_skills AS cs ON cs.candidate_id_fk = c.id
                    INNER JOIN 
                        skill AS s ON s.id = cs.skill_id_fk
                    WHERE 
                        sc.job_id_fk = ?
                    GROUP BY 
                        sc.id, c.id
                    ORDER BY 
                        c.years_of_experience DESC;
            `

        return db.query(q, [jobId])
    },

    count: (companyId) => {

        
        let q = `SELECT COUNT(*) AS shortlisted_count
                    FROM 
                        shortlisted_candidate_relation scr
                    JOIN 
                        job_opening jo 
                    ON 
                        scr.job_id_fk = jo.id
                    WHERE 
                        jo.company_id_fk = ?`
        return db.query(q, [companyId])
    }

}

module.exports = shortlistedCandidateRelationModel