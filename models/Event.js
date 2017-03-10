'use strict';
module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    localDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    commits: {
      type: DataTypes.INTEGER,
      default: 0
    },
    commits_goal: {
      type: DataTypes.INTEGER
    }
  }, {
    classMethods: {
      associate: function(models) {
        Event.belongsToMany(models.User, {
          as: "User",
          through: "User_Events",
          foreignKey: "Event_Id"
        });
        Event.belongsTo(models.Venue, {
          foreignKey: {
              allowNull: false
            }
        });
        Event.hasMany(models.Comment)
      }
    }
  });
  return Event;
};
