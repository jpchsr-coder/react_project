import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Product, SortBy } from '../../types';

const baseUrl = 'https://fakestoreapi.com';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => '/products',
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
    }),
    getCategories: builder.query<string[], void>({
      query: () => '/products/categories',
    }),
    getProductsByCategory: builder.query<Product[], string>({
      query: (category) => `/products/category/${category}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
} = productApi;

export const selectAllProducts = productApi.endpoints.getProducts.select();

export const selectFilteredProducts = (products: Product[], filters: { category?: string; sortBy?: SortBy; searchQuery?: string }) => {
  let result = [...products];

  // Filter by category
  if (filters.category) {
    result = result.filter(product => product.category === filters.category);
  }

  // Search by title
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    result = result.filter(product => 
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  }

  // Sort products
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'title':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }
  }

  return result;
};
