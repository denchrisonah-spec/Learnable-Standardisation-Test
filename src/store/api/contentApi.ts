import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/*
 * Everything on https://dummyjson.com/docs that isn't /products.
 * Products keep their own slice (productsApi) because they carry the
 * paging/merge behaviour the bestseller grid depends on.
 */

type Page = { total: number; skip: number; limit: number };
export type PageArgs = { limit?: number; skip?: number; select?: string };

export type Post = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: { likes: number; dislikes: number };
  views: number;
  userId: number;
};

export type Comment = {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: { id: number; username: string; fullName: string };
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  image: string;
  company?: { department: string; name: string; title: string };
  address?: { city: string; state: string; country: string };
};

export type Quote = {
  id: number;
  quote: string;
  author: string;
};

export type CartProduct = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
  thumbnail: string;
};

export type Cart = {
  id: number;
  products: CartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
};

export type Recipe = {
  id: number;
  name: string;
  image: string;
  cuisine: string;
  difficulty: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  mealType: string[];
};

export type Todo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};

type PostsResponse = Page & { posts: Post[] };
type CommentsResponse = Page & { comments: Comment[] };
type UsersResponse = Page & { users: User[] };
type QuotesResponse = Page & { quotes: Quote[] };
type CartsResponse = Page & { carts: Cart[] };
type RecipesResponse = Page & { recipes: Recipe[] };
type TodosResponse = Page & { todos: Todo[] };

const pageParams = ({ limit = 10, skip = 0, select }: PageArgs) => ({
  limit,
  skip,
  ...(select ? { select } : {}),
});

export const contentApi = createApi({
  reducerPath: "contentApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  tagTypes: ["Post", "Comment", "User", "Quote", "Cart", "Recipe", "Todo"],
  endpoints: (builder) => ({
    // ── posts ────────────────────────────────────────────────────────────
    getPosts: builder.query<PostsResponse, PageArgs>({
      query: (args) => ({ url: "/posts", params: pageParams(args) }),
      providesTags: [{ type: "Post", id: "LIST" }],
    }),
    getPostById: builder.query<Post, number>({
      query: (id) => `/posts/${id}`,
      providesTags: (_r, _e, id) => [{ type: "Post", id }],
    }),

    // ── comments ─────────────────────────────────────────────────────────
    getComments: builder.query<CommentsResponse, PageArgs>({
      query: (args) => ({ url: "/comments", params: pageParams(args) }),
      providesTags: [{ type: "Comment", id: "LIST" }],
    }),
    /** Comments belonging to one post — drives the blog card's count. */
    getCommentsByPost: builder.query<CommentsResponse, number>({
      query: (postId) => `/comments/post/${postId}`,
      providesTags: (_r, _e, postId) => [{ type: "Comment", id: postId }],
    }),

    // ── users ────────────────────────────────────────────────────────────
    getUsers: builder.query<UsersResponse, PageArgs>({
      query: (args) => ({ url: "/users", params: pageParams(args) }),
      providesTags: [{ type: "User", id: "LIST" }],
    }),
    getUserById: builder.query<User, number>({
      query: (id) => `/users/${id}`,
      providesTags: (_r, _e, id) => [{ type: "User", id }],
    }),

    // ── quotes ───────────────────────────────────────────────────────────
    getQuotes: builder.query<QuotesResponse, PageArgs>({
      query: (args) => ({ url: "/quotes", params: pageParams(args) }),
      providesTags: [{ type: "Quote", id: "LIST" }],
    }),
    getQuoteById: builder.query<Quote, number>({
      query: (id) => `/quotes/${id}`,
      providesTags: (_r, _e, id) => [{ type: "Quote", id }],
    }),

    // ── carts ────────────────────────────────────────────────────────────
    getCarts: builder.query<CartsResponse, PageArgs>({
      query: (args) => ({ url: "/carts", params: pageParams(args) }),
      providesTags: [{ type: "Cart", id: "LIST" }],
    }),
    getCartById: builder.query<Cart, number>({
      query: (id) => `/carts/${id}`,
      providesTags: (_r, _e, id) => [{ type: "Cart", id }],
    }),

    // ── recipes ──────────────────────────────────────────────────────────
    getRecipes: builder.query<RecipesResponse, PageArgs>({
      query: (args) => ({ url: "/recipes", params: pageParams(args) }),
      providesTags: [{ type: "Recipe", id: "LIST" }],
    }),
    getRecipeById: builder.query<Recipe, number>({
      query: (id) => `/recipes/${id}`,
      providesTags: (_r, _e, id) => [{ type: "Recipe", id }],
    }),

    // ── todos ────────────────────────────────────────────────────────────
    getTodos: builder.query<TodosResponse, PageArgs>({
      query: (args) => ({ url: "/todos", params: pageParams(args) }),
      providesTags: [{ type: "Todo", id: "LIST" }],
    }),
    getTodoById: builder.query<Todo, number>({
      query: (id) => `/todos/${id}`,
      providesTags: (_r, _e, id) => [{ type: "Todo", id }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useGetCommentsQuery,
  useGetCommentsByPostQuery,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useGetQuotesQuery,
  useGetQuoteByIdQuery,
  useGetCartsQuery,
  useGetCartByIdQuery,
  useGetRecipesQuery,
  useGetRecipeByIdQuery,
  useGetTodosQuery,
  useGetTodoByIdQuery,
} = contentApi;
