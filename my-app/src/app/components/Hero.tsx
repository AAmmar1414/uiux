import React from "react";
import Image from "next/image";

const Hero: React.FC = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-between h-screen bg-gray-50 px-4 lg:px-12">
      {/* Left Section */}
      <div className="space-y-6 max-w-lg lg:max-w-xl">
        <h1 className="uppercase text-sm text-gray-600">Welcome to Chairy</h1>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
          Best Furniture Collection <br /> For Your Interior.
        </h2>
        <button className="bg-teal-500 text-white py-3 px-6 rounded-md hover:bg-teal-600 transition">
          Shop Now →
        </button>
      </div>

      {/* Right Section */}
      <div className="w-full sm:w-1/2 mt-6 sm:mt-0 sm:ml-[130px] flex justify-center">
        <Image
          src="/chair.png" // Make sure to put your image in the public folder
          alt="Chair"
          width={434}
          height={584}
          className="w-full h-auto object-contain lg:w-auto lg:h-full"
        />
      </div>
    </div>
  );
};

export default Hero;

