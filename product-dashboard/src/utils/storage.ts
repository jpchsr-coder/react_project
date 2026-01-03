// src/utils/storage.ts
const FAVORITES_KEY = 'favorites';

export const saveFavorites = (favorites: any[]) => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites to localStorage', error);
  }
};

export const loadFavorites = (): any[] => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error loading favorites from localStorage', error);
    return [];
  }
};
