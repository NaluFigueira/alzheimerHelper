import Sequelize, {Model} from 'sequelize';
import bcrypt from 'bcryptjs';

export default class User extends Model{
  static init(sequelize){
    super.init({
      email: Sequelize.STRING,
      password: Sequelize.VIRTUAL,
      password_hash: Sequelize.STRING,
    },{
      sequelize
    })
    
    this.addHook('beforeSave', async user => {
      if(user.password){
        user.password_hash = await bcrypt.hashSync(user.password,8);
      }
    })
  }

  checkPassword(password){
    return bcrypt.compare(password, this.password_hash);
  }
}