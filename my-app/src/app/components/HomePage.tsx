import React from "react";

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
        <img
          src="/product2.png"
          alt="Library Stool Chair"
          className="w-full max-w-md h-auto rounded shadow"
        />
      </section>

      {/* Featured Products */}
      <section className="p-6 md:p-12 bg-gray-100">
        <h3 className="text-2xl font-semibold mb-6 text-center">FEATURED PRODUCTS</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {Array(5).fill(0).map((_, index) => (
            <div key={index} className="text-center">
              <img
                src={`/product7-${index + 1}.png`}
                alt={`Product ${index + 1}`}
                className="w-full h-auto max-w-xs mx-auto rounded shadow"
              />
              <h4 className="text-gray-700 mt-4">Library Stool Chair</h4>
              <p className="text-teal-600 font-bold">$99</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
