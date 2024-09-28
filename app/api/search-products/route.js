import { connectToDatabase } from "../../lib/mongodb";
import Inventory from "../../models/Inventory"; // Assuming you have an Inventory model

export async function GET(req, res) {
  const { query } = req.query;
  await connectToDatabase();

  try {
    const results = await Inventory.find({
      name: { $regex: query, $options: "i" },
    });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: "Failed to search products" });
  }
}
