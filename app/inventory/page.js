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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Import the Input component

export default function InventoryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingStock, setEditingStock] = useState(null); // Track which item is being edited
  const [newStock, setNewStock] = useState(""); // Temporary value for the new stock count

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch("/api/inventory");
        if (!response.ok) {
          throw new Error("Failed to fetch inventory items");
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

  const handleEditAvailableStock = (id) => {
    setEditingStock(id);
    const item = items.find((item) => item._id === id);
    setNewStock(item.available_stock); // Set the current stock as the default value
  };

  const handleSaveStock = async (id) => {
    try {
      const response = await fetch(`/api/inventory/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ available_stock: newStock }),
      });
      if (!response.ok) {
        throw new Error("Failed to update stock");
      }
      const updatedItem = await response.json();
      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === id ? { ...item, available_stock: newStock } : item
        )
      );
      setEditingStock(null);
    } catch (err) {
      setError(err.message);
    }
  };

  if (items.length === 0 && !loading) return <div>No items found.</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading inventory: {error}</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Inventory Items</h1>
      <Table>
        <TableCaption>A list of your inventory items.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Item Code</TableHead>
            <TableHead>Item Name</TableHead>
            <TableHead>Unit Weight, g</TableHead>
            <TableHead>Unit Price, ฿</TableHead>
            <TableHead>Available Stock</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.item_code}</TableCell>
              <TableCell>{item.item_name}</TableCell>
              <TableCell>{item.item_weight}</TableCell>
              <TableCell>
                {Number(item.unit_price).toLocaleString("en-US")}
              </TableCell>
              <TableCell>
                {editingStock === item._id ? (
                  <Input
                    type="number"
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                  />
                ) : (
                  item.available_stock
                )}
              </TableCell>
              <TableCell>
                {editingStock === item._id ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSaveStock(item._id)}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditAvailableStock(item._id)}
                  >
                    Edit
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
