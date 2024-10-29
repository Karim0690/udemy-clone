import mongoose from "mongoose";
import slugify from "slugify";
const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
      unique: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    subtitle: {
      type: String,
      minlength: 7,
    },
    description: {
      type: String,
      maxlength: 500,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    price: {
      type: String,
    },
    level: {
      type: String,
      enum: [
        "Beginner Level",
        "Intermediate Level",
        "Expert Level",
        "All Levels",
      ],
    },
    courseImage: {
      type: String,
      default: null,
    },
    promotionalVideo: {
      type: String,
      default: null,
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
    },
    topics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
      },
    ],
    relatedTopic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      default: null,
    },
    language: {
      type: String,
      default: "English",
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
    sections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sections",
      },
    ],
    enrollments: {
      type: Number,
    },
    learningObjective: {
      type: [String],
    },
    requirements: { type: [String] },
    courseFor: { type: [String] },
    courseStructure: { type: Boolean, default: false },
    setupAndTest: { type: Boolean, default: false },
    filmAndEdite: { type: Boolean, default: false },
    captions: { type: Boolean, default: false },
    accessibility: { type: Boolean, default: false },
    promotions: { type: Boolean, default: false },
    progress: { type: Number, default: 0 },
    welcomeMessage: { type: String, minlength: 3, maxlength: 1000 },
    congratesMessage: { type: String, minlength: 3, maxlength: 1000 },
    duration: { type: Number, default: 0 },
  },
  { timestamps: true, collection: "Courses" }
);

courseSchema.path("topics").validate(function (topics) {
  return topics.length <= 4;
}, "A course can have a maximum of 4 topics.");

courseSchema.pre("save", function (next) {
  if (this.isModified("title") || this.isNew) {
    this.slug = slugify(this.title, { lower: true });
  }
  next();
});

courseSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.title) {
    update.$set.slug = slugify(update.title, { lower: true });
  }
  next();
});

export const cousreModel = mongoose.model("Course", courseSchema);
