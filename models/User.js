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
        },
        fullName: {
          type: DataTypes.STRING
        },
        username:{
          type: DataTypes.STRING
        },
        publicProfile: {
          type: DataTypes.BOOLEAN,
          default: true
        }

    }, {
        classMethods: {
        associate: function(models) {
          User.belongsToMany(models.Event, {
            as: "Event",
            through: "User_Events",
            foreignKey: "User_Id"
          });
        }
      },
        timestamps: false

    });
    return User;
};
