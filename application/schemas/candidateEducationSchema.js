
const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");
const candidateSchema = require("./candidateSchema");

// Define the Candidate Education Schema
const candidateEducationSchema = sequelize.define("candidate_education", {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: "Unique identifier for each education record",
    },

    candidate_id_fk: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: candidateSchema,
            key: 'id'
        },
        onDelete: "CASCADE",
        comment: "Reference to candidate table",
    },

    degree_type: {
        type: Sequelize.ENUM("10th", "12th", "Diploma", "Undergraduate", "Postgraduate", "PhD"),
        allowNull: false,
        comment: "Education level (10th, 12th, UG, PG, etc.)",
    },

    institution_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: "Name of the school/college/university",
    },

    board_university: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: "Board or University name (e.g., CBSE, State Board, XYZ University)",
    },

    passing_year: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 1900,
            max: new Date().getFullYear(),
        },
        comment: "Year of completion",
    },

    percentage_cgpa: {
        type: Sequelize.FLOAT,
        allowNull: true,
        validate: {
            min: 0.0,
            max: 100.0,
        },
        comment: "Percentage or CGPA obtained",
    },

    specialization: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: "Major/Subject specialization (e.g., Science, Commerce, Computer Science)",
    },

    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        comment: "Timestamp when the education record was created",
    },

    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
        comment: "Timestamp when the education record was last updated",
    },

}, {
    timestamps: true, // Enables createdAt & updatedAt fields
    tableName: "candidate_education",
    comment: "Stores educational qualifications of candidates",
});

// Define Relationship
candidateSchema.hasMany(candidateEducationSchema, { foreignKey: "candidate_id_fk" });
candidateEducationSchema.belongsTo(candidateSchema, { foreignKey: "candidate_id_fk" });

// Export the model
module.exports = candidateEducationSchema;
