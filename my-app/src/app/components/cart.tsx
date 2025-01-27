import React, { useState } from "react";
import Image from "next/image";

interface Product {
  id: number;
  image: string;
  name: string;
  price: string;
}

const CartManager: React.FC = () => {
  const products: Product[] = [
    { id: 1, image: "/product1.png", name: "Product 1", price: "$10" },
    { id: 2, image: "/product2.png", name: "Product 2", price: "$20" },
    { id: 3, image: "/product3.png", name: "Product 3", price: "$30" },
    { id: 4, image: "/product4.png", name: "Product 4", price: "$40" },
  ];

  const [cart, setCart] = useState<Product[]>([]);

  // Add a product to the cart
  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Remove a product from the cart
  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-4">
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative flex flex-col items-center border p-3 rounded-lg shadow-sm hover:shadow-md bg-white transition-transform transform hover:scale-105"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={200}
              className="w-full h-40 md:h-48 object-cover mb-3 rounded-lg"
            />
            <h3 className="text-md md:text-lg font-semibold mb-1 text-black">{product.name}</h3>
            <p className="text-sm md:text-base text-black">{product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      <div className="flex-1 border p-4 rounded-lg shadow-sm bg-white">
        <h2 className="text-lg md:text-xl font-bold mb-4">Cart</h2>
        {cart.length > 0 ? (
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={50}
                    height={50}
                    className="w-12 h-12 rounded-lg"
                  />
                  <div>
                    <h3 className="text-sm md:text-md font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default CartManager;
