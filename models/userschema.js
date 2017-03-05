import bcrypt from 'bcryptjs';

module.exports = function (sequelize, DataTypes) {
    let User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
            timestamps: false
        });
    return User;
};
