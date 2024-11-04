import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    title_ar: { type: String, required: true, trim: true },
    content: { type: String, trim: true },
    duration: { type: Number },
    resourceTitle: { type: String }, // video title
    resource: { type: String },
    type: { type: String, default: "Lecture" },
    description: { type: String },
    description_ar: { type: String },
  },
  { timestamps: true }
);

const Lecture = mongoose.model("Lecture", lectureSchema);

export { Lecture };
