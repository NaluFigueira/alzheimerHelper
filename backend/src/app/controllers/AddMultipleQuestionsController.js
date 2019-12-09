import * as Yup from 'yup';
import Image from '../models/Image';
import Question from '../models/Question';

class AddMultipleQuestionsController{
  async store(req,res){
    const schema = Yup.object().shape({
      image_id: Yup.number().required('Image id is required!'),
      questions: Yup.array(Yup.string())
                  .max(3,"There can only be 3 questions for each image!")
                  .required('Array of questions is required!'),
    });

    if(await !(schema.isValid(req.body)))
      return res.status(400).json({error: 'Invalid request data!'})
    
    const {image_id, questions} = req.body;

    const image = await Image.findByPk(image_id);

    if(!image){
      return res.status(400).json({error: 'Invalid image id!'})
    }

    const existingQuestions = await Question.findAll({where:{image_id}});

    if(existingQuestions.length + questions.length > 3){
      return res.status(400).json({error: 'Maximum number of questions for this image achieved!'})
    }

    questions.forEach(async question => {
      await Question.create({
        question,
        image_id,
      });
    });

    return res.json({questions, image});
    
  }
}

export default new AddMultipleQuestionsController();