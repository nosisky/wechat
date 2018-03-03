'use strict';
module.exports = (sequelize, DataTypes) => {
  var Message = sequelize.define('Message', {
    senderId: DataTypes.STRING,
    receiverId: DataTypes.STRING,
    message: DataTypes.TEXT,
    identifier: {
      type: DataTypes.STRING,
      defaultValue: 0
    }
  }, {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
          Message.belongsTo(models.User, {
            onDelete: 'CASCADE',
            foreignKey: 'receiverId'
          });

          Message.belongsTo(models.User, {
            onDelete: 'CASCADE',
            foreignKey: 'senderId'
          });
        }
      }
    });
  return Message;
};
