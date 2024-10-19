import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, trim: true },
    duration: { type: Number, min: 0 },
    resource: { type: String },
    type: { type: String, default: "Lecture" },
    description: { type: String },
  },
  { timestamps: true }
);

const Lecture = mongoose.model("Lecture", lectureSchema);

export { Lecture };
