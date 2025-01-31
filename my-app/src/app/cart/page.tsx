// "use client";

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import Swal from "sweetalert2";
// import { Product } from "../../../types/products";
// import { urlFor } from "@/sanity/lib/image";

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState<(Product & { quantity: number })[]>([]);

//   useEffect(() => {
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) {
//       setCartItems(JSON.parse(savedCart));
//     }
//   }, []);

//   const updateCart = (updatedCart: (Product & { quantity: number })[]) => {
//     setCartItems(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const handleRemove = (id: string) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "This item will be removed from your cart.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, remove it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         const updatedCart = cartItems.filter((item) => item._id !== id);
//         updateCart(updatedCart);

//         Swal.fire("Removed!", "Item has been removed from your cart.", "success");
//       }
//     });
//   };

//   const handleIncrement = (id: string) => {
//     const updatedCart = cartItems.map((item) =>
//       item._id === id ? { ...item, quantity: item.quantity + 1 } : item
//     );
//     updateCart(updatedCart);
//   };

//   const handleDecrement = (id: string) => {
//     const updatedCart = cartItems
//       .map((item) =>
//         item._id === id && item.quantity > 1
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       )
//       .filter((item) => item.quantity > 0);
//     updateCart(updatedCart);
//   };

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   const handleProceedToCheckout = () => {
//     // Here, you can implement your checkout logic or navigate to a checkout page
//     console.log("Proceeding to checkout...");
//     Swal.fire("Proceeding to Checkout", "This is a placeholder action.", "success");
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-6 text-gray-800">Shopping Cart</h1>
//       {cartItems.length > 0 ? (
//         <div>
//           {cartItems.map((item) => (
//             <div
//               key={item._id}
//               className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4"
//             >
//               <div className="flex items-center">
//                 {item.image && (
//                   <Image
//                     src={urlFor(item.image).url()}
//                     alt={item.title}
//                     className="w-16 h-16 rounded-lg"
//                     width={64}
//                     height={64}
//                   />
//                 )}
//                 <div className="ml-4">
//                   <h2 className="text-lg font-semibold text-purple-500">
//                     {item.title}
//                   </h2>
//                   <p className="text-purple-600">Price: ${item.price}</p>
//                   <div className="flex items-center mt-2">
//                     <button
//                       onClick={() => handleDecrement(item._id)}
//                       className="px-2 py-1 bg-purple-200 text-purple-600 rounded-md hover:bg-purple-300"
//                     >
//                       -
//                     </button>
//                     <span className="mx-2 text-black">{item.quantity}</span>
//                     <button
//                       onClick={() => handleIncrement(item._id)}
//                       className="px-2 py-1 bg-purple-200 text-purple-800 rounded-md hover:bg-purple-200"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               <button
//                 onClick={() => handleRemove(item._id)}
//                 className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <div className="bg-white p-4 rounded-lg shadow-md">
//             <div className="flex justify-between">
//               <h2 className="text-xl font-semibold text-black">Total:</h2>
//               <p className="text-xl font-bold text-purple-600">
//                 ${calculateTotal().toFixed(2)}
//               </p>
//             </div>
//           </div>

//           {/* Proceed to Checkout Button */}
//           <div className="mt-6">
//             <button
//               onClick={handleProceedToCheckout}
//               className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded-lg w-full font-bold hover:opacity-90"
//             >
//               Proceed to Checkout
//             </button>
//           </div>
//         </div>
//       ) : (
//         <p className="text-gray-800">Your cart is empty.</p>
//       )}
//     </div>
//   );
// };

// export default CartPage;


"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Swal from "sweetalert2";
import { Product } from "../../../types/products";
import { urlFor } from "@/sanity/lib/image";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<(Product & { quantity: number })[]>([]);
  const router = useRouter();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const updateCart = (updatedCart: (Product & { quantity: number })[]) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleIncrement = (id: string) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedCart);
  };

  const handleDecrement = (id: string) => {
    const updatedCart = cartItems
      .map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);
    updateCart(updatedCart);
  };

  const handleRemove = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This item will be removed from your cart.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCart = cartItems.filter((item) => item._id !== id);
        updateCart(updatedCart);

        Swal.fire("Removed!", "Item has been removed from your cart.", "success");
      }
    });
  };

  const handleProceedToCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Shopping Cart</h1>
      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4"
            >
              <div className="flex items-center">
                {item.image && (
                  <Image
                    src={urlFor(item.image).url()}
                    alt={item.title}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-lg"
                  />
                )}
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-purple-500">
                    {item.title}
                  </h2>
                  <p className="text-black">Price: ${item.price}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleDecrement(item._id)}
                      className="px-2 py-1 bg-purple-200 text-purple-600 rounded-md hover:bg-purple-300"
                    >
                      -
                    </button>
                    <span className="mx-2 text-black">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrement(item._id)}
                      className="px-2 py-1 bg-purple-200 text-purple-800 rounded-md hover:bg-purple-200"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleRemove(item._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Proceed to Checkout Button */}
          <button
            onClick={handleProceedToCheckout}
            className="bg-teal-500 text-white py-2 px-4 rounded-lg w-full font-bold hover:opacity-90 mt-4"
          >
            Proceed to Checkout
          </button>
        </div>
      ) : (
        <p className="text-gray-800">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
