import mongoose from "mongoose";
import slugify from "slugify";

const topicSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, "Name is required"],
        trim: true,
        required: true,
        minLength: [2, "Too short brand name"],
    },
    nameAr: {
        type: String,
        unique: [true, "Name is required"],
        trim: true,
        required: true,
        minLength: [2, "Too short brand name"],
    },
    slug: {
        type: String,
        lowercase: true,
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory",
    },
}, { timestamps: true, collection: "Topic" });

topicSchema.pre("save", function(next) {
    if (this.isModified("name") || this.isNew) {
        this.slug = slugify(this.name, { lower: true });
        console.log("Generated slug:", this.slug);
    }
    next();
});

topicSchema.pre("findOneAndUpdate", function(next) {
    const update = this.getUpdate();
    if (update.name) {
        if (!update.$set) {
            update.$set = {};
        }
        update.$set.slug = slugify(update.name, { lower: true });
    }
    next();
});

export default mongoose.model("Topic", topicSchema);