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
    nameAr: {
      type: String,
      unique: [true, "Name is requierd"],
      trim: true,
      required: true,
      minLength: [2, "too Short category name in Arabic"],
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

categorySchema.pre("save", function (next) {
  if (this.isModified("name") || this.isNew) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

categorySchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.name) {
    update.$set.slug = slugify(update.name, { lower: true });
  }
  next();
});

export const categoryModel = mongoose.model("Category", categorySchema);
