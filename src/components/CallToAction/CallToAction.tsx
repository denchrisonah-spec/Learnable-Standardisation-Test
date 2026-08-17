import {
  formatPrice,
  originalPrice,
  useGetProductByIdQuery,
} from "@/store/api/productsApi";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { Button } from "../Button/Button";
import "./CallToAction.css";

/** Wooden Bathroom Sink With Mirror — the product this section features. */
const FEATURED_PRODUCT_ID = 15;

export function CallToAction() {
  const dispatch = useAppDispatch();
  const { data: product, isLoading } =
    useGetProductByIdQuery(FEATURED_PRODUCT_ID);

  const wasDiscounted = (product?.discountPercentage ?? 0) > 0;

  return (
    <section className="cta">
      <img src="/images/cta-texture.png" alt="" className="cta__bg" />

      {product && (
        <div className="cta__art">
          <div className="cta__art-inner">
            <img
              src={product.images[0] ?? product.thumbnail}
              alt={product.title}
              className="img-contain"
            />
          </div>
        </div>
      )}

      <div className="cta__inner">
        <p className="t-h6 cta__eyebrow">Designing Better Experience</p>

        <h2 className="t-h2 cta__title">
          {isLoading ? "…" : (product?.title ?? "Featured product")}
        </h2>

        <p className="t-body cta__description">
          {product?.description ??
            "Problems trying to resolve the conflict between the two major realms of Classical physics: "}
        </p>

        <div className="t-h3 cta__prices">
          {product && wasDiscounted && (
            <span className="cta__was">
              {formatPrice(originalPrice(product))}
            </span>
          )}
          <span className="cta__now">
            {product ? formatPrice(product.price) : "—"}
          </span>
        </div>

        <Button
          variant="solid"
          disabled={!product}
          onClick={() => product && dispatch(addToCart(product))}
        >
          ADD TO CART
        </Button>
      </div>
    </section>
  );
}
