import React from "react";
import Image from "next/image";

const HomePage: React.FC = () => {
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
    {/* Product 1 */}
    <div className="text-center">
      <Image
        src="/product7.png"
        alt="Product 1"
        width={300}
        height={300}
        className="w-full h-auto max-w-xs mx-auto rounded shadow"
      />
      <h4 className="text-gray-700 mt-4">Library Stool Chair</h4>
      <p className="text-teal-600 font-bold">$99</p>
    </div>

    {/* Product 2 */}
    <div className="text-center">
      <Image
        src="/product1.png"
        alt="Product 2"
        width={300}
        height={300}
        className="w-full h-auto max-w-xs mx-auto rounded shadow"
      />
      <h4 className="text-gray-700 mt-4">Library Stool Chair</h4>
      <p className="text-teal-600 font-bold">$99</p>
    </div>

    {/* Product 3 */}
    <div className="text-center">
      <Image
        src="/Rectangle6.jpg"
        alt="Product 3"
        width={300}
        height={300}
        className="w-full h-auto max-w-xs mx-auto rounded shadow"
      />
      <h4 className="text-gray-700 mt-4">Library Stool Chair</h4>
      <p className="text-teal-600 font-bold">$99</p>
    </div>

    {/* Product 4 */}
    <div className="text-center">
      <Image
        src="/product3.png"
        alt="Product 4"
        width={300}
        height={300}
        className="w-full h-auto max-w-xs mx-auto rounded shadow"
      />
      <h4 className="text-gray-700 mt-4">Library Stool Chair</h4>
      <p className="text-teal-600 font-bold">$99</p>
    </div>

    {/* Product 5 */}
    <div className="text-center">
      <Image
        src="/product9.png"
        alt="Product 5"
        width={300}
        height={300}
        className="w-full h-auto max-w-xs mx-auto rounded shadow"
      />
      <h4 className="text-gray-700 mt-4">Library Stool Chair</h4>
      <p className="text-teal-600 font-bold">$99</p>
    </div>
  </div>
</section>


    </div>
  );
};

export default HomePage;
