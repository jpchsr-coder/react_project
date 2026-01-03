import type { Product } from '../../types';
import {
  selectItems,
  selectSearch,
  selectCategory,
  selectSort,
  selectFilteredProducts,
} from './productsSelectors';

// Define the complete mock state type
type MockState = {
  products: {
    items: Product[];
    status: 'idle' | 'loading' | 'error';
    search: string;
    category: string;
    sort: 'asc' | 'desc';
  };
  favorites: {
    favorites: Product[]; // Changed back to Product[] to match actual state
  };
};

// Create a base mock state
const createBaseState = (): MockState => ({
  products: {
    items: [
      {
        id: 1,
        title: 'Product 1',
        price: 10,
        category: 'electronics',
        description: 'Test',
        image: '',
        rating: { rate: 4.5, count: 100 }
      } as Product,
      {
        id: 2,
        title: 'Product 2',
        price: 20,
        category: 'clothing',
        description: 'Test',
        image: '',
        rating: { rate: 4.0, count: 50 }
      } as Product,
      {
        id: 3,
        title: 'Test Product',
        price: 30,
        category: 'electronics',
        description: 'Test',
        image: '',
        rating: { rate: 4.8, count: 200 }
      } as Product,
    ],
    status: 'idle',
    search: '',
    category: '',
    sort: 'asc',
  },
  favorites: {
    favorites: [
      {
        id: 1,
        title: 'Product 1',
        price: 10,
        category: 'electronics',
        description: 'Test',
        image: '',
        rating: { rate: 4.5, count: 100 }
      } as Product
    ],
  },
});

describe('productsSelectors', () => {
  const baseState: MockState = createBaseState();
  const mockState: MockState = { ...baseState };

  describe('base selectors', () => {
    it('should select all products', () => {
      const result = selectItems(mockState);
      expect(result).toHaveLength(3);
      expect(result[0].title).toBe('Product 1');
    });

    it('should select search term', () => {
      const stateWithSearch: MockState = {
        ...baseState,
        products: {
          ...baseState.products,
          search: 'test',
        },
      };
      const result = selectSearch(stateWithSearch);
      expect(result).toBe('test');
    });

    it('should select category', () => {
      const stateWithCategory: MockState = {
        ...mockState,
        products: {
          ...mockState.products,
          category: 'electronics',
        },
      };
      const result = selectCategory(stateWithCategory);
      expect(result).toBe('electronics');
    });

    it('should select sort order', () => {
      const stateWithSort: MockState = {
        ...mockState,
        products: {
          ...mockState.products,
          sort: 'desc',
        },
      };
      const result = selectSort(stateWithSort);
      expect(result).toBe('desc');
    });
  });

  describe('selectFilteredProducts', () => {
    it('should return all products when no filters applied', () => {
      const result = selectFilteredProducts(mockState);
      expect(result).toHaveLength(3);
    });

    it('should filter products by search term', () => {
      const stateWithSearch: MockState = {
        ...mockState,
        products: {
          ...mockState.products,
          search: 'Test',
        },
      };
      const result = selectFilteredProducts(stateWithSearch);
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Test Product');
    });

    it('should filter products by category', () => {
      const stateWithCategory: MockState = {
        ...mockState,
        products: {
          ...mockState.products,
          category: 'electronics',
        },
      };
      const result = selectFilteredProducts(stateWithCategory);
      expect(result).toHaveLength(2);
      expect(result.every((p: Product) => p.category === 'electronics')).toBe(true);
    });

    it('should sort products in ascending order by default', () => {
      const result = selectFilteredProducts(mockState);
      expect(result[0].price).toBe(10);
      expect(result[1].price).toBe(20);
      expect(result[2].price).toBe(30);
    });

    it('should sort products in descending order when sort is desc', () => {
      const stateWithDescSort: MockState = {
        ...baseState,
        products: {
          ...baseState.products,
          sort: 'desc',
        },
      };
      const result = selectFilteredProducts(stateWithDescSort);
      expect(result[0].price).toBe(30);
      expect(result[1].price).toBe(20);
      expect(result[2].price).toBe(10);
    });

    it('should combine search and category filters', () => {
      const stateWithFilters: MockState = {
        ...baseState,
        products: {
          ...baseState.products,
          search: 'product 1', // More specific search term to match only one product
          category: 'electronics',
        },
      };
      const result = selectFilteredProducts(stateWithFilters);
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Product 1');
    });
  });
});
