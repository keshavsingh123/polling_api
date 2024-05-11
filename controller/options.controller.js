import OptionRepository from "../repository/options.repository.js";

export default class OptionController {
  constructor() {
    this.optionRepo = new OptionRepository();
  }
  addOption = async (req, res) => {
    try {
      const quesId = req.params;
      const { text, vote } = req.body;
      // const link_to_vote = link_to_vote


      const createOpt = await this.optionRepo.addOption(quesId, text,vote);
      if (createOpt) {
        res.status(200).send(createOpt);
      } else {
        res.status(400).send("unable to create option");
      }
    } catch (err) {
      return err;
    }
  };

  deleteOption = async(req,res)=>{
    try{
      const {quesId,optionId} = req.params;
    const deleteOpt = await this.optionRepo.deleteOption(quesId,optionId)
    if(deleteOpt){
      return res.status(200).send("option deleted successsfully!")
   }else{
      return res.status(400).send(" Option Not found")

   }
    }catch(err){
      return err
    }
    
  }

  incrementVote = async(req,res)=>{
    try{
      const optionId = req.params.optionId;
    const increment = await this.optionRepo.incrementVote(optionId)
    if(increment){
      return res.status(200).send("incemented by one")
    }else{
      return res.status(400).send(" not incemented")

    }
    }catch(err){
      return err
    }
  }
  
}
