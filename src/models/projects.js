import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is Required"],
      unique: [true, "Title must be Unique"],
    },
    description: {
      type: String,
      required: [true, "Description is Required"],
    },
    industry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Industry",
      required: true,
    },
    featured: {
      type: Boolean,
      required: false,
    },
    imageUrl: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const project = mongoose.model("Project", projectSchema);

export default project;
