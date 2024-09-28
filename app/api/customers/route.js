import { connectToDatabase } from "../../lib/mongodb";
import Customer from "../../models/Customer";

export async function GET() {
  try {
    console.log("Attempting to connect to database...");
    await connectToDatabase();
    console.log("Database connected successfully");

    console.log("Attempting to fetch customers detail...");
    const items = await Customer.find({});
    console.log(`Found ${items.length} items`);

    return Response.json(items);
  } catch (error) {
    console.error("Detailed error:", error);
    return Response.json(
      { error: error.message || "Failed to fetch customers detail" },
      { status: 500 }
    );
  }
}
