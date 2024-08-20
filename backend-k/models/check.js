import mongoose from "mongoose";

const { Schema } = mongoose;

const checkSchema = new Schema({
   firstname: String,
   lastname: String,
   email: String,
   phonenumber: String,
   pincode: String,
   address: String,
   phone:Number,
   username:String,
});

const CheckData = mongoose.model('CheckData', checkSchema);

export default CheckData;
