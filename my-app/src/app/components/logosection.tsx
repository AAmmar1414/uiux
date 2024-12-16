import React from "react";
import Image from "next/image";

const logos = [
  { src: "/icon1.png", alt: "Zapier" },
  { src: "/icon2.png", alt: "Pipedrive" },
  { src: "/icon3.png", alt: "CIB Bank" },
  { src: "/icon4.png", alt: "Red Logo" },
  { src: "/icon5.png", alt: "Burnt Toast" },
  { src: "/icon6.png", alt: "PandaDoc" },
  { src: "/icon7.png", alt: "Moz" },
];

const LogoSection: React.FC = () => {
  return (
    <div className="py-8 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-6">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="w-24 sm:w-28 md:w-32 flex justify-center"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={128}
                height={128}
                className="w-full h-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoSection;
