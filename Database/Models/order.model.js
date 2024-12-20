import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    cartItems: [
      {
        course: { type: mongoose.Types.ObjectId, ref: "Course" },
        price: Number,
      },
    ],
    country: {
      type: String,
      default: "Egypt",
    },
    paymentMethod: {
      type: String,
      default: "Paypal",
    },
    summary: {
      originalPrice: {
        type: Number,
        required: true,
      },
      discount: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
  },
  { timestamps: true, collection: "Order" }
);

export default mongoose.model("Order", orderSchema);
