import { connectToDatabase } from "../../lib/mongodb";
import Order from "../../models/Order";

export async function GET(req) {
  try {
    await connectToDatabase();

    const currentYear = new Date().getFullYear().toString().slice(-2); // "24" for 2024
    const currentMonth = (new Date().getMonth() + 1)
      .toString()
      .padStart(2, "0"); // "08" for August

    // Construct regex to match the current year's orders in the current month
    const regex = new RegExp(`^${currentYear}-${currentMonth}-`);

    const latestOrder = await Order.findOne({ order_id: { $regex: regex } })
      .sort({ order_id: -1 })
      .limit(1);

    if (!latestOrder) {
      return new Response(JSON.stringify(null), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(latestOrder), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching latest order:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch latest order" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
