// "use client";

// import React, { useEffect, useState } from "react";
// import Image from "next/image";

// interface AboutData {
//   title: string;
//   description: string;
//   buttonText: string;
//   imageUrl: string;
// }

// const About = () => {
//   const [aboutData, setAboutData] = useState<AboutData | null>(null);

//   useEffect(() => {
//     // Simulate fetching data from an API or CMS
//     const fetchAboutData = async () => {
//       const response = await fetch("/api/about"); // Replace with your API endpoint
//       const data: AboutData = await response.json();
//       setAboutData(data);
//     };

//     fetchAboutData();
//   }, []);

//   if (!aboutData) {
//     return <div className="p-10">Loading...</div>;
//   }

//   return (
//     <section className="flex flex-wrap items-center p-10">
//       <div className="w-full md:w-1/2 p-4">
//         <h2 className="text-3xl font-semibold mb-4">{aboutData.title}</h2>
//         <p>{aboutData.description}</p>
//         <button className="mt-4 px-4 py-2 bg-teal-500 text-white rounded">
//           {aboutData.buttonText}
//         </button>
//       </div>
//       <div className="w-full md:w-1/2">
//         <Image
//           src={aboutData.imageUrl}
//           alt="About Image"
//           width={600}
//           height={400}
//           className="rounded shadow-md"
//         />
//       </div>
//     </section>
//   );
// };

// export default About;




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
