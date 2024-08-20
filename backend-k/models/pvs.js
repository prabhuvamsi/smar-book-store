import mongoose from "mongoose";

const { Schema } = mongoose;

const courseSchema = new Schema({
    title: String,
    price: Number,
    img: String,
    username: String

});

const pvs = mongoose.model('cartdata', courseSchema);

export default pvs;