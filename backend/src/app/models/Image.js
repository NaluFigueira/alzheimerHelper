import Sequelize, {Model} from 'sequelize';

export default class Image extends Model{
  static init(sequelize){
    super.init({
      name: Sequelize.STRING,
      category: Sequelize.STRING,
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
}