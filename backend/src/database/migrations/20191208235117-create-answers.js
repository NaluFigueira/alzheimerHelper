'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('answers', {  
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        answer: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        correct: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        question_id:{
          type: Sequelize.INTEGER,
          references:{
            model: 'questions',
            key: 'id'
          },
          onUpdate:'CASCADE',
          onDelete: 'SET NULL'
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
      return queryInterface.dropTable('answers');
  }
};
