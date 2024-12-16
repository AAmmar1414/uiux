import React from "react";
import Image from "next/image";

const ImageCard: React.FC = () => {
  return (
    <div className="flex space-x-4 p-6">
      {/* Left side image */}
      <div className="flex-1">
        <Image
          src="/img1.png"
          alt="Main Image"
          width={500}
          height={500}
          className="w-full h-auto object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Right side grid */}
      <div className="grid grid-cols-2 gap-4 flex-1">
        <Image
          src="/product4.png"
          alt="Image 1"
          width={300}
          height={300}
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
        <Image
          src="/product1.png"
          alt="Image 2"
          width={300}
          height={300}
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
        <Image
          src="/product11.png"
          alt="Image 3"
          width={300}
          height={300}
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
        <Image
          src="/product1.png"
          alt="Image 4"
          width={300}
          height={300}
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default ImageCard;
