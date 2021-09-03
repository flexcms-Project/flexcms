'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        allowNull: false,
        type: Sequelize.STRING
      },
      creatorId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      url: {
        allowNull: false,
        type: Sequelize.STRING(1024)
      },
      thumbnail: {
        allowNull: false,
        type: Sequelize.STRING
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(1024)
      },
      titleToLowerCase: {
        allowNull: false,
        type: Sequelize.STRING(1024)
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING(1024)
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      totalViewed: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      mainView: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('articles');
  }
};