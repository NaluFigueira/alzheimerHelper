import User from '../models/User';
import auth from '../../config/auth';
import * as Yup from 'yup';
import jwt from 'jsonwebtoken';

class UserController{
  async store(req,res){
      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().min(6).required(),
      });
      if(!(await schema.isValid(req.body)))
        return res.status(400).json({error: "Invalid entry data!"});
      
      const {email, password} = req.body; 
      const user = await User.findOne({where: {email}});
      
      if(!user)
        return res.status(400).json({error: "This user doesn't exist!"});
      
      if(!user.checkPassword(password))
        return res.status(400).json({error: "Invalid email and password!"});
      
      const {id} = user;
      return res.json({id, token: jwt.sign({id}, auth.secret, {expiresIn: auth.expires})});
  }
}

export default new UserController();