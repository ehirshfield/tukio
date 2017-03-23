module.exports = function(sequelize, DataTypes) {
  var Credit_Card = sequelize.define('Credit_Card', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      card_number: {
        type: DataTypes.STRING,
        allowNull: false
      },
      expiration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
                isLongEnough: function (val) {
                if (val.length != 4) {
                    throw new Error("Please enter expiry date and month (mmyy)")
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
                if (val.length != 5) {
                    throw new Error("Please enter 5 digit zip code")
                    }
                }
            }
      }

    }, {
        tableName: 'credit_card',
        classMethods: {
          associate: function(models){
            Credit_Card.belongsTo(models.User, {
              foreignKey: {
                  allowNull: false
                }
            });
          }
        }
    });
    return Credit_Card;

};
