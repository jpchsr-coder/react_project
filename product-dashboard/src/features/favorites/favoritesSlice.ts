import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types';
import { loadFavorites, saveFavorites } from '@/utils/storage';

interface FavoritesState {
  favorites: Product[];
}

// Load favorites from localStorage on initial state
const initialState: FavoritesState = {
  favorites: loadFavorites(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Product>) => {
      if (!state.favorites.some((item) => item.id === action.payload.id)) {
        state.favorites.push(action.payload);
        saveFavorites(state.favorites);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(
        (item) => item.id !== action.payload
      );
      saveFavorites(state.favorites);
    },
    // Add a new action to initialize favorites from localStorage
    initializeFavorites: (state) => {
      state.favorites = loadFavorites();
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export const selectFavorites = (state: { favorites: FavoritesState }) =>
  state.favorites.favorites;


export const selectIsFavorite = (productId: number) => (state: {
  favorites: FavoritesState;
}) => state.favorites.favorites.some((item) => item.id === productId);

export default favoritesSlice.reducer;
