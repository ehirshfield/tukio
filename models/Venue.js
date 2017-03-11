'use strict';
module.exports = function(sequelize, DataTypes) {
  var Venue = sequelize.define('Venue', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Venue.belongsTo(models.Event, {
          foreignKey: {
              allowNull: false
            }
        });
      }
    }
  });
  return Venue;
};
