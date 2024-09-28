import mongoose from "mongoose";

console.log("Defining Customer schema...");
const CustomerSchema = new mongoose.Schema({
  customer_id: String,
  customer_name: String,
  customer_phone: String,
  customer_email: String,
  customer_address: String,
  customer_taxid: String,
});

console.log("Checking if Customer model exists...");
const Customer =
  mongoose.models.Customer || mongoose.model("Customer", CustomerSchema);
console.log("Customer model ready");

export default Customer;
