import mongoose from "mongoose";
import slugify from "slugify";

const topicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "Name is required"],
      trim: true,
      required: true,
      minLength: [2, "Too short topic name"],
    },
    nameAr: {
      type: String,
      unique: [true, "Name is required"],
      trim: true,
      required: true,
      minLength: [2, "Too short topic name in Arabic"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
      required: true,
    },
  },
  { timestamps: true, collection: "Topic" }
);

// Create slug before saving a new topic
topicSchema.pre("save", function (next) {
  if (this.isModified("name") || this.isNew) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

// Create slug during topic update
topicSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.name) {
    update.slug = slugify(update.name, { lower: true });
  }
  next();
});

export default mongoose.model("Topic", topicSchema);
