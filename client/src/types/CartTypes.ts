import { MenuItem } from "./restaurantTypes";

// Extending MenuItem with a quantity field for cart items
interface CartItem extends MenuItem {
  quantity: number;
}

// Defining the state and actions for the cart
export type CartState = {
  cart: CartItem[]; // List of items in the cart
  addToCart: (item: MenuItem) => void; // Adds an item to the cart
  clearCart: () => void; // Clears the entire cart
  removeFromCart: (id: string) => void; // Removes an item by ID
  incrementQuantity: (id: string) => void; // Increments the quantity of an item
  decrementQuantity: (id: string) => void; // Decrements the quantity of an item
};
