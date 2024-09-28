import { connectToDatabase } from "../../lib/mongodb";
import Inventory from "../../models/Inventory";

export async function GET() {
  try {
    console.log("Attempting to connect to database...");
    await connectToDatabase();
    console.log("Database connected successfully");

    console.log("Attempting to fetch inventory items...");
    const items = await Inventory.find({});
    console.log(`Found ${items.length} items`);

    return Response.json(items);
  } catch (error) {
    console.error("Detailed error:", error);
    return Response.json(
      { error: error.message || "Failed to fetch inventory items" },
      { status: 500 }
    );
  }
}
