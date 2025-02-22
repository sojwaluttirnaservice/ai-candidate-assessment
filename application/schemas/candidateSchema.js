const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");

// Define the Skill schema
const candidateSchema = sequelize.define("candidate", {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: "Unique identifier for each candidate",
    },

    name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
            len: [2, 50], // Ensures the skill name is between 2 and 50 characters
            notEmpty: true,
            notNull: true,
        },
        comment: "Name of the candidate",
    },

    email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unqiue: true,
        validate: {
            isEmail: true,
        },
        comment: "Email of the candidate",
    },

    mobile: {
        type: Sequelize.STRING(12),
        allowNull: false,
        validate: {
            len: [10, 12],
        },
        comment: "Mobile number of the candidate",
    },


    password: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
            len: [8, 100],
        },
        comment: "Password of the candidate",
    },

    gender: {
        type: Sequelize.ENUM('Male', 'Female', 'Other'),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
        },
        comment: "Gender of the candidate",
    },


    candidate_status: {
        type: Sequelize.ENUM('SUSPENDED', 'ACTIVE', "INACTIVE"),
        allowNull: false,
        defaultValue: 'ACTIVE',
        comment: "Whether the candidate is suspended or not",
    },

    years_of_experience: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        comment: "Years of experience of the candidate",
    },

    candidate_summary: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: false,
        },
        comment: "Summary of the candidate",
    },

    candidate_objective: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Objective of the candidate",
    },

    candidate_description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: false,
        },
        comment: "Description of the candidate",
    },

    image_name: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defautValue: '',
        comment: "Name of the image uploaded for the candidate",
    },

    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        comment: "Timestamp when the skill was created",
    },

    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        comment: "Timestamp when the skill was last updated",
    },
}, {
    timestamps: true, // Enables createdAt & updatedAt fields
    comment: "Table storing the Candidate Personal Details",
});

// Export the model
module.exports = candidateSchema;