const db = require("../config/db.connect");

const companyModel = {


    add: (companyData) => {
        let q = `
                INSERT INTO company (
                            company_name,
                            company_email,
                            company_password,
                            company_contact_number,
                            company_address,
                            company_established_year,
                            company_website,
                            company_hr_name,
                            company_hr_email,
                            company_hr_contact_number
                        ) VALUES (?)
        `
        const insertArray = [
            companyData.company_name,
            companyData.company_email,
            companyData.company_password,
            companyData.company_contact_number,
            companyData.company_address,
            companyData.company_established_year,
            companyData.company_website,
            companyData.company_hr_name,
            companyData.company_hr_email,
            companyData.company_hr_contact_number
        ]
        return db.query(q, [insertArray]);
    },

    getCompanyByEmail: (email) => {
        let q = `SELECT * FROM company WHERE company_email = ?`
        return db.query(q, [email])
    },

    count: () => {
        let q = `SELECT COUNT(*) AS total_companies FROM company`
        return db.query(q)
    },

    list: () => {
        let q = `
            SELECT 
                cp.id,
                cp.company_name,
                cp.company_email,
                cp.company_contact_number,
                cp.company_address,
                cp.company_established_year,
                cp.company_website,
                cp.company_hr_name,
                cp.company_hr_email,
                cp.company_hr_contact_number,
                COUNT(DISTINCT j.id) AS jobs_posted,  -- Count the number of jobs posted by each company
                COUNT(scr.id) AS shortlisted_candidates  -- Count the number of candidates shortlisted for jobs in the company
            FROM 
                company AS cp
            INNER JOIN 
                job_opening AS j 
            ON 
                j.company_id_fk = cp.id  -- Join job openings with companies based on company ID
            LEFT JOIN 
                shortlisted_candidate_relation AS scr 
            ON 
                scr.job_id_fk = j.id  -- Join shortlisted candidates with job openings (left join to include jobs with no shortlisted candidates)
            
            GROUP BY cp.id;  -- Group results by company to get counts per company

        `
        return db.query(q)
    },

    getById: (companyId) => {
        let q = `
            SELECT 
                cp.id,
                cp.company_name,
                cp.company_email,
                cp.company_contact_number,
                cp.company_address,
                cp.company_established_year,
                cp.company_website,
                cp.company_hr_name,
                cp.company_hr_email,
                cp.company_hr_contact_number,
                COUNT(DISTINCT j.id) AS jobs_posted,  -- Count the number of jobs posted by each company
                COUNT(scr.id) AS shortlisted_candidates  -- Count the number of candidates shortlisted for jobs in the company
            FROM 
                company AS cp
            INNER JOIN 
                job_opening AS j 
            ON 
                j.company_id_fk = cp.id  -- Join job openings with companies based on company ID
            LEFT JOIN 
                shortlisted_candidate_relation AS scr 
            ON 
                scr.job_id_fk = j.id  -- Join shortlisted candidates with job openings (left join to include jobs with no shortlisted candidates)
            WHERE
                cp.id = ?
            GROUP BY cp.id;  -- Group results by company to get counts per company

        `
        return db.query(q, [companyId])
    }
}


module.exports = companyModel;
