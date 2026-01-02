import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

/* Base selectors */
const selectProductsState = (state: any) => state.products;

export const selectItems = (state: RootState) =>
  selectProductsState(state).items;

export const selectSearch = (state: RootState) =>
  selectProductsState(state).search;

export const selectCategory = (state: RootState) =>
  selectProductsState(state).category;

export const selectSort = (state: RootState) =>
  selectProductsState(state).sort;

/* ✅ Memoized filtered selector */
export const selectFilteredProducts = createSelector(
  [selectItems, selectSearch, selectCategory, selectSort],
  (items, search, category, sort) => {
    let result = items;

    if (search) {
      result = result.filter((p:any) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      result = result.filter((p:any) => p.category === category);
    }

    result = [...result].sort((a, b) =>
      sort === "asc" ? a.price - b.price : b.price - a.price
    );

    return result;
  }
);
