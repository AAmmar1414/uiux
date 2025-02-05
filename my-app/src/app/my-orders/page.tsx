"use client";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
// Define types for order items and orders
interface OrderItem {
  _id: string;
  title: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  status: string;
  totalAmount: number;
  items: OrderItem[];
}

const MyOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(savedOrders);
  }, []);

  const goToAllProducts = () => {
    router.push("/Productss");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        My Orders
      </h1>

      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-6 bg-white shadow-xl rounded-lg border border-gray-200"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">Order ID: {order.id}</h2>
                <span
                  className={`px-4 py-2 text-sm font-semibold rounded-full ${
                    order.status === "Placed"
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <p className="text-lg font-medium text-gray-600 mb-4">
                Total Amount: ${order.totalAmount.toFixed(2)}
              </p>

              <div className="border-t border-gray-300 mt-4 pt-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Items:</h3>
                <ul className="space-y-4">
                  {order.items.map((item) => (
                    <li
                      key={item._id}
                      className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm"
                    >
                      <div>
                        <p className="text-lg font-medium text-gray-700">{item.title}</p>
                        <p className="text-sm text-gray-500">x{item.quantity}</p>
                      </div>
                      <span className="text-lg font-semibold text-gray-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex justify-end gap-4">
                <Button
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-green-600 transition duration-300"
                >
                  <FaCheckCircle className="mr-2" />
                  Mark as Received
                </Button>
                <Button
                  onClick={goToAllProducts}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-purple-600 transition duration-300"
                >
                  Go to All Products
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg text-gray-600 text-center">
          You don&apos;t have any orders yet.
        </p>
      )}
    </div>
  );
};

export default MyOrdersPage;