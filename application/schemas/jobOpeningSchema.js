const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");

const companySchema = require("./companySchema");


const jobOpeningSchema = sequelize.define("job_opening", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    job_title: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    job_description: {
        type: Sequelize.TEXT,
        allowNull: false,
    },

    job_salary: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0
    },

    job_location: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    job_type: {
        type: Sequelize.ENUM("Full-time", "Part-time", "Contract", "Internship"),
        allowNull: false,
    },

    company_id_fk: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: companySchema, // Assuming the company table is named 'companies'
            key: "id",
        },
        onDelete: "CASCADE",
    },

    job_status: {
        type: Sequelize.ENUM("Active", "Closed"),
        allowNull: false,
        defaultValue: "Active",
    },

    last_date_to_apply: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },

    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        comment: "Timestamp when the opening was created",
    },

    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        comment: "Timestamp when the opening was last updated",
    },
}, {
    timestamps: true, // Enables createdAt & updatedAt fields
    comment: "Table storing the job openings",
});

module.exports = jobOpeningSchema;
