import mongoose from "mongoose";

const Schema = mongoose.Schema;

const uploadSchema = new Schema({
    image: {
        data: Buffer, // Store file data as Buffer
        contentType: String // Store content type, e.g., "image/jpeg"
    }
});

const Upload = mongoose.model("Upload", uploadSchema);

export default Upload;
