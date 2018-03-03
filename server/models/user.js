'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  }, {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
          User.hasMany(models.Message, {
            onDelete: 'CASCADE',
            foreignKey: 'senderId'
          });

          User.hasMany(models.Message, {
            onDelete: 'CASCADE',
            foreignKey: 'receiverId'
          });
        }
      }
    });
  return User;
};
