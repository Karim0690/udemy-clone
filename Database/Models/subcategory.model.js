import mongoose from "mongoose";
import slugify from "slugify";

const subcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "Name is requierd"],
      trim: true,
      required: true,
      minLength: [2, "too Short brand name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true, collection: "Subcategory" }
);

subcategorySchema.pre("save", function (next) {
  if (this.isModified("name") || this.isNew) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

subcategorySchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.name) {
    update.$set.slug = slugify(update.name, { lower: true });
  }
  next();
});

export const subcategoryModel = mongoose.model(
  "Subcategory",
  subcategorySchema
);
