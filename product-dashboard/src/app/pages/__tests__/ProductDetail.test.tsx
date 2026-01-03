import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProductDetail from '../ProductDetail';
import productsReducer from '../../../features/products/productsSlice';
import favoritesReducer from '../../../features/favorites/favoritesSlice';
import type { Product } from '../../../types';

// Mock the react-icons/fa module
jest.mock('react-icons/fa', () => ({
  FaStar: () => <div data-testid="star" />,
  FaChevronRight: () => <div data-testid="chevron-right" />,
  FaChevronLeft: () => <div data-testid="chevron-left" />,
  FaShoppingCart: () => <div data-testid="cart" />,
  FaTruck: () => <div data-testid="truck" />,
  FaCheck: () => <div data-testid="check" />,
  FaHeart: () => <div data-testid="heart" />,
  FaRegHeart: () => <div data-testid="reg-heart" />,
}));

describe('ProductDetail', () => {
  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 19.99,
    description: 'Test description',
    category: 'electronics',
    image: 'https://test.com/image.jpg',
    rating: {
      rate: 4.5,
      count: 120
    }
  };

  const renderWithProviders = (productId = '1', isFavorite = false) => {
    const store = configureStore({
      reducer: {
        products: productsReducer,
        favorites: favoritesReducer,
      },
      preloadedState: {
        products: {
          items: [mockProduct],
          status: 'idle',
          search: '',
          category: '',
          sort: 'asc',
          error: null,
        } as any,
        favorites: {
          favorites: isFavorite ? [mockProduct] : [],
        } as any,
      },
    });

    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/product/${productId}`]}>
          <Routes>
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders product details correctly', () => {
    renderWithProviders();
    
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument();
    expect(screen.getByAltText(mockProduct.title)).toHaveAttribute('src', mockProduct.image);
  });

  it('shows outline heart when product is not in favorites', () => {
    renderWithProviders('1', false);
    expect(screen.getByTestId('reg-heart')).toBeInTheDocument();
  });

  it('shows filled heart when product is in favorites', () => {
    renderWithProviders('1', true);
    expect(screen.getByTestId('heart')).toBeInTheDocument();
  });

  it('allows changing quantity', () => {
    renderWithProviders();
    
    const increaseButton = screen.getByRole('button', { name: /\+/ });
    const decreaseButton = screen.getByRole('button', { name: /-/ });
    const quantityDisplay = screen.getByDisplayValue('1');
    
    // Test increase
    fireEvent.click(increaseButton);
    expect(quantityDisplay).toHaveValue('2');
    
    // Test decrease
    fireEvent.click(decreaseButton);
    expect(quantityDisplay).toHaveValue('1');
    
    // Test minimum quantity
    fireEvent.click(decreaseButton);
    expect(quantityDisplay).toHaveValue('1'); // Should not go below 1
    
    // Test maximum quantity (10)
    for (let i = 0; i < 10; i++) {
      fireEvent.click(increaseButton);
    }
    expect(quantityDisplay).toHaveValue('10'); // Should not go above 10
  });

  it('displays product not found for invalid product ID', () => {
    renderWithProviders('999');
    
    expect(screen.getByText('Product Not Found')).toBeInTheDocument();
    expect(screen.getByText('Back to Shop')).toBeInTheDocument();
  });

  it('toggles favorite status when heart icon is clicked', () => {
    renderWithProviders('1', false);
    
    // Initial state - not favorited
    expect(screen.getByTestId('reg-heart')).toBeInTheDocument();
    
    // Click to add to favorites
    fireEvent.click(screen.getByTestId('reg-heart'));
    
    // Should now show filled heart
    expect(screen.getByTestId('heart')).toBeInTheDocument();
  });

  it('displays product rating', () => {
    renderWithProviders();
    
    // Check if rating is displayed
    expect(screen.getByText(mockProduct.rating.rate.toString())).toBeInTheDocument();
    expect(screen.getByText(`(${mockProduct.rating.count} reviews)`)).toBeInTheDocument();
  });

  it('displays color options', () => {
    renderWithProviders();
    
    // Check if color options are displayed
    expect(screen.getByText('Black')).toBeInTheDocument();
    expect(screen.getByText('Purple')).toBeInTheDocument();
    expect(screen.getByText('Blue')).toBeInTheDocument();
    expect(screen.getByText('Red')).toBeInTheDocument();
  });

  it('has add to cart button', () => {
    renderWithProviders();
    
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    expect(addToCartButton).toBeInTheDocument();
    expect(screen.getByTestId('cart')).toBeInTheDocument();
  });
});
