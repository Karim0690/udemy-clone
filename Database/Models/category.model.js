import mongoose from 'mongoose';
import slugify from 'slugify';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, 'Name is requierd'],
      trim: true,
      required: true,
      minLength: [2, 'too Short category name'],
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true, collection: 'Category' }
);

categorySchema.pre('save', function (next) {
  if (this.isModified('name') || this.isNew) {
    console.log(this.name);
    this.slug = slugify(this.name, { lower: true });
  }
  console.log(this.slug);
  next();
});

categorySchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  console.log(update);
  update.$set.slug = slugify(update.name, { lower: true });
  next();
});

export const categoryModel = mongoose.model('Category', categorySchema);
