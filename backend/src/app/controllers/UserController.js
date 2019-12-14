import User from '../models/User';
import * as Yup from 'yup';

class UserController{
  async store(req,res){
      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().min(6).required(),
      });
      if(!(await schema.isValid(req.body)))
        return res.status(400).json({error: "Invalid entry data!"});
      const {email} = req.body; 
      const user = await User.findOne({where: {email}});
      if(user)
        return res.status(400).json({error: "This user already exists!"});
      const newUser = await User.create(req.body);
      return res.json(newUser);
  }
}

export default new UserController();