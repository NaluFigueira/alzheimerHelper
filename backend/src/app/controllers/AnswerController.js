import * as Yup from 'yup';
import Question from '../models/Question';
import Answer from '../models/Answer';

class AnswerController{
  async store(req,res){
    const schema = Yup.object().shape({
      question_id: Yup.number().required('Question id is required!'),
      answer: Yup.string().required('Answer text is required!'),
      correct: Yup.boolean().required('It is required to inform if the answer is correct or not!')
    });

    if(await !(schema.isValid(req.body)))
      return res.status(400).json({error: 'Invalid request data!'})
    
    const {question_id, answer} = req.body;

    const question = await Question.findByPk(question_id);

    if(!question){
      return res.status(400).json({error: 'Invalid question id!'})
    }

    const answers = await Answer.findAll({where: {question_id}});

    if(answers.length >= 3)
      return res.status(400).json({error: 'This question already achieved the maximum number of answers (3).'})

    const newAnswer = await Answer.create({
      answer,
      question_id,
      correct
    });

    return res.json({answer:newAnswer, question});
    
  }
}

export default new AnswerController();