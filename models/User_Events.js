
module.exports = function(sequelize, DataTypes) {
  var User_Events = sequelize.define('User_Events', {
    hasCommited: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
      tableName: 'user_event'

  });
  return User_Events;
};
