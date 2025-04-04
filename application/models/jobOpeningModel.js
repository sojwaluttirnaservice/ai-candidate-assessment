const db = require("../config/db.connect");

// Define the job opening model using Sequelize
const jobOpeningModel = {

    // Add a new job opening
    add: (jobOpeningDetails) => {
        // The INSERT query using prepared statement
        let q = `INSERT INTO 
                    job_opening (
                        job_title,
                        job_description,
                        job_salary,
                        job_location,
                        job_type,
                        company_id_fk,
                        job_status,
                        last_date_to_apply
                    ) VALUES (?)`;

        const insertArray = [
            jobOpeningDetails.job_title,
            jobOpeningDetails.job_description,
            jobOpeningDetails.job_salary,
            jobOpeningDetails.job_location,
            jobOpeningDetails.job_type,
            jobOpeningDetails.company_id_fk,
            jobOpeningDetails.job_status || 'Active',  // Default to 'Active' if not provided
            jobOpeningDetails.last_date_to_apply
        ];

        return db.query(q, [insertArray]);
    },

    // Update an existing job opening
    update: (jobOpeningDetails) => {
        let q = `UPDATE job_opening SET
                    job_title = ?,
                    job_description = ?,
                    job_salary = ?,
                    job_location = ?,
                    job_type = ?,
                    company_id_fk = ?,
                    job_status = ?,
                    last_date_to_apply = ?
                  WHERE id = ?`;

        const updateArray = [
            jobOpeningDetails.job_title,
            jobOpeningDetails.job_description,
            jobOpeningDetails.job_salary,
            jobOpeningDetails.job_location,
            jobOpeningDetails.job_type,
            jobOpeningDetails.company_id_fk,
            jobOpeningDetails.job_status,
            jobOpeningDetails.last_date_to_apply,
            jobOpeningDetails.id
        ];

        return db.query(q, updateArray);
    },

    // Get all job openings (You can add filters like pagination)
    getAll: () => {
        let q = `SELECT 
                    id,
                    job_title,
                    job_description,
                    job_salary,
                    job_location,
                    job_type,
                    company_id_fk,
                    job_status,
                    last_date_to_apply,
                    createdAt,
                    updatedAt
                 FROM job_opening
                 ORDER BY createdAt DESC`;

        return db.query(q);
    },

    // Get a job opening by its ID
    getById: (jobId) => {
        let q = `SELECT 
                    id,
                    job_title,
                    job_description,
                    job_salary,
                    job_location,
                    job_type,
                    company_id_fk,
                    job_status,
                    last_date_to_apply,
                    createdAt,
                    updatedAt
                 FROM job_opening
                 WHERE id = ?`;

        return db.query(q, [jobId]);
    },

    // Get all job openings for a specific company
    getByCompany: (companyId) => {
        let q = `SELECT 
                    id,
                    job_title,
                    job_description,
                    job_salary,
                    job_location,
                    job_type,
                    company_id_fk,
                    job_status,
                    last_date_to_apply,
                    DATE_FORMAT(last_date_to_apply, "%d %b %Y") AS _last_date_to_apply,
                    createdAt,
                    DATE_FORMAT(createdAt, "%d %b %Y") AS _posted_on,
                    updatedAt
                 FROM job_opening
                 WHERE company_id_fk = ?
                 ORDER BY createdAt DESC`;

        return db.query(q, [companyId]);
    },

    // Get active job openings that are still open for applications
    getActiveOpenings: () => {
        let q = `SELECT 
                    id,
                    job_title,
                    job_description,
                    job_salary,
                    job_location,
                    job_type,
                    company_id_fk,
                    job_status,
                    last_date_to_apply,
                    DATE_FORMAT(last_date_to_apply, "%d %b %Y") AS _last_date_to_apply,

                    createdAt,
                    DATE_FORMAT(createdAt, "%d %b %Y") AS _posted_on,
                    updatedAt
                    FROM job_opening
                        WHERE job_status = 'Active'
                        AND last_date_to_apply >= CURRENT_DATE
              
                 ORDER BY createdAt DESC`;


        return db.query(q);
    },


    count: (companyId) => {
        let q = `SELECT COUNT(*) AS total_job_openings FROM job_opening WHERE company_id_fk = ?`;
        return db.query(q, [companyId]);
    },

    // Get job openings by skill (You can add an association with skills table if you want)
    // getBySkill: (skillId) => {
    //     let q = `SELECT 
    //                 j.id,
    //                 j.job_title,
    //                 j.job_description,
    //                 j.job_salary,
    //                 j.job_location,
    //                 j.job_type,
    //                 j.company_id_fk,
    //                 j.job_status,
    //                 j.last_date_to_apply,
    //                 j.createdAt,
    //                 j.updatedAt
    //              FROM job_opening AS j
    //              INNER JOIN job_skills AS js ON j.id = js.job_id_fk
    //              WHERE js.skill_id_fk = ? 
    //              ORDER BY j.createdAt DESC`;

    //     return db.query(q, [skillId]);
    // },

    // Delete a job opening by its ID
    delete: (jobId) => {
        let q = `DELETE FROM job_opening WHERE id = ?`;
        return db.query(q, [jobId]);
    },

    // Search job openings based on filters (example: by job title, location, job type, etc.)
    // search: (filters) => {
    //     let q = `SELECT 
    //                 id,
    //                 job_title,
    //                 job_description,
    //                 job_salary,
    //                 job_location,
    //                 job_type,
    //                 company_id_fk,
    //                 job_status,
    //                 last_date_to_apply,
    //                 createdAt,
    //                 updatedAt
    //              FROM job_opening
    //              WHERE 1=1`;

    //     const filterParams = [];

    //     // Dynamically add filters based on the search input
    //     if (filters.job_title) {
    //         q += ` AND job_title LIKE ?`;
    //         filterParams.push(`%${filters.job_title}%`);
    //     }
    //     if (filters.job_location) {
    //         q += ` AND job_location LIKE ?`;
    //         filterParams.push(`%${filters.job_location}%`);
    //     }
    //     if (filters.job_type) {
    //         q += ` AND job_type = ?`;
    //         filterParams.push(filters.job_type);
    //     }
    //     if (filters.job_status) {
    //         q += ` AND job_status = ?`;
    //         filterParams.push(filters.job_status);
    //     }
    //     if (filters.last_date_to_apply) {
    //         q += ` AND last_date_to_apply >= ?`;
    //         filterParams.push(filters.last_date_to_apply);
    //     }

    //     q += ` ORDER BY createdAt DESC`;

    //     return db.query(q, filterParams);
    // }
};

module.exports = jobOpeningModel;
