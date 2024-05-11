import express from 'express';
import { connectMongo } from './config/mongoose-config.js';
import quesRoute from './route/question.route.js';
import bodyParser from 'body-parser';
import optionRoute from './route/options.route.js';

const app = express();


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/questions',quesRoute)
app.use('/options',optionRoute)






app.listen(3000,(req,res)=>{
    console.log('server is running on port 3000');
    connectMongo();
})