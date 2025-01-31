"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface CartItem {
  _id: string;
  title: string;
  price: number;
  quantity: number;
}

const CheckoutPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [billingInfo, setBillingInfo] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const router = useRouter();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
  };

  // Place Order
  const placeOrder = () => {
    if (!billingInfo.fullName || !billingInfo.email || !billingInfo.address) {
      alert("Please fill in all required fields.");
      return;
    }

    alert("Order placed successfully!");
    localStorage.removeItem("cart"); // Clear cart after order
    router.push("/thank-you"); // Redirect to a thank you page
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Billing Information Form */}
      <div className="bg-gray-100 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Billing Information</h2>

        <form className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="w-full p-2 border rounded"
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="w-full p-2 border rounded"
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            className="w-full p-2 border rounded"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="zipCode"
            placeholder="Zip Code"
            className="w-full p-2 border rounded"
            onChange={handleInputChange}
          />
        </form>
      </div>

      {/* Order Summary */}
      <div className="bg-white p-6 shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        {cart.length > 0 ? (
          <ul className="mb-4">
            {cart.map((item) => (
              <li key={item._id} className="flex justify-between border-b py-2">
                <span>{item.title} (x{item.quantity})</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}

        {/* Place Order Button */}
        {cart.length > 0 && (
          <Button className="w-full bg-green-600 text-white py-2 rounded-lg" onClick={placeOrder}>
            Place Order
          </Button>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
