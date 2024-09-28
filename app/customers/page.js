"use client";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function customersPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch("/api/customers");
        if (!response.ok) {
          throw new Error("Failed to fetch customers items");
        }
        const data = await response.json();
        setItems(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchItems();
  }, []);

  if (items.length === 0 && !loading) return <div>No items found.</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading customers: {error}</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Customers Details</h1>
      <Table>
        <TableCaption>A list of your customers items.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Customer ID</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Customer Phone No.</TableHead>
            <TableHead>Customer Email</TableHead>
            <TableHead>Customer Address</TableHead>
            <TableHead>Customer Tax ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.customer_id}</TableCell>
              <TableCell>{item.customer_name}</TableCell>
              <TableCell>{item.customer_phone}</TableCell>
              <TableCell>{item.customer_email}</TableCell>
              <TableCell>{item.customer_address}</TableCell>
              <TableCell>{item.customer_taxid}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
