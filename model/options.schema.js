import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  quesId:{type:mongoose.Schema.Types.ObjectId,ref:'Question'},
  text: {type:String,required:true},
  vote: {type:Number,default:0},
  link_to_vote: String,
},{timestamps: true });

optionSchema.pre('save', function (next) {
  if (!this.link_to_vote) {
    this.link_to_vote = `http://localhost:3000/options/${this._id}/add_vote`;
  }
  next();
});

const optionModel = mongoose.model("Option", optionSchema);
export default optionModel;
