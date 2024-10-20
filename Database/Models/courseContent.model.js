import mongoose from "mongoose";

const courseSectionsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 80,
      trim: true,
    },
    objective: { type: String, maxlength: 200, trim: true },
    items: [
      {
        type: {
          type: String,
          enum: ["Lecture", "Quiz"],
          required: true,
        },
        item: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "items.type",
        },
      },
    ],
  },
  { timestamps: true }
);

const CourseSections = mongoose.model("Sections", courseSectionsSchema);

export { CourseSections };
