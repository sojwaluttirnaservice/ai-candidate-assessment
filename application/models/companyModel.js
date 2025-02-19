const db = require("../config/db.connect");

const companyModel = {

    getCompanyByEmail: (email) => {
        let q = `SELECT * FROM company WHERE company_email = ?`

        return db.query(q, [email])
    }
}


module.exports = companyModel;
