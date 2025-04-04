const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");
const skillSchema = require("./skillSchema");
const candidateSchema = require("./candidateSchema");



const candidateSkillsSchema = sequelize.define("candidate_skills", {
    id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    skill_id_fk: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: skillSchema,
            key: 'id'
        },
        comment: 'Id of the skill schema as foreign key here'
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
    comment: "Relations between candidates and skills"
});

module.exports = candidateSkillsSchema;

