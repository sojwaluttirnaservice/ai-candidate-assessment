const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");

const candidateSchema = require("./candidateSchema");
const jobOpeningSchema = require("./jobOpeningSchema");


const shortlistedCandidateRelationSchema = sequelize.define("shortlisted_candidate_relation", {
    id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    job_id_fk: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: jobOpeningSchema,
            key: 'id'
        },
        comment: 'Id of the job opening schema as foreign key here'
    },

    candidate_id_fk: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: candidateSchema,
            key: 'id'
        },
        comment: 'Id of the candidate schema as foreign key here'
    },

    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: ""
    },

    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: ""
    }
}, {
    timestamps: true,
    comment: "Relations between candidates and job for shortlisted roles"
});

module.exports = shortlistedCandidateRelationSchema;

