import mongoose from "mongoose";
import slugify from "slugify";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "Name is required"],
      trim: true,
      required: true,
      minLength: [2, "Too short category name"],
    },
    nameAr: {
      type: String,
      unique: [true, "Name is required"],
      trim: true,
      required: true,
      minLength: [2, "Too short category name in Arabic"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    subcategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory",
      },
    ],
  },
  { timestamps: true, collection: "Category" }
);

// Create a slug before saving a new category
categorySchema.pre("save", function (next) {
  if (this.isModified("name") || this.isNew) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

// Create slug during category update
categorySchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.name) {
    update.slug = slugify(update.name, { lower: true });
  }
  next();
});

export const categoryModel = mongoose.model("Category", categorySchema);
