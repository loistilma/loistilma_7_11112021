'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User)
      this.belongsTo(models.Post)
    }
  };
  Comment.init({
    content: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [2, 255],
          msg: "Doit avoir une longueur entre 2 et 255 caractères"
        },
      },
    },
    UserId: DataTypes.INTEGER,
    PostId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};