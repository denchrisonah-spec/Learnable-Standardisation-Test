import { useState } from "react";
import {
  formatPrice,
  originalPrice,
  useGetProductsQuery,
  type Product,
} from "@/store/api/productsApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addToCart,
  selectWishlist,
  toggleWishlist,
} from "@/store/slices/cartSlice";
import { Button } from "../Button/Button";
import { Icon } from "../Icon/Icon";
import { SectionHeading } from "../SectionHeading/SectionHeading";
import "./BestsellerProducts.css";

const PAGE_SIZE = 10;

function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector(selectWishlist);
  const isWishlisted = wishlist.includes(product.id);
  const wasDiscounted = product.discountPercentage > 0;

  return (
    <article className="product-card">
      <div className="product-card__media">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="img-cover product-card__img"
          loading="lazy"
        />

        <div className="product-card__actions">
          <button
            type="button"
            onClick={() => dispatch(addToCart(product))}
            className="product-card__add"
          >
            Add to Cart
          </button>
          <button
            type="button"
            onClick={() => dispatch(toggleWishlist(product.id))}
            aria-pressed={isWishlisted}
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
            className="product-card__wish"
          >
            <Icon name="heart" size={16} />
          </button>
        </div>
      </div>

      <div className="product-card__body">
        <h3 className="t-h5 product-card__title">{product.title}</h3>
        <p className="t-h6 product-card__category">{product.category}</p>
        <div className="t-h5 product-card__prices">
          {wasDiscounted && (
            <span className="product-card__was">
              {formatPrice(originalPrice(product))}
            </span>
          )}
          <span className="product-card__now">{formatPrice(product.price)}</span>
        </div>
      </div>
    </article>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="product-skeleton" aria-hidden>
      <div className="product-skeleton__media" />
      <div className="product-skeleton__body">
        <div className="product-skeleton__line product-skeleton__line--a" />
        <div className="product-skeleton__line product-skeleton__line--b" />
        <div className="product-skeleton__line product-skeleton__line--c" />
      </div>
    </div>
  );
}

export function BestsellerProducts() {
  const [skip, setSkip] = useState(0);
  const { data, isLoading, isFetching, isError, refetch } = useGetProductsQuery({
    limit: PAGE_SIZE,
    skip,
  });

  const products = data?.products ?? [];
  const hasMore = data ? products.length < data.total : false;

  return (
    <section className="section">
      <div className="products__inner">
        <SectionHeading
          eyebrow="Featured Products"
          title="BESTSELLER PRODUCTS"
          description="Problems trying to resolve the conflict between "
        />

        {isError ? (
          <div className="products__error">
            <p className="t-body">
              We couldn&apos;t load the products right now.
            </p>
            <Button onClick={() => refetch()}>TRY AGAIN</Button>
          </div>
        ) : (
          <>
            <div className="products__grid">
              {isLoading
                ? Array.from({ length: PAGE_SIZE }, (_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))
                : products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
            </div>

            {hasMore && (
              <div className="products__footer">
                <Button
                  onClick={() => setSkip(products.length)}
                  disabled={isFetching}
                >
                  {isFetching ? "LOADING…" : "LOAD MORE PRODUCTS"}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
