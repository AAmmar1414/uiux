import React from "react";
import Image from "next/image";



const About = () => {
  return (
    <section className="flex items-center p-10">
      <div className="w-1/2 p-4">
        <h2 className="text-3xl font-semibold mb-4">About Us - Comforty</h2>
        <p>
          At Comforty, we believe that the right chair can transform your space. Specializing in
          handcrafted designs, we offer furniture that blends style and functionality.
        </p>
        <button className="mt-4 px-4 py-2 bg-teal-500 text-white rounded">View Collection</button>
      </div>
      <div className="w-1/2">
      <Image
          src="/product2.png"
          alt="Chair"
          width={600}
          height={400}
          className="rounded shadow-md"
        />

      </div>
    </section>
  );
};

export default About;
