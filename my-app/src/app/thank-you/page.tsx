import Link from "next/link";

const ThankYouPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-center">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Thank You for Your Order!</h1>
      <p className="text-lg text-gray-600 mb-6">Your order has been placed successfully.</p>
      <Link
        href="/my-orders"
        className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-lg text-lg shadow-xl hover:scale-105 transition duration-300"
      >
        View My Orders
      </Link>
    </div>
  );
};

export default ThankYouPage;