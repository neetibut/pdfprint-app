"use client";
import { useState, useEffect } from "react";

export default function NewOrder() {
  const [orderId, setOrderId] = useState("");
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const [products, setProducts] = useState([]);

  // Fetch the latest order to determine the next order ID
  useEffect(() => {
    async function fetchLatestOrderId() {
      try {
        const response = await fetch("/api/latest-order");
        const latestOrder = await response.json();

        const currentYear = new Date().getFullYear().toString().slice(-2); // "24" for 2024
        const currentMonth = (new Date().getMonth() + 1)
          .toString()
          .padStart(2, "0"); // "08" for August

        let nextOrderId;

        if (latestOrder && latestOrder.order_id) {
          // Extract the count from the latest order ID
          const latestCount = parseInt(latestOrder.order_id.split("-")[2], 10);
          const nextCount = (latestCount + 1).toString().padStart(2, "0");
          nextOrderId = `${currentYear}-${currentMonth}-${nextCount}`;
        } else {
          // Start with "01" if no orders exist for the current month
          nextOrderId = `${currentYear}-${currentMonth}-01`;
        }

        setOrderId(nextOrderId);
      } catch (err) {
        console.error("Failed to fetch latest order ID", err);
      }
    }

    fetchLatestOrderId();
  }, []);

  // Fetch customers for the dropdown
  useEffect(() => {
    async function fetchCustomers() {
      try {
        const response = await fetch("/api/customers");
        if (!response.ok) {
          throw new Error("Failed to fetch customers");
        }
        const customers = await response.json();
        setCustomers(customers);
        console.log(`found ${customers.length} customers!`, customers); // Log customers after fetching
      } catch (err) {
        console.error("Failed to fetch customers", err);
      }
    }

    fetchCustomers();
  }, []);

  // Fetch products when the search input is focused
  const handleFocus = async () => {
    try {
      const response = await fetch("/api/inventory");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const allProducts = await response.json();
      setProducts(allProducts);
      setSearchResults(allProducts); // Show all products by default on focus
      console.log("Fetched all products:", allProducts); // Log fetched products
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  // Filter products based on the search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults(products); // Show all products if the search query is empty
      return;
    }

    const filteredProducts = products.filter((product) =>
      product.item_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredProducts);
    console.log("Filtered products:", filteredProducts); // Log filtered products
  }, [searchQuery, products]);

  // Handle adding a product to the cart
  const addToCart = (product) => {
    const existingProduct = cart.find(
      (item) => item.item_code === product.item_code // Ensure uniqueness by using item_code
    );
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.item_code === product.item_code
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Handle editing product quantity
  const updateQuantity = (productId, quantity) => {
    setCart(
      cart.map((item) =>
        item.item_code === productId
          ? { ...item, quantity: quantity < 1 ? 1 : quantity } // Ensure quantity doesn't go below 1
          : item
      )
    );
  };

  // Handle removing a product from the cart
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.item_code !== productId));
  };

  // Compute the order total
  useEffect(() => {
    const total = cart.reduce(
      (sum, item) => sum + item.unit_price * item.quantity,
      0
    );
    setOrderTotal(total);
  }, [cart]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newOrder = {
      order_id: orderId,
      order_customer_name: selectedCustomer,
      cart,
      order_total: orderTotal,
      order_date: new Date().toISOString(),
      cart: cart.map((item) => ({
        product_id: item.item_code, // Ensure this is the correct ID
        product_quantity: item.quantity,
      })),
    };

    try {
      const response = await fetch("/api/new-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      });

      if (!response.ok) {
        throw new Error("Failed to create new order");
      }

      // Handle success (e.g., redirect or reset form)
      alert("Order created successfully!");
      // Reset form
      setSelectedCustomer("");
      setCart([]);
      setOrderTotal(0);
      setSearchQuery("");
      setSearchResults([]);
    } catch (err) {
      console.error("Error creating new order", err);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Create New Order</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="orderId" className="block font-medium">
            Order ID:
          </label>
          <input
            type="text"
            id="orderId"
            value={orderId}
            readOnly
            className="mt-1 p-2 border rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="customer" className="block font-medium">
            Customer:
          </label>
          <select
            id="customer"
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          >
            <option value="">Select a customer</option>
            {customers.map((customer) => (
              <option key={customer.customer_id} value={customer.customer_name}>
                {customer.customer_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="searchProduct" className="block font-medium">
            Search Products:
          </label>
          <input
            type="text"
            id="searchProduct"
            value={searchQuery}
            onFocus={handleFocus} // Fetch all products on focus
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          />
          {searchResults.length > 0 && (
            <ul className="border rounded mt-2 w-full  overflow-y-auto max-h-[100px] shadow-lg">
              {searchResults.map((product) => (
                <li
                  key={product.item_code}
                  className="p-2 flex justify-between hover:bg-gray-200 cursor-pointer"
                  onClick={() => addToCart(product)}
                >
                  <p>
                    {product.item_name}: Size {product.item_weight} g
                  </p>
                  <p> » Available: {product.available_stock}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-bold">Cart</h2>
          {cart.length === 0 ? (
            <p>No items in cart.</p>
          ) : (
            <ul className="border rounded mt-2">
              {cart.map((item) => (
                <li key={item.item_code} className="p-2 border-b">
                  <div className="flex justify-between items-center">
                    <span>
                      {item.item_name}: ฿{item.unit_price} x{" "}
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            item.item_code,
                            parseInt(e.target.value, 10)
                          )
                        }
                        className="w-16 border p-1 rounded"
                      />
                    </span>
                    <span>฿{item.unit_price * item.quantity}</span>
                    <button
                      onClick={() => removeFromCart(item.item_code)}
                      className="bg-red-500 text-white p-1 rounded"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-bold">Order Total</h2>
          <p className="text-lg">
            {new Intl.NumberFormat("th-TH", {
              style: "currency",
              currency: "THB",
            }).format(orderTotal.toFixed(2))}
          </p>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-4"
        >
          Create Order
        </button>
      </form>
    </div>
  );
}
