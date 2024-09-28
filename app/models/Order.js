import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  // Define the properties of the cart item here, e.g., product name, quantity, price, etc.
  product_id: {
    type: String,
    required: true,
  },
  product_quantity: {
    type: String,
    required: true,
  },
});

console.log("Defining Order schema...");
const OrderSchema = new mongoose.Schema({
  order_id: {
    type: String,
    required: true,
  },
  order_date: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },
  order_time: {
    type: mongoose.Schema.Types.Mixed, // This allows for a complex object like Timestamp
    required: false,
  },
  order_customer_name: {
    type: String,
    required: true,
  },
  order_discount: {
    type: Number,
    required: false,
  },
  order_total: {
    type: Number,
    required: true,
  },
  order_payment_type: {
    type: String,
    required: false,
    enum: ["Cash", "Credit Card", "Bank Transfer"], // Enum for allowed payment types
  },
  order_payment_made: {
    type: Number,
    required: false,
  },
  order_payment_change: {
    type: Number,
    required: false,
  },
  cart: {
    type: [CartItemSchema], // Array of cart items
    required: true,
  },
  payment_status: {
    type: String,
    required: false,
    enum: ["paid", "unpaid", "pending"], // Enum for payment status
  },
});

console.log("Checking if Order model exists...");
const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
console.log("Order model ready");

export default Order;
