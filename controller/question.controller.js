import QuestionRepository from "../repository/question.repository.js";

export default class QuestionController {
  constructor() {
    this.questionRepo = new QuestionRepository();
  }
  getQuestion = async(req,res)=>{
    // const questionId = req.params.id;

    try {
      const question = await this.questionRepo.getQuestion();
      if (!question) {
        return res.status(404).send({ message: "Question not found" });
      }
      res.status(200).send(question);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  }
  addQuestion = async (req, res) => {
    try {
      const  title  = req.body;
      const createQues = await this.questionRepo.addQuestion(title);
      if(createQues){
        return res.status(200).send("question created successfully")
        }else{
        return res.status(400).send("unable to create post record")

        }
    } catch (err) {
      console.log("error in controller",err);
    }
  };
  deleteQues = async(req,res)=>{
    try{ 
        const quesId = req.params.id;
        const delQues = await this.questionRepo.deleteQues(quesId)
        if(!delQues){
          return res.status(400).send("Question not  found");
      }else{
          return res.status(200).send("Question deleted successfully")
      }
      }catch(err){
        return err
    }
  }
}
