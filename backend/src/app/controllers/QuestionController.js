import * as Yup from 'yup';
import Image from '../models/Image';
import Question from '../models/Question';

class QuestionController{
  async store(req,res){
    const schema = Yup.object().shape({
      image_id: Yup.number().required('Image id is required!'),
      question: Yup.string().required('Question text is required!'),
    });

    if(await !(schema.isValid(req.body)))
      return res.status(400).json({error: 'Invalid request data!'})
    
    const {image_id, question} = req.body;

    const image = await Image.findByPk(image_id);

    if(!image){
      return res.status(400).json({error: 'Invalid image id!'})
    }

    const newQuestion = await Question.create({
      question,
      image_id,
    });

    return res.json({question:newQuestion, image});
    
  }
}

export default new QuestionController();