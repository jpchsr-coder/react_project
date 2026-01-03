import { configureStore } from '@reduxjs/toolkit';
import type { Product } from './productsSlice';
import productsReducer, {
  fetchProducts,
  setSearch,
  setCategory,
  setSort,
  selectFilteredProducts,
  selectProductById,
} from './productsSlice';
import axios from 'axios';

// This tells TypeScript to treat this as a module
export {};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
    }
  }
}

// Define ProductsState interface since it's not exported from the slice
interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'error';
  search: string;
  category: string;
  sort: 'asc' | 'desc';
}

// Define RootState type for testing
interface RootState {
  products: ProductsState;
}

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Add type definitions for global Jest functions
declare const describe: jest.Describe;
declare const it: jest.It;
declare const expect: jest.Expect;
declare const beforeEach: jest.Lifecycle;

describe('products slice', () => {
  const initialState: ProductsState = {
    items: [],
    status: 'idle',
    search: '',
    category: '',
    sort: 'asc',
  };

  const mockProducts: Product[] = [
    {
      id: 1,
      title: 'Test Product 1',
      price: 19.99,
      category: 'electronics',
      image: 'test1.jpg',
      description: 'A test product',
    },
    {
      id: 2,
      title: 'Test Product 2',
      price: 29.99,
      category: 'clothing',
      image: 'test2.jpg',
      description: 'Another test product',
    },
  ];

  describe('reducers', () => {
    it('should handle initial state', () => {
      expect(productsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle setSearch', () => {
      const actual = productsReducer(initialState, setSearch('test'));
      expect(actual.search).toEqual('test');
    });

    it('should handle setCategory', () => {
      const actual = productsReducer(initialState, setCategory('electronics'));
      expect(actual.category).toEqual('electronics');
    });

    it('should handle setSort', () => {
      // Test ascending to descending
      let actual = productsReducer(initialState, setSort('desc'));
      expect(actual.sort).toEqual('desc');
      
      // Test descending to ascending
      actual = productsReducer(actual, setSort('asc'));
      expect(actual.sort).toEqual('asc');
    });
  });

  describe('async thunks', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should handle fetchProducts success', async () => {
      // Mock the API response
      mockedAxios.get.mockResolvedValueOnce({ data: mockProducts });

      // Create a mock store
      const store = configureStore({
        reducer: {
          products: productsReducer,
        },
      });

      // Dispatch the async action
      await store.dispatch(fetchProducts());

      // Get the actions that were dispatched
      const actions = store.getState().products;

      // Assert the expected state changes
      expect(actions.status).toEqual('idle');
      expect(actions.items).toEqual(mockProducts);
      expect(mockedAxios.get).toHaveBeenCalledWith('https://fakestoreapi.com/products');
    });

    it('should handle fetchProducts error', async () => {
      // Mock a failed API response
      const errorMessage = 'Network Error';
      mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

      // Create a mock store
      const store = configureStore({
        reducer: {
          products: productsReducer,
        },
      });

      // Dispatch the async action
      await store.dispatch(fetchProducts());

      // Get the actions that were dispatched
      const state = store.getState().products;

      // Assert the expected state changes
      expect(state.status).toEqual('error');
      expect(state.items).toEqual([]);
    });
  });

  describe('selectors', () => {
    const state = {
      products: {
        items: mockProducts,
        status: 'idle',
        search: 'test',
        category: 'electronics',
        sort: 'asc',
      },
    } as unknown as RootState;

    it('should select filtered products', () => {
      // Test search filter
      let result = selectFilteredProducts({
        ...state,
        products: {
          ...state.products,
          search: 'test',
          category: '',
        },
      });
      expect(result).toHaveLength(2);

      // Test category filter
      result = selectFilteredProducts({
        ...state,
        products: {
          ...state.products,
          search: '',
          category: 'electronics',
        },
      });
      expect(result).toHaveLength(1);
      expect(result[0].category).toBe('electronics');

      // Test sorting
      result = selectFilteredProducts({
        ...state,
        products: {
          ...state.products,
          search: '',
          category: '',
          sort: 'desc',
        },
      });
      expect(result[0].price).toBeGreaterThan(result[1].price);
    });

    it('should select product by id', () => {
      const result = selectProductById(state, '1');
      expect(result).toEqual(mockProducts[0]);
      
      const nonExistent = selectProductById(state, '999');
      expect(nonExistent).toBeUndefined();
    });
  });
});
