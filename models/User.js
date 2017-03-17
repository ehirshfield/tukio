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
        },
        card_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isLongEnough: function (val) {
                if (val.length < 16) {
                    throw new Error("Please enter full bank card number")
                    }
                }
            }
        },
        card_expiry: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isLongEnough: function (val) {
                if (val.length < 4) {
                    throw new Error("Please enter expiry date and month (mm/yy)")
                    }
                }
            }
        },
        security_code: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        zip_code: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isLongEnough: function (val) {
                if (val.length < 5) {
                    throw new Error("Please enter 5 digit zip code")
                    }
                }
            }
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