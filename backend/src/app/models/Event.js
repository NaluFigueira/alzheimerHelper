import Sequelize, {Model} from 'sequelize';

export default class Event extends Model{
  static init(sequelize){
    super.init({
      name: Sequelize.STRING,
      local: Sequelize.STRING,
      details: Sequelize.STRING,
      path: Sequelize.STRING,
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${process.env.APP_URL}/files/${this.path}`;
        },
      },
    },
    {
      sequelize
    }
    )
  }

  static associate(models){
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    })
  }
}