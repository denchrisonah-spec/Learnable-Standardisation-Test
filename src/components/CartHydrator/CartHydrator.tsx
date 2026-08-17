import { useEffect, useRef } from "react";
import { useGetCartByIdQuery } from "@/store/api/contentApi";
import { useAppDispatch } from "@/store/hooks";
import { hydrateCart } from "@/store/slices/cartSlice";

/** Which of the carts on dummyjson stands in for "the current shopper". */
const CART_ID = 1;

/**
 * Renders nothing — it exists to pull /carts/:id into the cart slice once, so
 * the header badge reflects a real basket instead of starting at zero.
 */
export function CartHydrator() {
  const dispatch = useAppDispatch();
  const { data: cart } = useGetCartByIdQuery(CART_ID);
  const seeded = useRef(false);

  useEffect(() => {
    if (!cart || seeded.current) return;
    seeded.current = true;

    dispatch(
      hydrateCart(
        cart.products.map((product) => ({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          quantity: product.quantity,
        })),
      ),
    );
  }, [cart, dispatch]);

  return null;
}
