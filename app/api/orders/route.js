import { connectToDatabase } from "../../lib/mongodb";
import Order from "../../models/Order";

export async function GET() {
  try {
    console.log("Attempting to connect to database...");
    await connectToDatabase();
    console.log("Database connected successfully");

    console.log("Attempting to fetch orders detail...");
    const items = await Order.find({});
    console.log(`Found ${items.length} items`);

    return Response.json(items);
  } catch (error) {
    console.error("Detailed error:", error);
    return Response.json(
      { error: error.message || "Failed to fetch orders detail" },
      { status: 500 }
    );
  }
}
