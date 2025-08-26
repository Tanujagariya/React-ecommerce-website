import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const exists = state.find((i) => i.id === item.id);

      if (!exists) {
        state.push({ ...item, quantity: 1 });
        toast.success(`${item.title} added to cart!`);
      } else {
        toast.info(`${item.title} is already in cart!`);
      }
    },
    removeFromCart: (state, action) => {
      const updated = state.filter((i) => i.id !== action.payload);
      toast.warn("Item removed from cart!");
      return updated;
    },
    clearCart: () => {
      toast.info("Cart cleared!");
      return [];
    },
    incrementQuantity: (state, action) => {
      const item = state.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
        toast.success(`Increased quantity of ${item.title}`);
      }
    },
    decrementQuantity: (state, action) => {
      const index = state.findIndex((i) => i.id === action.payload);
      if (index !== -1) {
        if (state[index].quantity > 1) {
          state[index].quantity -= 1;
          toast.info(`Decreased quantity of ${state[index].title}`);
        } else {
          const removedItem = state[index];
          state.splice(index, 1);
          toast.warn(`${removedItem.title} removed from cart!`);
        }
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;


