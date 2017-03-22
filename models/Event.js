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
    venue_name: {
      type: DataTypes.STRING
    },
    venue_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    commits: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    commits_goal: {
      type: DataTypes.INTEGER,
      defaultValue: 100
    }
  }, {
    tableName: 'event',
    classMethods: {
      associate: function(models) {
        Event.belongsToMany(models.User, {
          as: "User",
          through: "User_Events",
          foreignKey: "Event_Id"
        });
        Event.hasMany(models.Comment)
      }
    }
  });
  return Event;
};
