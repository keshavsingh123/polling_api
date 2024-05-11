import express from 'express';
import QuestionController from '../controller/question.controller.js';

const quesRoute = express.Router();
const questionController = new QuestionController();


quesRoute.get('/:quesId',questionController.getQuestion)
quesRoute.post('/create',questionController.addQuestion)
quesRoute.delete('/:id',questionController.deleteQues)



export default quesRoute;






