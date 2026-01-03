import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { Product } from "@/types";

interface ProductsState {
  items: Product[];
  status: "idle" | "loading" | "error";
  search: string;
  category: string;
  sort: 'asc' | 'desc';
}

const initialState: ProductsState = {
  items: [],
  status: "idle",
  search: "",
  category: "",
  sort: "asc",
};

/* ✅ Thunk */
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get<Product[]>(
      "https://fakestoreapi.com/products"
    );
    return response.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setSort(state, action: PayloadAction<'asc' | 'desc'>) {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "error";
      });
  },
});

// Selector to find a product by ID
export const selectProductById = (state: { products: ProductsState }, productId: string) => {
  if (!productId) return undefined;
  return state.products.items.find((product) => 
    product.id.toString() === productId.toString()
  );
};

export const { setSearch, setCategory, setSort } =
  productsSlice.actions;

export const selectFilteredProducts = (state: { products: ProductsState }) => {
  const { items, search, category, sort } = state.products;
  
  return items
    .filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase()) ||
                          product.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !category || product.category === category;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sort === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
};

export default productsSlice.reducer;
