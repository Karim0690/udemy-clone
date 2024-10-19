import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  [
    {
      question: { type: String, required: true },
      answers: [
        {
          answer: { type: String, required: true },
          isCorrect: { type: Boolean, default: false },
          explanation: { type: String },
        },
      ],
    },
  ],
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

export { Question };
