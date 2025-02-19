const db = require("../config/db.connect");

const skillModel = {


    list: () => {
        let q = `SELECT * FROM skill`
        return db.query(q)
    }
}



module.exports = skillModel;
