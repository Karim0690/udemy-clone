import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: [2, "too short name"],
    },
    firstName: { type: String, required: false, trim: true },
    lastName: { type: String, required: false, trim: true },
    language: {
      type: String,
      required: false,
      trim: true,
      enum: [
        "English (US)",
        "Canada",
        "France",
        "Germany",
        "Spain",
        "Italy",
        "UK",
        "Netherlands",
        "Australia",
        "New Zealand",
        "India",
        "Brazil",
        "Mexico",
        "China",
        "Russia",
      ],
      default: "English (US)",
    },
    email: {
      type: String,
      trim: true,
      required: [true, "email is required"],
      minLength: 1,
      unique: [true, "email must be unique"],
    },
    photo: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      require: true,
      minLength: [8, "password can't be less than 8 characters"],
    },
    passwordChangedAt: Date,
    profilePic: String,
    role: {
      type: [String],
      enum: ["student", "instructor", "admin"],
      default: ["student"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    enrolledCourses: [
      {
        type: mongoose.Types.ObjectId,
        ref: "course",
      },
    ],
    wishlist: [
      {
        type: mongoose.Types.ObjectId,
        ref: "course",
      },
    ],
    favorite: [
      {
        type: mongoose.Types.ObjectId,
        ref: "course",
      },
    ],
    headline: {
      type: String,
      trim: true,
    },
    biography: {
      type: String,
    },
    social: {
      website: String,
      facebook: String,
      linkedin: String,
      youtube: String,
      twitter: String,
    },
  },
  { timestamps: true, collection: "User" }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export const userModel = mongoose.model("User", userSchema);
