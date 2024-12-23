import { CartState } from "@/types/CartTypes";
import { MenuItem } from "@/types/restaurantTypes";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Zustand store for the shopping cart
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],

      addToCart: (item: MenuItem) => {
        set((state) => {
          const existingItem = state.cart.find((cartItem) => cartItem._id === item._id);
          if (existingItem) {
            // Increment quantity if the item already exists
            return {
              cart: state.cart.map((cartItem) =>
                cartItem._id === item._id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              ),
            };
          } else {
            // Add a new item with a default quantity of 1
            return {
              cart: [...state.cart, { ...item, quantity: 1 }],
            };
          }
        });
      },

      clearCart: () => {
        set({ cart: [] }); // Clears the entire cart
      },

      removeFromCart: (id: string) => {
        set((state) => ({
          cart: state.cart.filter((cartItem) => cartItem._id !== id),
        }));
      },

      incrementQuantity: (id: string) => {
        set((state) => ({
          cart: state.cart.map((cartItem) =>
            cartItem._id === id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
        }));
      },

      decrementQuantity: (id: string) => {
        set((state) => ({
          cart: state.cart
            .map((cartItem) =>
              cartItem._id === id
                ? { ...cartItem, quantity: Math.max(cartItem.quantity - 1, 1) }
                : cartItem
            )
            .filter((cartItem) => cartItem.quantity > 0), // Remove items with quantity 0
        }));
      },
    }),
    {
      name: "cart-name", // Key name for localStorage
      storage: createJSONStorage(() => localStorage), 
    }
  )
);
