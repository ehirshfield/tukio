
module.exports = function(sequelize, DataTypes) {
  var User_Events = sequelize.define('User_Events', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    hasCommited: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
      tableName: 'user_event',
      classMethods: {
            associate: function(models) {
                User_Events.belongsTo(models.User);
                User_Events.belongsTo(models.Event);
            }
        }

  });
  return User_Events;
};
