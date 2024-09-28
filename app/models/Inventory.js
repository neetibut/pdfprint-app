import mongoose from "mongoose";

console.log("Defining Inventory schema...");
const InventorySchema = new mongoose.Schema({
  item_code: String,
  item_name: String,
  item_weight: String,
  unit_price: String,
  available_stock: { type: Number, required: false, min: 0 },
});

console.log("Checking if Inventory model exists...");
const Inventory =
  mongoose.models.Inventory || mongoose.model("Inventory", InventorySchema);
console.log("Inventory model ready");

export default Inventory;
