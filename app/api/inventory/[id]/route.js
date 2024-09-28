import { connectToDatabase } from "../../../lib/mongodb";
import Inventory from "../../../models/Inventory";
import mongoose from "mongoose";

export async function PUT(req, { params }) {
  try {
    await connectToDatabase();

    // Extract the `id` parameter from `params`
    const { id } = params;

    // Validate if the `id` is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: "Invalid ID format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Parse the request body to get the updated data
    const { available_stock } = await req.json();

    // Find and update the inventory item by ID
    const updatedItem = await Inventory.findByIdAndUpdate(
      id,
      { available_stock },
      { new: true }
    );

    // If the item was not found, return a 404 error
    if (!updatedItem) {
      return new Response(JSON.stringify({ error: "Item not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Return the updated item as a response
    return new Response(JSON.stringify(updatedItem), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating inventory:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update inventory item" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
