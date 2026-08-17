import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { contentApi } from "./api/contentApi";
import { productsApi } from "./api/productsApi";
import cartReducer from "./slices/cartSlice";

/**
 * A store factory rather than a module-level singleton: with the App Router a
 * fresh store per client entry keeps state from leaking between requests.
 */
export function makeStore() {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
      [productsApi.reducerPath]: productsApi.reducer,
      [contentApi.reducerPath]: contentApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productsApi.middleware, contentApi.middleware),
  });

  // Enables refetchOnFocus / refetchOnReconnect behaviour.
  setupListeners(store.dispatch);

  return store;
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
