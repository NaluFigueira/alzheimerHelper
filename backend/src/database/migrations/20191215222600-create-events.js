'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('events', {
        id:{
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
        },
        user_id:{
          type: Sequelize.INTEGER,
          references:{
            model: 'users',
            key: 'id'
          },
          onUpdate:'CASCADE',
          onDelete: 'SET NULL'
        },
        path: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        name:{
          type: Sequelize.STRING,
          allowNull: false,
        },
        local:{
          type: Sequelize.STRING,
          allowNull: true,
        },
        details:{
          type: Sequelize.STRING,
          allowNull: true,
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

  down: (queryInterface) => {
      return queryInterface.dropTable('events');
  }
};
