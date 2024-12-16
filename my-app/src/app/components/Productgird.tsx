import React from "react";
import Image from "next/image"; // Import Image from next/image

const ProductGrid = () => {
  const products = [
    { id: 1, image: "/product1.png", name: "Product 1", price: "$10" },
    { id: 2, image: "/product2.png", name: "Product 2", price: "$20" },
    { id: 3, image: "/product3.png", name: "Product 3", price: "$30" },
    { id: 4, image: "/product4.png", name: "Product 4", price: "$40" },
    { id: 5, image: "/products5.png", name: "Product 5", price: "$50" },
    { id: 6, image: "/product6.png", name: "Product 6", price: "$60" },
    { id: 7, image: "/product7.png", name: "Product 7", price: "$70" },
    { id: 8, image: "/product1.png", name: "Product 8", price: "$80" },
    { id: 9, image: "/product9.png", name: "Product 9", price: "$90" },
    { id: 10, image: "/product10.png", name: "Product 10", price: "$100" },
    { id: 11, image: "/product1.png", name: "Product 11", price: "$110" },
    { id: 12, image: "/products5.png", name: "Product 12", price: "$120" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 sm:gap-6 sm:p-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="relative flex flex-col items-center border p-3 rounded-lg shadow-sm hover:shadow-md bg-white transition-transform transform hover:scale-105"
        >
          {/* Cart Icon (Bottom Right) with Image */}
          <div className="absolute bottom-16 right-2 bg-gray-200 p-2 rounded-full shadow-md">
            <Image
              src="/cart.png" // Replace with the path to your cart image
              alt="Cart Icon"
              width={24} // Adjust size as needed
              height={24}
              className="rounded-full"
            />
          </div>
          <Image
            src={product.image}
            alt={product.name}
            width={300} // Define image width
            height={200} // Define image height
            className="w-full h-40 md:h-48 object-cover mb-3 rounded-lg"
          />
          <h3 className="text-md md:text-lg font-semibold mb-1 text-black">{product.name}</h3>
          <p className="text-sm md:text-base text-black">{product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
