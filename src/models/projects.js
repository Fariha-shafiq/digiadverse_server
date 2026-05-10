import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is Required"],
      unique: [true, "Title must be Unique"],
    },

    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is Required"],
    },

    shortDescription: {
      type: String,
      required: false,
      maxlength: 300,
    },

    industry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Industry",
      required: true,
    },

    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Services",
        required:true
      },
    ],

    featured: {
      type: Boolean,
      default: false,
    },

    imageUrl: {
      type: String,
    },

    clientName: {
      type: String,
      trim: true,
    },

    galleryImages: [
      {
        type: String,
      },
    ],

    keyFeatures: [
      {
        type: String,
      },
    ],

    challenges: {
      type: String,
    },

    solution: {
      type: String,
    },
  },
  { timestamps: true }
);

const project = mongoose.model("Project", projectSchema);

export default project;