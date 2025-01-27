// "use client";

// import React from "react";
// import { Product } from "../../../types/products";
// import { FaTrash } from "react-icons/fa"; // Import Trash Icon


// // Checkout Component
// export const Checkout = ({
//     cart,
//     removeFromCart,
//   }: {
//     cart: Product[];
//     removeFromCart: (productId: string) => void;
//   }) => {
//     return (
//       <div className="w-1/3 p-8 bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl shadow-xl ml-6">
//         <h2 className="text-purple-700 font-extrabold text-2xl mb-6 text-center uppercase tracking-wide">
//           Checkout
//         </h2>
//         <ul className="space-y-6">
//           {cart.map((item) => (
//             <li
//               key={item._id}
//               className="flex justify-between items-center text-black border-b pb-2"
//             >
//               <div>
//                 <span className="font-medium text-gray-800">{item.title}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <span className="font-extrabold text-purple-600 text-lg">
//                   ${item.price}
//                 </span>
//                 <FaTrash
//                   className="text-red-500 hover:text-red-700 cursor-pointer text-lg"
//                   onClick={() => removeFromCart(item._id)}
//                 />
//               </div>
//             </li>
//           ))}
//         </ul>
//         <div className="mt-8 text-xl font-semibold text-black flex justify-between">
//           <span>Total:</span>
//           <span className="font-bold text-purple-600">
//             ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
//           </span>
//         </div>
//         <button className="bg-gradient-to-r from-green-400 to-teal-500 text-white py-3 px-6 rounded-lg mt-8 w-full font-bold text-lg hover:opacity-90 shadow-md transition">
//           Proceed to Checkout
//         </button>
//       </div>
//     );
//   };
//   export default Checkout;