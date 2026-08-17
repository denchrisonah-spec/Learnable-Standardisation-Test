import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../api/productsApi";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
  /** Product ids the user has favourited. */
  wishlist: number[];
};

const initialState: CartState = {
  items: [],
  wishlist: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
        return;
      }

      state.items.push({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity: 1,
      });
    },

    /**
     * Seeds the cart from /carts on first load. Skipped once the shopper has
     * added anything themselves, so it can never clobber their selection.
     */
    hydrateCart(state, action: PayloadAction<CartItem[]>) {
      if (state.items.length === 0) state.items = action.payload;
    },

    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    setQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) {
      const { id, quantity } = action.payload;
      const item = state.items.find((entry) => entry.id === id);
      if (!item) return;

      if (quantity <= 0) {
        state.items = state.items.filter((entry) => entry.id !== id);
        return;
      }
      item.quantity = quantity;
    },

    clearCart(state) {
      state.items = [];
    },

    toggleWishlist(state, action: PayloadAction<number>) {
      const id = action.payload;
      state.wishlist = state.wishlist.includes(id)
        ? state.wishlist.filter((entry) => entry !== id)
        : [...state.wishlist, id];
    },
  },
  selectors: {
    selectCartItems: (state) => state.items,
    selectCartCount: (state) =>
      state.items.reduce((total, item) => total + item.quantity, 0),
    selectCartTotal: (state) =>
      state.items.reduce((total, item) => total + item.price * item.quantity, 0),
    selectWishlist: (state) => state.wishlist,
    selectWishlistCount: (state) => state.wishlist.length,
  },
});

export const {
  addToCart,
  hydrateCart,
  removeFromCart,
  setQuantity,
  clearCart,
  toggleWishlist,
} = cartSlice.actions;

export const {
  selectCartItems,
  selectCartCount,
  selectCartTotal,
  selectWishlist,
  selectWishlistCount,
} = cartSlice.selectors;

export default cartSlice.reducer;
