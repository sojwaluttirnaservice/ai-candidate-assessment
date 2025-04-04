const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");

// Define the Company schema
const companySchema = sequelize.define("company", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: "Unique identifier for each company",
    },

    company_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: "Name of the company",
    },

    company_email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
        comment: "Email address of the company",
    },


    company_password: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: "Password of the company",
    },

    company_contact_number: {
        type: Sequelize.STRING(15),
        allowNull: true,
        validate: {
            len: [10, 15],
        },
        comment: "Contact number of the company",
    },

    company_address: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Address of the company",
    },

    company_established_year: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "Year when the company was established",
    },

    company_website: {
        type: Sequelize.STRING(100),
        allowNull: true,
        comment: "Website URL of the company",
    },

    // HR Details
    company_hr_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: "Name of the HR contact person",
    },

    company_hr_email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
            isEmail: true,
        },
        comment: "Email address of the HR contact person",
    },

    company_hr_contact_number: {
        type: Sequelize.STRING(15),
        allowNull: true,
        validate: {
            len: [10, 15],
        },
        comment: "Contact number of the HR person",
    },

    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        comment: "Timestamp when the company record was created",
    },

    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        comment: "Timestamp when the company record was last updated",
    },
}, {
    timestamps: true, // Enables createdAt & updatedAt fields
    comment: "Table storing company and HR details",
});

// Export the model
module.exports = companySchema;
