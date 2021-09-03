'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ UserModel }) {
      // define association here
      this.belongsTo(UserModel, { foreignKey: 'creatorId', as: 'creator'});
    }

    toJSON(){
      return {...this.get(), id:undefined, creatorId: undefined}
    };
  };
  Article.init({
    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'article cant generate uuid'},
        notEmpty: { msg: 'article cant generate uuid'}
      }
    },
    url: {
      type: DataTypes.STRING(1024),
      allowNull: false,
      validate: {
        notNull: { msg: 'article cant generate url'},
        notEmpty: { msg: 'article cant generate url'}
      }
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'article cant generate thumbnail'},
        notEmpty: { msg: 'article cant generate thumbnail'}
      }
    },
    title: {
      type: DataTypes.STRING(1024),
      allowNull: false,
      validate: {
        notNull: { msg: 'article cant generate title'},
        notEmpty: { msg: 'article cant generate title'}
      }
    },
    titleToLowerCase: {
      type: DataTypes.STRING(1024),
      allowNull: false,
      validate: {
        notNull: { msg: 'article cant generate title lower case'},
        notEmpty: { msg: 'article cant generate title lower case'}
      }
    },
    description: {
      type: DataTypes.STRING(1024),
      allowNull: false,
      validate: {
        notNull: { msg: 'article cant generate description'},
        notEmpty: { msg: 'article cant generate description'}
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: 'article cant generate content'},
        notEmpty: { msg: 'article cant generate content' }
      }
    },
    totalViewed: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    mainView: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'articles',
    modelName: 'ArticleModel',
  });
  return Article;
};