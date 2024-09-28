import Inventory from "@/app/models/Inventory";
import { connectToDatabase } from "../../lib/mongodb";
import Order from "../../models/Order";

export async function POST(req) {
  await connectToDatabase();

  try {
    // Parse the JSON body
    const data = await req.json();

    // Check if stock is sufficient for all products
    for (const item of data.cart) {
      const product = await Inventory.findOne({ item_code: item.product_id });

      if (!product) {
        return new Response(
          JSON.stringify({
            error: `Product with ID ${item.product_id} not found`,
          }),
          {
            status: 404,
          }
        );
      }

      const quantity = Number(item.product_quantity); // Ensure quantity is a number

      if (product.available_stock < quantity) {
        return new Response(
          JSON.stringify({
            error: `Not enough stock for product ${product.item_name}. Available: ${product.available_stock}, Requested: ${item.product_quantity}`,
          }),
          { status: 400 }
        );
      }
    }

    // Create a new order
    const newOrder = new Order(data);
    await newOrder.save();

    // Update stock quantities
    for (const item of data.cart) {
      await Inventory.updateOne(
        { item_code: item.product_id },
        { $inc: { available_stock: -item.product_quantity } }
      );
    }

    // Return the created order with a 201 status code
    return new Response(JSON.stringify(newOrder), { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    // Return a 500 error response with an error message
    return new Response(JSON.stringify({ error: "Failed to create order" }), {
      status: 500,
    });
  }
}
