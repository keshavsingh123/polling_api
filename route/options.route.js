import express from 'express';
import OptionController from '../controller/options.controller.js';

const optionRoute = express.Router();
const optionController = new OptionController();

optionRoute.post('/:id',optionController.addOption)
optionRoute.delete('/:quesId/:optionId',optionController.deleteOption)
optionRoute.post('/:optionId/vote',optionController.incrementVote)

export default optionRoute