import { configureStore } from "@reduxjs/toolkit";
import cart from "./Slice/CartSlice";
import wishlist from "./Slice/WishlistSlice";
import themeReducer from "./Slice/ThemeSlice";
import authReducer from "./Slice/AuthSlice"; 

const store = configureStore({
  reducer: {
    cart,
    wishlist,
    theme: themeReducer,
    auth: authReducer,
  },
});

export default store;
