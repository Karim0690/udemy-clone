import axios from "axios";
import cartModel from "../Database/Models/cart.model.js";
import asyncHandler from "express-async-handler";

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, BASE_URL } = process.env;

export const getAccessToken = async () => {
  const response = await axios({
    url: `${BASE_URL}/v1/oauth2/token`,
    method: "post",
    data: "grant_type=client_credentials",
    auth: {
      username: PAYPAL_CLIENT_ID,
      password: PAYPAL_CLIENT_SECRET,
    },
  });
  return response.data.access_token;
};

export const createPayment = async (req, res) => {
  const accessToken = await getAccessToken();

  const cart = await cartModel
    .findById(req.params.cartId)
    .populate("items.course", "_id title price instructor");

  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const response = await axios({
    url: `${BASE_URL}/v2/checkout/orders`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: "d9f80740-38f0-11e8-b467-0ed5f89f718b",
          amount: {
            currency_code: "USD",
            value:
              cart.totalPriceAfterDiscount > 0
                ? cart.totalPriceAfterDiscount.toFixed(2).toString()
                : cart.totalPrice.toFixed(2).toString(),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: cart.totalPrice.toFixed(2),
              },
              discount: {
                currency_code: "USD",
                value: (cart.totalPrice - cart.totalPriceAfterDiscount)
                  .toFixed(2)
                  .toString(),
              },
            },
          },
          items: cart.items.map((item) => ({
            name: item.course.title,
            description: "Course",
            unit_amount: {
              currency_code: "USD",
              value: item.course.price,
            },
            quantity: 1,
          })),
        },
      ],
      application_context: {
        brand_name: "Udemy",
        return_url: `http://127.0.0.1:3000/en/cart/success`,
        cancel_url: `http://127.0.0.1:3000/en/cart`,
        shipping_preference: "NO_SHIPPING",
        user_action: "PAY_NOW",
      },
    },
  });
  const approveLink = response.data.links.find(
    (link) => link.rel === "approve"
  ).href;
  return res.json({ message: "success", link: approveLink });
};

export const capturePayment = asyncHandler(async (req, res) => {
  const { token } = req.body;

  const accessToken = await getAccessToken();

  const response = await axios({
    url: `${BASE_URL}/v2/checkout/orders/${token}/capture`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  res.json({ message: "success", data: response.data });
});
