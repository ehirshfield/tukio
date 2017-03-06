import bcrypt from 'bcryptjs';

module.exports = function (sequelize, DataTypes) {
    let User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
            timestamps: false
        });
    return User;
};
