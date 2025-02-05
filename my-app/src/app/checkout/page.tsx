"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FaCheckCircle } from "react-icons/fa"; // Add icons

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
  // const placeOrder = () => {
  //   if (!billingInfo.fullName || !billingInfo.email || !billingInfo.address) {
  //     alert("Please fill in all required fields.");
  //     return;
  //   }

  //   alert("Order placed successfully!");
  //   localStorage.removeItem("cart"); // Clear cart after order
  //   router.push("/thank-you"); // Redirect to a thank you page
  // };
  const placeOrder = () => {
    if (!billingInfo.fullName || !billingInfo.email || !billingInfo.address) {
      alert("Please fill in all required fields.");
      return;
    }
  
    // Create the order object
    const order = {
      id: new Date().toISOString(),  // Unique ID for the order
      items: cart,
      billingInfo,
      totalAmount: cart.reduce((total, item) => total + item.price * item.quantity, 0),
      status: "Placed",
    };
  
    // Store the order in localStorage
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
  
    // Clear cart after order
    localStorage.removeItem("cart");
  
    // alert("Order placed successfully!");
    router.push("/thank-you"); // Redirect to a thank you page
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Checkout</h1>

      {/* Billing Information Form */}
      <div className="bg-gradient-to-r from-green-400 to-blue-500 p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-white mb-6">Billing Information</h2>

        <form className="space-y-6 text-lg text-gray-900">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
            onChange={handleInputChange}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="zipCode"
              placeholder="Zip Code"
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
              onChange={handleInputChange}
            />
          </div>
        </form>
      </div>

      {/* Order Summary */}
      <div className="bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Summary</h2>

        {cart.length > 0 ? (
          <ul className="space-y-4 mb-6">
            {cart.map((item) => (
              <li key={item._id} className="flex justify-between items-center border-b pb-4">
                <div>
                  <p className="text-xl font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">x{item.quantity}</p>
                </div>
                <span className="text-lg font-semibold text-gray-800">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-gray-500">Your cart is empty.</p>
        )}

        {/* Place Order Button */}
        {cart.length > 0 && (
          <Button
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-lg text-lg shadow-xl hover:scale-105 transition duration-300"
            onClick={placeOrder}
          >
            <FaCheckCircle className="mr-2" /> Place Order
          </Button>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage