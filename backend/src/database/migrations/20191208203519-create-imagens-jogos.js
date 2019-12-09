'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('images', {
        id:{
          type: Sequelize.INTEGER, 
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
        },
        name:{
          type: Sequelize.STRING,
          allowNull: false,
        }, 
        category:{
          type: Sequelize.STRING,
          allowNull: false,
        },
        path: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('images');
  }
};
