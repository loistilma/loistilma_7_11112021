'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Post)
      this.hasMany(models.Comment)
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: /^[A-Za-z][A-Za-z0-9]*$/,
          msg: "Doit avoir que des lettres et des chiffres"
        },
        len: {
          args: [2, 20],
          msg: "Doit avoir une longueur entre 2 et 20 caractères"
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "Doit être une adresse email"
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 255],
          msg: "Doit avoir une longueur entre 8 et 255 caractères"
        },
      },
    },
    isModerator: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};