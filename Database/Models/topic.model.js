import mongoose from "mongoose";

const topicSchema =  new mongoose.Schema({
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
  



},
  { timestamps: true, collection: "Topic" }); 


export default mongoose.model("Topic",topicSchema);

