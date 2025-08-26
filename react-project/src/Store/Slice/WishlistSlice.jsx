import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistItems: [],
  },
  reducers: {
    addItemToWishlist: (state, action) => {
      const exists = state.wishlistItems.find(
        (item) => item.id === action.payload.id
      );
      if (exists) {
        toast.info(`${action.payload.title} is already in wishlist`);
      } else {
        state.wishlistItems.push(action.payload);
        toast.success(`${action.payload.title} added to wishlist`);
      }
    },
    removeItemFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item.id !== action.payload
      );
      toast.warn("Item removed from wishlist");
    },
    clearWishlist: (state) => {
      state.wishlistItems = [];
      toast.info("Wishlist cleared");
    },
  },
});

export const { addItemToWishlist, removeItemFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
