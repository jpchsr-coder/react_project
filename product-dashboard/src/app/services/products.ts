import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Product } from '../../types';

type SortBy = 'title' | 'price' | 'rating' | 'asc' | 'desc' | 'price_asc' | 'price_desc';

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
    const sortBy = filters.sortBy as string; // Type assertion to handle all possible sort values
    
    if (sortBy === 'price' || sortBy === 'asc' || sortBy === 'price_asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'desc' || sortBy === 'price_desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating.rate - a.rating.rate);
    } else if (sortBy === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // Default to sorting by price ascending if sortBy is not recognized
      result.sort((a, b) => a.price - b.price);
    }
  }

  return result;
};
