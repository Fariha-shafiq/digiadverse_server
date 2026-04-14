import mongoose from "mongoose";

const industrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is Required"],
    unique: [true, "Title must be Unique"],
  },
  description: {
    type: String,
    required: [true, "Description is Required"],
  },
  imageUrl: {
    type: String,
    required: false,
  },
},
{ timestamps: true }
);

const industry = mongoose.model("Industry", industrySchema);

export default industry;
