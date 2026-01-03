import { useEffect } from 'react';
import { useAppDispatch } from '@/app/hooks';
import { addToFavorites, removeFromFavorites } from './favoritesSlice';

const FAVORITES_KEY = 'favorites';

export const useFavoritesPersistence = () => {
  const dispatch = useAppDispatch();

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem(FAVORITES_KEY);
      if (savedFavorites) {
        const favorites = JSON.parse(savedFavorites);
        favorites.forEach((product: any) => {
          dispatch(addToFavorites(product));
        });
      }
    } catch (error) {
      console.error('Failed to load favorites from localStorage', error);
    }
  }, [dispatch]);

  // Function to save favorites to localStorage
  const saveFavorites = (favorites: any[]) => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Failed to save favorites to localStorage', error);
    }
  };

  return { saveFavorites };
};
