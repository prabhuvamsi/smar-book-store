import mongoose from "mongoose";
const  Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: {
        type: String,
    },
    email: { type: String, unique: true },
    password: {
        type: String,
    }
});
const uks = mongoose.model('userdatas', courseSchema);
export default uks;