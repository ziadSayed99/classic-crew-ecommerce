import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../data/product";

type CartState = {
  items: Product[];
  totalPrice: number;
  totalQty: number;
};

type PayloadAction<T> = {
  payload: T;
};

const initialState = {
  items: [],
  totalQty: 0,
  totalPrice: 0,
};

export const calcTotal = (arr: number[]) => {
  return arr.reduce((acc, val) => acc + val, 0);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state: { items: Product[]; totalQty: number; totalPrice: number },
      action
    ) => {
      const pro = action.payload.product;
      const product = { ...pro };

      const foundProduct = state.items.find((item) => item.id === product.id);

      if (foundProduct) {
        // Update product quantity and total price
        foundProduct.qty += action.payload.qty;
        foundProduct.totalPrice = foundProduct.qty * foundProduct.price;
      } else {
        // Initialize new product
        product.qty = action.payload.qty;
        product.totalPrice = product.qty * product.price;
        state.items = [...state.items, product];
      }

      // Update total price and total quantity
      state.totalQty = state.items.reduce((sum, item) => sum + item.qty, 0);
      state.totalPrice = calcTotal(state.items.map((item) => item.totalPrice));

      // Persist to local storage
      localStorage.setItem("cart", JSON.stringify(state));
    },

    saveCart: (state) => {
      if (localStorage.getItem("cart")) {
        const cart = JSON.parse(localStorage.getItem("cart") || "null");
        state.items = cart.items;
        state.totalPrice = cart.totalPrice;
        state.totalQty = cart.totalQty;
      }
    },

    addQty: (state: CartState, action: PayloadAction<number>) => {
      const newArr = state.items.map((item) => {
        if (item.id === action.payload) {
          item.qty++;
          item.totalPrice = item.qty * item.price;
        }
        return item;
      });

      state.totalPrice = calcTotal(newArr.map((item) => item.totalPrice)); // Update total price
      state.items = newArr;

      // Save updated cart to local storage
      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeItem: (state: CartState, action: PayloadAction<number>) => {
      const newArr = state.items.filter((item) => item.id !== action.payload);
      const prices = newArr.map((item) => item.price); // Ensure Product includes `price`
      state.totalPrice = calcTotal(prices);
      state.totalQty = newArr.length; // Update total quantity based on the array length
      state.items = newArr;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    decreaseQty: (state: CartState, action: PayloadAction<number>) => {
      const newArr = state.items.map((item) => {
        if (item.id === action.payload && item.qty > 1) {
          item.qty--;
          item.totalPrice = item.qty * item.price;
        }
        return item;
      });

      // Extract total prices of each item
      const totalPrices = newArr.map((item) => item.totalPrice);

      // Calculate the total price based on item total prices
      state.totalPrice = calcTotal(totalPrices);
      state.items = newArr;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    emptyCart: (state) => {
      state.items = [];
      state.totalQty = 0;
      state.totalPrice = 0;
      localStorage.removeItem("cart");
    },
  },
});

export const {
  addToCart,
  saveCart,
  removeItem,
  addQty,
  decreaseQty,
  emptyCart,
} = cartSlice.actions;

const cartReducer = cartSlice.reducer;
export default cartReducer;
