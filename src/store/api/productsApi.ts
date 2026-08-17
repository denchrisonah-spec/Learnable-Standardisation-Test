import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

/** A product as returned by https://dummyjson.com/docs/products */
export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  availabilityStatus: string;
  returnPolicy: string;
  images: string[];
  thumbnail: string;
  // Optional: a `select` projection can omit either of these.
  reviews?: Review[];
  meta?: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
};

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type Category = {
  slug: string;
  name: string;
  url: string;
};

export type ProductsQueryArgs = {
  limit?: number;
  skip?: number;
  /** Category slug; omit for all products. */
  category?: string;
  /** Comma-separated field projection, e.g. "title,price". */
  select?: string;
  sortBy?: string;
  order?: "asc" | "desc";
};

/**
 * `price` from the API is the current (discounted) price. The design shows a
 * struck-through original alongside it, so we reverse the discount to get it.
 */
export function originalPrice(product: Product): number {
  const discount = product.discountPercentage ?? 0;
  if (discount <= 0) return product.price;
  return product.price / (1 - discount / 100);
}

export function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`;
}

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    /**
     * Paginated product list. Successive pages are merged into a single cache
     * entry so the "LOAD MORE PRODUCTS" button appends rather than replaces.
     */
    getProducts: builder.query<ProductsResponse, ProductsQueryArgs>({
      query: ({ limit = 10, skip = 0, category, select, sortBy, order }) => ({
        url: category ? `/products/category/${category}` : "/products",
        params: {
          limit,
          skip,
          ...(select ? { select } : {}),
          ...(sortBy ? { sortBy } : {}),
          ...(order ? { order } : {}),
        },
      }),
      // One cache entry per category, regardless of the paging args.
      serializeQueryArgs: ({ endpointName, queryArgs }) =>
        `${endpointName}(${queryArgs.category ?? "all"})`,
      merge: (cache, incoming) => {
        const seen = new Set(cache.products.map((p) => p.id));
        cache.products.push(...incoming.products.filter((p) => !seen.has(p.id)));
        cache.total = incoming.total;
        cache.skip = incoming.skip;
        cache.limit = incoming.limit;
      },
      forceRefetch: ({ currentArg, previousArg }) =>
        currentArg?.skip !== previousArg?.skip,
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ id }) => ({
                type: "Product" as const,
                id,
              })),
              { type: "Product" as const, id: "LIST" },
            ]
          : [{ type: "Product" as const, id: "LIST" }],
    }),

    getProductById: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Product", id }],
    }),

    searchProducts: builder.query<
      ProductsResponse,
      { q: string; limit?: number; skip?: number }
    >({
      query: ({ q, limit = 10, skip = 0 }) => ({
        url: "/products/search",
        params: { q, limit, skip },
      }),
      providesTags: [{ type: "Product", id: "LIST" }],
    }),

    getCategories: builder.query<Category[], void>({
      query: () => "/products/categories",
    }),

    /** Plain slugs — lighter than getCategories when you only need names. */
    getCategoryList: builder.query<string[], void>({
      query: () => "/products/category-list",
    }),

    /* Writes. dummyjson simulates these: the response looks real but nothing
       is persisted server-side, so a refetch won't reflect the change. */

    addProduct: builder.mutation<Product, Partial<Product>>({
      query: (body) => ({ url: "/products/add", method: "POST", body }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),

    updateProduct: builder.mutation<Product, { id: number } & Partial<Product>>({
      query: ({ id, ...body }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_r, _e, { id }) => [{ type: "Product", id }],
    }),

    deleteProduct: builder.mutation<Product & { isDeleted: boolean }, number>({
      query: (id) => ({ url: `/products/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useSearchProductsQuery,
  useGetCategoriesQuery,
  useGetCategoryListQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
