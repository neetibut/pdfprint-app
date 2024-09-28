"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function OrdersPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch("/api/orders");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
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
  if (error) return <div>Error loading orders: {error}</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Orders Detail</h1>
      <Table>
        <TableCaption>A list of your orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Order Customer</TableHead>
            <TableHead>Order Discount</TableHead>
            <TableHead>Order Total</TableHead>
            <TableHead>Order Payment Type</TableHead>
            <TableHead>Order Payment Made</TableHead>
            <TableHead>Order Payment Change</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item._id}>
              <TableCell>
                <Link href={`/orders/${item._id}`}>{item.order_id}</Link>
              </TableCell>
              <TableCell>{item.order_date}</TableCell>
              <TableCell>{item.order_customer_name}</TableCell>
              <TableCell>{item.order_discount}</TableCell>
              <TableCell>{item.order_total}</TableCell>
              <TableCell>{item.order_payment_type}</TableCell>
              <TableCell>{item.order_payment_made}</TableCell>
              <TableCell>{item.order_payment_change}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
