


import { Product } from "../../../types/products";

// Adds a product to the cart
export const addToCart = (product: Product) => {
  const cart: (Product & { inventory: number })[] = JSON.parse(
    localStorage.getItem("cart") || "[]"
  );

  const existingProductIndex = cart.findIndex((item) => item._id === product._id);

  if (existingProductIndex > -1) {
    // Increment the inventory if the product already exists
    cart[existingProductIndex].inventory += 1;
  } else {
    // Add the product with an initial inventory of 1
    cart.push({
      ...product,
      inventory: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

// Removes a product from the cart
export const removeFromCart = (productId: string) => {
  let cart: (Product & { inventory: number })[] = JSON.parse(
    localStorage.getItem("cart") || "[]"
  );
  cart = cart.filter((item) => item._id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Updates the quantity of a product in the cart
export const updateCartQuantity = (productId: string, quantity: number) => {
  const cart: (Product & { inventory: number })[] = JSON.parse(
    localStorage.getItem("cart") || "[]"
  );
  const productIndex = cart.findIndex((item) => item._id === productId);

  if (productIndex > -1) {
    // Update the inventory for the product
    cart[productIndex].inventory = quantity;
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

// Retrieves all items from the cart
export const getCartItems = (): (Product & { inventory: number })[] => {
  return JSON.parse(localStorage.getItem("cart") || "[]");
};
