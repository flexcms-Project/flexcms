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
    static associate({ ArticleModel }) {
      // define association here
      this.hasMany(ArticleModel, {foreignKey: 'creatorId', as: 'articles'});
    }

    toJSON(){
      return {...this.get()}
    }
  };
  User.init({
    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'article cant generate uuid'},
        notEmpty: { msg: 'article cant generate uuid'}
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a name'},
        notEmpty: { msg: 'Name must not empty' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have an email'},
        notEmpty: { msg: 'Email must not empty' },
        isEmail: { msg: 'Must be valid email'}
      }
    },
    hashed: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a password'},
        notEmpty: { msg: 'password must not empty' }
      }
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'creator'
    },
    about: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    profilePicture: {
      type: DataTypes.STRING,
      defaultValue: 'profilepictures/default-profile-picture.jpg'
    }
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'UserModel',
  });
  return User;
};