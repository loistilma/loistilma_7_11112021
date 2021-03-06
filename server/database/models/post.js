'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User)
      this.hasMany(models.Comment)
    }
  };
  Post.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [2, 255],
          msg: "Doit avoir une longueur entre 2 et 255 caractères"
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [2, 255],
          msg: "Doit avoir une longueur entre 2 et 255 caractères"
        },
      },
    },
    file: {
      type: DataTypes.STRING,
      /*
      validate: {
        isUrl: {
          args: true,
          msg: "Doit être une url"
        },
      },
      */
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};