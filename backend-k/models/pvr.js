import mongoose from "mongoose";

const { Schema } = mongoose;

const courseSchema = new Schema({
    img:{
        type:String
    }

});

const pvr = mongoose.model('jds', courseSchema);

export default pvr;