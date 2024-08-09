import mongoose from "mongoose";
const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
    },

    description: {
      type: String,
      required: true,
      minlength: 50,
      maxlength: 500,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instructor",
      required: true,
    },
    price: {
      type: Number,
    },
    courseImage: {
      type: String,
      default: "",
    },
    promotionalVideo: {
      type: String,
      default: "",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
      required: true,
    },
    rating: {
      average: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    content: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Content",
      },
    ],
    enrollments: {
      type: Number,
    },
    intendedLearns: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true, collection: "Courses" }
);
export const cousreModel = mongoose.model("Course", courseSchema);
