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
<<<<<<< HEAD
=======
      relatedLecture: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecture",
      },
>>>>>>> d41aa58ab691162f6c5101af72e518e10d17ca59
    },
  ],
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

export { Question };
