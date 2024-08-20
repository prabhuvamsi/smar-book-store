import mongoose from "mongoose";

const { Schema } = mongoose;

const courseSchema = new Schema({
    username: { 
        type: String
    },
    option: {
        type: String
    }
});

const Course = mongoose.model('course', courseSchema);
export default Course;
