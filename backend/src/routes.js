import {Router} from 'express';
import ImageController from './app/controllers/ImageController';
import QuestionController from './app/controllers/QuestionController';
import AnswerController from './app/controllers/AnswerController';
import RandomImageQuestionController from './app/controllers/RandomImageQuestionController';
import AddMultipleQuestionsController from './app/controllers/AddMultipleQuestionsController';
import AddMultipleAnswersController from './app/controllers/AddMultipleAnswersController';
import multerConfig from './config/multer';
import multer from 'multer';
const upload = multer(multerConfig);

const routes = new Router();

routes.post('/images',upload.single('file'), ImageController.store);
routes.post('/questions', QuestionController.store);
routes.post('/answers', AnswerController.store);
routes.get('/random', RandomImageQuestionController.show);
routes.post('/addMultipleQuestions', AddMultipleQuestionsController.store);
routes.post('/addMultipleAnswers', AddMultipleAnswersController.store);

export default routes;