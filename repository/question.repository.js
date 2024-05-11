import Question from "../model/question.schema.js";
import OptionModel from "../model/options.schema.js"
import { ObjectId } from "mongodb";
export default class QuestionRepository {

  async getQuestion(quesId){
    try{
      const getQues = await Question.find()
      .populate("options");
      return getQues

    }catch(err){
      return err
    }
  }

  async addQuestion(title) {
    try {
      const newQues = new Question(title);
      return await newQues.save();
    } catch (err) {
      return err;
    }
  }
  async deleteQues(quesId){
    try{
      const question = await Question.findById({_id:new ObjectId(quesId)})
      .populate('options');
      if (!question) {
        console.log("Question not found in db1");
        return null; // Return null when Question was not found
      }
      if (question.options.length > 0) {
        console.log("Question has associated options, cannot delete.");
        return null; // Return null when Question has options
      }
      const deleteQ = await Question.deleteOne({_id:new ObjectId(quesId)})

    if (deleteQ.deletedCount > 0) {
        return deleteQ; // Question deleted successfully
      } else {
        console.log("Question not found in db2"); // Throw an error if Question was not deleted
      }
    }catch(err){
      return err
    }
  }
}
