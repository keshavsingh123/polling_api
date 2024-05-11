import mongoose from 'mongoose';

export const connectMongo = async ()=>{
   await mongoose.connect('mongodb://localhost:27017/polling').then(()=>{
    console.log("DB connected successfully");
})
}