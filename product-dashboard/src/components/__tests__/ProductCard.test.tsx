import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../ProductCard';
import favoritesReducer from '@/features/favorites/favoritesSlice';
import type { Product } from '@/types';
import '@testing-library/jest-dom';

// Mock the react-icons/fa module
jest.mock('react-icons/fa', () => ({
  FaStar: () => <div data-testid="star" />,
  FaRegStar: () => <div data-testid="reg-star" />,
  FaHeart: () => <div data-testid="heart" />,
  FaRegHeart: () => <div data-testid="reg-heart" />,
}));

describe('ProductCard', () => {
  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 10.99,
    description: 'Test description',
    category: 'electronics',
    image: 'test1.jpg',
    rating: {
      rate: 4.5,
      count: 120
    }
  };

  const renderWithProviders = (initialFavorites: number[] = []) => {
    const store = configureStore({
      reducer: {
        favorites: favoritesReducer,
      },
      preloadedState: {
        favorites: {
          favorites: initialFavorites.map(id => ({
            ...mockProduct,
            id,
            rating: { rate: 4, count: 100 }
          } as Product)),
        },
      },
    });
    
    // Type assertion for the store state
    type RootState = ReturnType<typeof store.getState>;

    return render(
      <MemoryRouter>
        <Provider store={store}>
          <ProductCard product={mockProduct} />
        </Provider>
      </MemoryRouter>
    );
  };

  it('renders product information correctly', () => {
    renderWithProviders();
    
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument();
    expect(screen.getByAltText(mockProduct.title)).toHaveAttribute('src', mockProduct.image);
  });

  it('shows outline heart when product is not in favorites', () => {
    renderWithProviders();
    expect(screen.getByTestId('reg-heart')).toBeInTheDocument();
  });

  it('shows filled heart when product is in favorites', () => {
    renderWithProviders([1]);
    expect(screen.getByTestId('heart')).toBeInTheDocument();
  });

  it('adds product to favorites when heart icon is clicked', () => {
    const store = configureStore({
      reducer: {
        favorites: favoritesReducer,
      },
    });

    const { getByTestId } = render(
      <MemoryRouter>
        <Provider store={store}>
          <ProductCard product={mockProduct} />
        </Provider>
      </MemoryRouter>
    );

    fireEvent.click(getByTestId('reg-heart'));
    const state = store.getState();
    expect(state.favorites.favorites.some((p: Product) => p.id === mockProduct.id)).toBe(true);
  });

  it('removes product from favorites when filled heart icon is clicked', () => {
    const store = configureStore({
      reducer: {
        favorites: favoritesReducer,
      },
      preloadedState: {
        favorites: {
          favorites: [mockProduct],
        },
      },
    });

    const { getByTestId } = render(
      <MemoryRouter>
        <Provider store={store}>
          <ProductCard product={mockProduct} />
        </Provider>
      </MemoryRouter>
    );

    fireEvent.click(getByTestId('heart'));
    const state = store.getState();
    expect(state.favorites.favorites.some((p: Product) => p.id === mockProduct.id)).toBe(false);
  });

  it('displays product title', () => {
    renderWithProviders();
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
  });
});
