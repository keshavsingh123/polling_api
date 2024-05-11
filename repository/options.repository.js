import optionModel from "../model/options.schema.js";
import Question from "../model/question.schema.js";
import { ObjectId } from "mongodb";

export default class OptionRepository {
  async addOption(quesId,text,vote) {
    try {
        // const optionsObject = JSON.parse(text,vote)
      const newOption = new optionModel({ quesId:new ObjectId(quesId),text,vote });
      const savedOpt =  await newOption.save();
      const question = await Question.findById(new ObjectId(quesId));
      question.options.push(savedOpt._id);
      await question.save();
      return savedOpt;
    } catch (err) {
      console.log("Error in database", err);
    }
  }
  async deleteOption(quesId,optionId){
    try{
          // Step 1: Remove option from question document

      const updatedQues = await Question.findByIdAndUpdate(
        quesId=new ObjectId(quesId),
        {$pull:{options:new ObjectId(optionId)}},
        {new:true}
      );
      if (!updatedQues) {
        throw new Error('Question not found');
      }
  
      // Step 2: Delete option from options collection
      const deletedopt = await optionModel.findByIdAndDelete(new ObjectId(optionId));
      if (!deletedopt) {
        throw new Error('option not found');
      }
      return { question: updatedQues, option: deletedopt };
    }catch(err){
      return err
    }
  }
  async incrementVote(optionId){
    try{
      const updateOption = await optionModel.findByIdAndUpdate(
        optionId = new ObjectId(optionId),
        { $inc: { vote: 1 } }, // Increment the 'vote' field by 1
        { new: true } // Return the updated document
      )
      if (updateOption) {
        console.log("Vote count incremented successfully:", updateOption);
         // Generate link_to_vote dynamically based on the optionId
      const link_to_vote = `${req.protocol}://${req.get('host')}/options/${new ObjectId(optionId)}/vote`;
      updateOption.link_to_vote = link_to_vote;
      await updateOption.save();

      return updateOption;
      } else {
        console.log("Option not found");
      }
    }catch(err){
      return err
    }
  }
}
