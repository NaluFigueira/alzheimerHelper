import * as Yup from 'yup';
import Sequelize from 'sequelize';
import Image from '../models/Image';
import Question from '../models/Question';
import Answer from '../models/Answer';

class RandomImageQuestionController{
  async show(req,res){
    const schema = Yup.object().shape({
      category: Yup.string().required('Image category is required!'),
    });

    if(await !(schema.isValid(req.body)))
      return res.status(400).json({error: 'Invalid request data!'})
    
    const image = await Image.findAll({order: [Sequelize.fn( 'RANDOM' )], limit: 1});
    const question = await Question.findAll({where: {image_id: image[0].id}, order: [Sequelize.fn( 'RANDOM' )], limit: 1});
    const answers = await Answer.findAll({where: {question_id: question[0].id}});

    return res.json({image, question, answers});
    
  }
}

export default new RandomImageQuestionController();