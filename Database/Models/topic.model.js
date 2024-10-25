import mongoose from "mongoose";
import slugify from "slugify";

const topicSchema = new mongoose.Schema(
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
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
    },
  },
  { timestamps: true, collection: "Topic" }
);

topicSchema.pre("save", function (next) {
  if (this.isModified("name") || this.isNew) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

topicSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.name) {
    update.$set.slug = slugify(update.name, { lower: true });
  }
  next();
});
export default mongoose.model("Topic", topicSchema);
