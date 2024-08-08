import mongoose from "mongoose";
import joi from "joi";
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
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["Credit/Debit Card", "PayPal"],
    },
    summary: {
      originalPrice: {
        type: Number,
        required: true,
      },
      discounts: {
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

<<<<<<< HEAD

export default orderModel = mongoose.model("Order", orderSchema);
=======
export default mongoose.model("Order", orderSchema);
>>>>>>> bef81ada8319772aae024ddb8757ee4077e476d5
