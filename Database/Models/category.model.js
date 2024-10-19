import mongoose from "mongoose";
import slugify from "slugify";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "Name is requierd"],
      trim: true,
      required: true,
      minLength: [2, "too Short category name"],
    },
    slug: {
      type: String,
      unique: true,
    },
    subcategories: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Subcategory",
      },
    ],
  },
  { timestamps: true, collection: "Category" }
);


export const categoryModel = mongoose.model("Category", categorySchema);
