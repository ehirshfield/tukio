'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    text: {
      type: DataTypes.STRING,
      allowNull: false
    }

  }, {
    tableName: 'comment',
    classMethods: {
      associate: function(models) {
        Comment.belongsTo(models.Event, {
          foreignKey: {
              allowNull: false
            }
        });
      }
    }
  });
  return Comment;
};
