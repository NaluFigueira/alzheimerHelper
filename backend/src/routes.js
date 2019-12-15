import {Router} from 'express';
import ImageController from './app/controllers/ImageController';
import QuestionController from './app/controllers/QuestionController';
import AnswerController from './app/controllers/AnswerController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import PersonController from './app/controllers/PersonController';
import RandomImageQuestionController from './app/controllers/RandomImageQuestionController';
import AddMultipleQuestionsController from './app/controllers/AddMultipleQuestionsController';
import AddMultipleAnswersController from './app/controllers/AddMultipleAnswersController';
import authMiddleware from './app/middlewares/authentication';
import multerConfig from './config/multer';
import multer from 'multer';
const upload = multer(multerConfig);

const routes = new Router();

routes.post('/images',upload.single('file'), ImageController.store);
routes.post('/questions', QuestionController.store);
routes.post('/answers', AnswerController.store);
routes.post('/users', UserController.store);
routes.get('/random', RandomImageQuestionController.show);
routes.post('/addMultipleQuestions', AddMultipleQuestionsController.store);
routes.post('/addMultipleAnswers', AddMultipleAnswersController.store);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.get('/people', PersonController.index);
routes.get('/people/:id', PersonController.show);
routes.post('/people',upload.single('file'), PersonController.store);
routes.put('/people',upload.single('file'), PersonController.update);
routes.delete('/people/:id', PersonController.delete);


export default routes;