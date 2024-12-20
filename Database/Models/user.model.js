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
    email: {
      type: String,
      trim: true,
      required: [true, "email is required"],
      minLength: 1,
      unique: [true, "email must be unique"],
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
        ref: "Course",
      },
    ],
    wishlist: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Course",
      },
    ],
    favorite: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Course",
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
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next(); 
});


userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  if (update && update.password) {
    const salt = await bcrypt.genSalt(10);
    update.password = await bcrypt.hash(update.password, salt);
  }

  next();
});

export const userModel = mongoose.model("User", userSchema);
