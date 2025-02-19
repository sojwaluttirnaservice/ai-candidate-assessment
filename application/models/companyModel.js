const db = require("../config/db.connect");

const companyModel = {

    getCompanyByEmail: (email) => {
        let q = `SELECT * FROM company WHERE company_email = ?`

        return db.query(q, [email])
    },

    count: () => {
        let q = `SELECT COUNT(*) AS total_companies FROM company`

        return db.query(q)
    }
}


module.exports = companyModel;
