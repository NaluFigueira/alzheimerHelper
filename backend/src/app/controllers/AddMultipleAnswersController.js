import * as Yup from 'yup';
import Answer from '../models/Answer';
import Question from '../models/Question';
import Image from '../models/Image';

class AddMultipleQuestionsController{
  async store(req,res){
    const schema = Yup.object().shape({
      question_id: Yup.number().required('Question id is required!'),
      answers: Yup.array(Yup.object().shape({
                      answer: Yup.string().required('Answer text is required!'),
                      correct: Yup.boolean().required('It is required to inform if the answer is correct or not!')
                  }))
                  .max(3,"There can only be 3 answers for each question!")
                  .required('Array of answers is required!'),
    });

    if(await !(schema.isValid(req.body)))
      return res.status(400).json({error: 'Invalid request data!'})
    
    const {question_id, answers} = req.body;

    const question = await Question.findByPk(question_id);

    if(!question){
      return res.status(400).json({error: 'Invalid question id!'})
    }

    const image = await Image.findByPk(question.image_id);

    if(!image){
      return res.status(400).json({error: 'Invalid image id!'})
    }

    const existingAnswers = await Answer.findAll({where:{question_id}});

    if(existingAnswers.length + answers.length > 3){
      return res.status(400).json({error: 'Maximum number of answers for this question achieved!'})
    }

    answers.forEach(async a => {
      await Answer.create({
        answer:a.answer,
        correct:a.correct,
        question_id,
      });
    });

    return res.json({answers, question, image});
    
  }
}

export default new AddMultipleQuestionsController();