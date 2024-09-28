import { connectToDatabase } from "../../../lib/mongodb";
import Order from "../../../models/Order";
import mongoose from "mongoose";

export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    console.log("Database connected successfully.");

    const { id } = params;

    console.log("Validating order ID:", id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("Invalid order ID format.");
      return new Response(
        JSON.stringify({ error: "Invalid order ID format" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const objectId = new mongoose.Types.ObjectId(id);
    console.log("Converted ObjectId:", objectId);

    const order = await Order.findById(objectId);
    if (!order) {
      console.log("Order not found.");
      return new Response(JSON.stringify({ error: "Order not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("Order found:", order);
    return new Response(JSON.stringify(order), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch order details" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
