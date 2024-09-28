// import { connectToDatabase } from "../../lib/mongodb";
// import Inventory from "../../models/Inventory"; // Assuming you have an Inventory model

// export async function GET(req, res) {
//   const { query } = req.query;
//   await connectToDatabase();

//   try {
//     const results = await Inventory.find({
//       name: { $regex: query, $options: "i" },
//     });
//     res.status(200).json(results);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to search products" });
//   }
// }

// /app/api/search-products/route.js

import { connectToDatabase } from "../../lib/mongodb"; // Adjust the path as needed
import Inventory from "../../models/Inventory"; // Adjust the path as needed

export async function GET(request) {
  // Parse the URL to extract search parameters
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  // Validate the presence of the 'query' parameter
  if (!query) {
    return new Response(JSON.stringify({ error: 'Query parameter is missing.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Establish a database connection
  try {
    await connectToDatabase();
  } catch (dbError) {
    console.error('Database connection failed:', dbError);
    return new Response(JSON.stringify({ error: 'Database connection failed.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Perform the search operation
  try {
    const results = await Inventory.find({
      name: { $regex: query, $options: "i" },
    });

    // Serialize the results to ensure they can be converted to JSON
    const serializedResults = JSON.parse(JSON.stringify(results));

    return new Response(JSON.stringify(serializedResults), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error searching products:', error);
    return new Response(JSON.stringify({ error: "Failed to search products" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
