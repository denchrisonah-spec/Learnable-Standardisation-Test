import { useState, type ReactNode } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/store";
import { CartHydrator } from "../CartHydrator/CartHydrator";

export function Providers({ children }: { children: ReactNode }) {
  // Lazy initialiser: the store is created once, never on every render.
  const [store] = useState(makeStore);

  return (
    <Provider store={store}>
      <CartHydrator />
      {children}
    </Provider>
  );
}
