'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('people', {
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
        first_name:{
          type: Sequelize.STRING,
          allowNull: false,
        },
        last_name:{
          type: Sequelize.STRING,
          allowNull: false,
        },
        age:{
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        relationship:{
          type: Sequelize.STRING,
          allowNull: true,
        },
        curiosities:{
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
      return queryInterface.dropTable('people');
  }
};
