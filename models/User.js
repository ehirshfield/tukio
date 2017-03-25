import bcrypt from 'bcryptjs';

module.exports = function(sequelize, DataTypes) {
    let User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }

    }, {
      tableName: 'user',
      classMethods: {
            associate: function(models) {
                User.hasMany(models.Credit_Card);
                User.hasMany(models.User_Events);
            }
        },
        timestamps: false

    });
    return User;
};
