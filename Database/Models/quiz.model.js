import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    type: { type: String, default: "Quiz" },
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", quizSchema);

export { Quiz };
