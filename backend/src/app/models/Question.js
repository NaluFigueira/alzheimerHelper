import Sequelize, {Model} from 'sequelize';

export default class Question extends Model{
  static init(sequelize){
    super.init({
      question: Sequelize.STRING,
      image_id: Sequelize.INTEGER,
    },
    {
      sequelize
    }
    )
  }

  static associate(models){
    this.belongsTo(models.Image, {
      foreignKey: 'image_id',
      as: 'image'
    })
  }
}