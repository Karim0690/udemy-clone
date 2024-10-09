import mongoose from "mongoose";
const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
      unique: true,
    },

    subtitle: {
      type: String,
      minlength: 7,
    },
    description: {
      type: String,
      required: true,
      minlength: 500,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instructor",
      required: true,
    },
    price: {
      type: Number,
    },
    instructionsLevel: {
      type: String,
      enum: ["Beginner Level", "Intermediate Level", "Expert Level", "All Levels"]
    },
    courseImage: {
      type: String,
      default: "",
    },
    promotionalVideo: {
      type: String,
      default: "",
    },
    bestSaller: {
      type: Boolean,
      default: false,
    },
    highestRated: {
      type: Boolean,
      default: false,
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
    topics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
      }
    ],
    relatedTopic:  {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
    },
    language: {
      type: String,
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
        willLearn: {
          type: [String],
        },
        whoCourseFor: {
          type: [String],
        }
      },
    ],
  },
  { timestamps: true, collection: "Courses" }
);

courseSchema.path('topics').validate(function (topics) {
  return topics.length <= 4;
}, 'A course can have a maximum of 4 topics.');

export const cousreModel = mongoose.model("Course", courseSchema);
