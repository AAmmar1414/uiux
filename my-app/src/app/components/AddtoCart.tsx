

// "use client"; // Mark this as a client component

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Product } from "../../../types/products";
// import { Button } from "@/components/ui/button";
// import { motion, AnimatePresence } from "framer-motion";

// interface AddToCartProps {
//   product: Product;
// }

// const AddToCartButton: React.FC<AddToCartProps> = ({ product }) => {
//   const [cart, setCart] = useState<(Product & { quantity: number })[]>([]);
//   const router = useRouter();

//   useEffect(() => {
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) {
//       setCart(JSON.parse(savedCart));
//     }
//   }, []);

//   const updateCart = (updatedCart: (Product & { quantity: number })[]) => {
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const addToCart = () => {
//     setCart((prevCart) => {
//       const existingProduct = prevCart.find((item) => item._id === product._id);
//       let updatedCart;

//       if (existingProduct) {
//         updatedCart = prevCart.map((item) =>
//           item._id === product._id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         updatedCart = [...prevCart, { ...product, quantity: 1 }];
//       }

//       localStorage.setItem("cart", JSON.stringify(updatedCart));
//       return updatedCart;
//     });
//   };

//   const removeFromCart = () => {
//     setCart((prevCart) => {
//       const updatedCart = prevCart
//         .map((item) =>
//           item._id === product._id
//             ? { ...item, quantity: item.quantity - 1 }
//             : item
//         )
//         .filter((item) => item.quantity > 0);

//       localStorage.setItem("cart", JSON.stringify(updatedCart));
//       return updatedCart;
//     });
//   };

//   const proceedToCheckout = () => {
//     router.push("/checkout");
//   };

//   const cartItem = cart.find((item) => item._id === product._id);
//   const quantity = cartItem ? cartItem.quantity : 0;

//   return (
//     <motion.div
//       className="flex flex-col gap-4"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="flex items-center gap-4">
//         <motion.button
//           className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded-lg hover:opacity-90"
//           onClick={addToCart}
//           whileTap={{ scale: 0.9 }}
//           whileHover={{ scale: 1.05 }}
//         >
//           Add to Cart
//         </motion.button>

//         <AnimatePresence>
//           {quantity > 0 && (
//             <motion.button
//               className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
//               onClick={removeFromCart}
//               whileTap={{ scale: 0.9 }}
//               exit={{ opacity: 0, scale: 0.8 }}
//             >
//               Remove
//             </motion.button>
//           )}
//         </AnimatePresence>
//       </div>

//       <AnimatePresence>
//         {cart.length > 0 && (
//           <motion.button
//             className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
//             onClick={proceedToCheckout}
//             whileTap={{ scale: 0.9 }}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//           >
//             Proceed to Checkout
//           </motion.button>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// };

// export default AddToCartButton;

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // For Next.js 13+ (app directory)
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  _id: string;
  name: string;
  price: number;
}

interface AddToCartProps {
  product: Product;
}

const AddToCartButton: React.FC<AddToCartProps> = ({ product }) => {
  const [cart, setCart] = useState<(Product & { quantity: number })[]>([]);
  const router = useRouter();

  // Load the cart from localStorage when the component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save the cart to localStorage and update state
  const updateCart = (updatedCart: (Product & { quantity: number })[]) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Add product to cart
  const addToCart = () => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === product._id);
      let updatedCart;

      if (existingProduct) {
        updatedCart = prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }

      updateCart(updatedCart);
      return updatedCart;
    });
  };

  // Remove product from cart
  const removeFromCart = () => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      updateCart(updatedCart);
      return updatedCart;
    });
  };

  // Navigate to the checkout page
  const proceedToCheckout = () => {
    router.push("/checkout");
  };

  // Get the quantity of the product in the cart
  const cartItem = cart.find((item) => item._id === product._id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <motion.div
      className="flex flex-col gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-4">
        <motion.button
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded-lg hover:opacity-90"
          onClick={addToCart}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
        >
          Add to Cart
        </motion.button>

        <AnimatePresence>
          {quantity > 0 && (
            <motion.button
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              onClick={removeFromCart}
              whileTap={{ scale: 0.9 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              Remove
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {cart.length > 0 && (
          <motion.button
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
            onClick={proceedToCheckout}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            Proceed to Checkout
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AddToCartButton;
