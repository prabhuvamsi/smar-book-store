import mongoose from "mongoose";

const { Schema } = mongoose;

const courseSchema = new Schema({
    image: { 
        type: String
    }
});

const pv = mongoose.model('books', courseSchema);
export default pv;