import Sequelize, {Model} from 'sequelize';

export default class Answer extends Model{
  static init(sequelize){
    super.init({
      answer: Sequelize.STRING,
      correct: Sequelize.BOOLEAN,
      question_id: Sequelize.INTEGER,
    },
    {
      sequelize
    }
    )
  }

  static associate(models){
    this.belongsTo(models.Image, {
      foreignKey: 'question_id',
      as: 'question'
    })
  }
}