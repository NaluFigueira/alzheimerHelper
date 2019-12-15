import Sequelize, {Model} from 'sequelize';

export default class Person extends Model{
  static init(sequelize){
    super.init({
      first_name: Sequelize.STRING,
      last_name: Sequelize.STRING,
      age: Sequelize.INTEGER,
      relationship: Sequelize.STRING,
      curiosities: Sequelize.STRING,
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