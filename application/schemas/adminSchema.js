const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");



const adminSchema = sequelize.define("admin", {
    id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        comment: "Username of the admin"
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            min: 5,
            notEmpty: true,
            notNull: true,
        },
        comment: "Password of the admin"
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
    comment: "Table storing the admins"
});

module.exports = adminSchema;

