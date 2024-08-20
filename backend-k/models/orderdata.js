import mongoose from "mongoose";

const { Schema } = mongoose;

const courseSchema = new Schema({
    title: String,
    price: Number,
    img: String,
    username: String

});

const orderdata = mongoose.model('orderdata', courseSchema);

export default orderdata;