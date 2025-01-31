// import React from "react";
// import Image from "next/image";

// interface ProductProps {
//   id: number;
//   imageSrc: string;
//   alt: string;
//   description: string;
//   price: string;
// }

// const products: ProductProps[] = [
//   {
//     id: 1,
//     imageSrc: "/product1.png",
//     alt: "Product 1",
//     description: "Amazing Product 1 with a long description to test overflow handling.",
//     price: "$49.99",
//   },
//   {
//     id: 2,
//     imageSrc: "/product2.png",
//     alt: "Product 2",
//     description: "Amazing Product 2 with a long description to test overflow handling.",
//     price: "$59.99",
//   },
//   {
//     id: 3,
//     imageSrc: "/product3.png",
//     alt: "Product 3",
//     description: "Amazing Product 3 with a long description to test overflow handling.",
//     price: "$69.99",
//   },
// ];

// const FeaturedProducts: React.FC = () => {
//   return (
//     <div className="relative w-full max-w-[1920px] mx-auto mt-12 px-4">
//       {/* Heading */}
//       <h1 className="text-center text-3xl font-bold mb-8">Featured Products</h1>

//       {/* Responsive Product Grid */}
//       <div className="flex flex-wrap justify-center gap-6">
//         {products.map((product) => (
//           <div
//             key={product.id}
//             className="flex flex-col items-center justify-between bg-gray-200 rounded-lg p-4 shadow-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-auto"
//           >
//             {/* Image */}
//             <Image
//               src={product.imageSrc}
//               alt={product.alt}
//               width={400} // Adjust width
//               height={400} // Adjust height
//               className="w-full h-48 object-cover rounded-md mb-4"
//             />

//             {/* Description (with overflow control) */}
//             <div className="flex flex-col justify-between flex-grow h-full overflow-y-auto">
//               <p className="text-center text-lg font-medium text-gray-700 mb-4">
//                 {product.description}
//               </p>

//               {/* Price */}
//               <p className="text-center text-xl font-bold text-green-600 mt-2">
//                 {product.price}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FeaturedProducts;


"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "../../../types/products";
import { client } from "@/sanity/lib/client";
import { four, three } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { FaTimes, FaTrash } from "react-icons/fa";
import Link from "next/link";

const TopProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<(Product & { quantity: number })[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      const fetchedProducts: Product[] = await client.fetch(three);
      setProducts(fetchedProducts);
    }
    fetchProducts();

    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const updateCart = (updatedCart: (Product & { quantity: number })[]) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === product._id);
      let updatedCart;

      if (existingProduct) {
        updatedCart = prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });

    setIsCartOpen(true); // Open the cart panel
  };

  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    updateCart(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="flex">
      {/* Cart Drawer */}
      <div
        className={`fixed top-0 left-0 w-80 bg-gray-50 shadow-xl h-full p-6 transition-transform transform ${
          isCartOpen ? "translate-x-0" : "-translate-x-full"
        } z-50`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-purple-600">Your Cart</h2>
          <FaTimes
            className="text-gray-600 cursor-pointer hover:text-gray-800 text-lg"
            onClick={() => setIsCartOpen(false)}
          />
        </div>

        {cart.length > 0 ? (
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item._id} className="flex items-center justify-between">
                <div className="flex items-center">
                  {item.image && (
                    <Image
                      src={urlFor(item.image).url()}
                      alt={item.title}
                      className="w-16 h-16 rounded-lg"
                      width={64}
                      height={64}
                    />
                  )}
                  <div className="ml-4">
                    <h3 className="text-md font-semibold text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-sm text-purple-500">
                      ${item.price} x {item.quantity}
                    </p>
                  </div>
                </div>
                <FaTrash
                  className="text-red-500 cursor-pointer hover:text-red-700 text-lg"
                  onClick={() => removeFromCart(item._id)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 mt-6">Your cart is empty.</p>
        )}

        {cart.length > 0 && (
          <div className="mt-8">
            <div className="flex justify-between text-gray-800 font-semibold mb-4">
              <span>Total:</span>
              <span className="text-purple-600 font-bold">
                ${calculateTotal().toFixed(2)}
              </span>
            </div>
            <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded-lg w-full font-bold hover:opacity-90">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div className="flex-grow p-6">
      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent mb-8">
  TOP Products
</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-black p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <Link href={`/products/${product.slug.current}`} className="block">
                {product.image && (
                  <Image
                    src={urlFor(product.image).url()}
                    alt={product.title}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover mb-3 rounded-lg"
                  />
                )}
                <h3 className="text-lg font-semibold mb-2 text-green-500">{product.title}</h3>
                <p className="text-gray-100 mb-1">Description: {product.description}</p>
                <p className="font-bold mb-3 text-purple-400">Price: ${product.price}</p>
              </Link>
              <button
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 px-4 rounded-lg hover:opacity-90"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopProducts;