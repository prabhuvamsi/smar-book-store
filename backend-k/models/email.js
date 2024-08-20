import mongoose from "mongoose";
const  Schema = mongoose.Schema;

const courseSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    }
});
const pvrs = mongoose.model('emails', courseSchema);
export default pvrs;
