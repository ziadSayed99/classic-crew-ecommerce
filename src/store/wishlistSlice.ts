import { createSlice } from "@reduxjs/toolkit";
import { Clothes } from "../data/clothes";

interface WishlistState {
  items: Clothes[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      if (!state.items.find((item) => item.id === product.id)) {
        state.items.push(product);
        localStorage.setItem("wishlist", JSON.stringify(state.items));
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
    saveWishlist: (state) => {
      const wishlist = localStorage.getItem("wishlist");
      if (wishlist) {
        state.items = JSON.parse(wishlist);
      }
    },
    clearWishlist: (state) => {
      state.items = [];
      localStorage.removeItem("wishlist");
    },
  },
});

export const { addToWishlist, removeFromWishlist, saveWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer; 