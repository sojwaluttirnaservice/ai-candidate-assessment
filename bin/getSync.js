
const sequelize = require('../application/config/sequelize');
const adminSchema = require('../application/schemas/adminSchema');
const candidateSchema = require('../application/schemas/candidateSchema');
const candidateSkillsSchema = require('../application/schemas/candidateSkillsSchema');
const companySchema = require('../application/schemas/companySchema');
const jobOpeningSchema = require('../application/schemas/jobOpeningSchema');
const shortlistedCandidateRelationSchema = require('../application/schemas/shortlistedCandidateRelationSchema');
const skillSchema = require('../application/schemas/skillSchema');






const getSync = () => {
    sequelize
        .sync({ alter: true })
        .then(() => {
            console.log(
                '\x1b[47m", \x1b[30m%s\x1b[0m',
                'Database has been migrated successfully, you can now start the server.'
            );
            console.log('\x1b[47m", \x1b[30m%s\x1b[0m', 'Use command: npm start (to start the server)');
            process.exit();
        })
        .catch((err) => {
            console.log(err);
        });
};
module.exports = getSync;
