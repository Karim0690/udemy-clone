import mongoose from "mongoose";
import slugify from "slugify";

const subcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "Name is required"],
      trim: true,
      required: true,
      minLength: [2, "Too short subcategory name"],
    },
    nameAr: {
      type: String,
      unique: [true, "Name is required"],
      trim: true,
      required: true,
      minLength: [2, "Too short subcategory name in Arabic"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    topics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
      },
    ],
  },
  { timestamps: true, collection: "Subcategory" }
);

// Create slug before saving a new subcategory
subcategorySchema.pre("save", function (next) {
  if (this.isModified("name") || this.isNew) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

// Create slug during subcategory update
subcategorySchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.name) {
    update.slug = slugify(update.name, { lower: true });
  }
  next();
});

export const subcategoryModel = mongoose.model(
  "Subcategory",
  subcategorySchema
);
