import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, trim: true },
<<<<<<< HEAD
    duration: { type: Number, min: 0 },
=======
    duration: { type: Number },
    resourceTitle: { type: String }, // video title
>>>>>>> d41aa58ab691162f6c5101af72e518e10d17ca59
    resource: { type: String },
    type: { type: String, default: "Lecture" },
    description: { type: String },
  },
  { timestamps: true }
);

const Lecture = mongoose.model("Lecture", lectureSchema);

export { Lecture };
