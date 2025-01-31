// "use client";

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { Product } from "../../../types/products"; // Adjust the path if necessary
// import { client } from "@/sanity/lib/client"; // Make sure this path is correct
// import { eight, four } from "@/sanity/lib/queries"; // Assuming 'four' is the query you use for featured products
// import { urlFor } from "@/sanity/lib/image"; // This should be correctly set up for your images

// const HomePage: React.FC = () => {
//   const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

//   // Fetch products on component mount
//   useEffect(() => {
//     async function fetchProducts() {
//       try {
//         const products: Product[] = await client.fetch(eight); // Fetch featured products
//         setFeaturedProducts(products);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     }

//     fetchProducts();
//   }, []);

//   return (
//     <div className="min-h-screen bg-white text-gray-900">
//       {/* Hero Section */}
//       <section className="flex flex-col md:flex-row justify-between items-center p-6 md:p-12">
//         <div className="text-center md:text-left mb-6 md:mb-0">
//           <h2 className="text-3xl md:text-4xl font-semibold mb-4">Library Stool Chair</h2>
//           <p className="text-gray-600 mb-4 max-w-md mx-auto md:mx-0">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt erat enim.
//           </p>
//           <button className="bg-teal-500 text-white px-6 py-2 rounded shadow hover:bg-teal-600">
//             Add To Cart
//           </button>
//         </div>
//         <Image
//           src="/product2.png"
//           alt="Library Stool Chair"
//           width={500}
//           height={500}
//           className="w-full max-w-md h-auto rounded shadow"
//         />
//       </section>

//       {/* Featured Products */}
//       <section className="p-6 md:p-12 bg-gray-100">
//         <h3 className="text-2xl font-semibold mb-6 text-center">FEATURED PRODUCTS</h3>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//           {featuredProducts.length > 0 ? (
//             featuredProducts.map((product) => (
//               <div key={product._id} className="text-center">
//                 <Image
//                   src={urlFor(product.image).url()} // Dynamically fetch the image URL from Sanity
//                   alt={product.title}
//                   width={300}
//                   height={300}
//                   className="w-full h-auto max-w-xs mx-auto rounded shadow"
//                 />
//                 <h4 className="text-gray-700 mt-4">{product.title}</h4>
//                 <p className="text-teal-600 font-bold">${product.price}</p>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-600 text-center">Loading featured products...</p>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default HomePage;


"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "../../../types/products"; // Adjust the path if necessary
import { client } from "@/sanity/lib/client"; // Ensure the correct import path
import { eight } from "@/sanity/lib/queries"; // Query for fetching featured products
import { urlFor } from "@/sanity/lib/image"; // Image handler for Sanity

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  // Fetch products on component mount
  useEffect(() => {
    async function fetchProducts() {
      try {
        const products: Product[] = await client.fetch(eight); // Fetch featured products
        setFeaturedProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  // Add to Cart function
  const addToCart = (product: Product) => {
    const updatedCart = [...cart, { ...product, quantity: 1 }];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${product.title} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row justify-between items-center p-6 md:p-12">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Library Stool Chair</h2>
          <p className="text-gray-600 mb-4 max-w-md mx-auto md:mx-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt erat enim.
          </p>
          <button className="bg-teal-500 text-white px-6 py-2 rounded shadow hover:bg-teal-600">
            Add To Cart
          </button>
        </div>
        <Image
          src="/product2.png"
          alt="Library Stool Chair"
          width={500}
          height={500}
          className="w-full max-w-md h-auto rounded shadow"
        />
      </section>

      {/* Featured Products */}
      <section className="p-6 md:p-12 bg-gray-100">
        <h3 className="text-2xl font-semibold mb-6 text-center">FEATURED PRODUCTS</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <div key={product._id} className="text-center bg-white p-4 rounded-lg shadow">
                {/* Image Handling */}
                {product.image ? (
                  <Image
                    src={urlFor(product.image).url()} // Ensure valid image URL
                    alt={product.title}
                    width={300}
                    height={300}
                    className="w-full h-auto max-w-xs mx-auto rounded shadow"
                  />
                ) : (
                  <div className="w-full h-[300px] flex items-center justify-center bg-gray-200 text-gray-500">
                    No Image Available
                  </div>
                )}

                {/* Product Details */}
                <h4 className="text-gray-700 mt-4">{product.title}</h4>
                <p className="text-teal-600 font-bold">${product.price}</p>

                {/* Add to Cart Button */}
                <button
                  className="mt-2 bg-teal-500 text-white px-4 py-2 rounded shadow hover:bg-teal-600"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">Loading featured products...</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;

