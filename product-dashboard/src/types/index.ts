export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export type SortBy = 'title' | 'price' | 'rating' | 'asc' | 'desc' | 'price_asc' | 'price_desc';

export type SimpleSortBy = 'asc' | 'desc';

export interface FiltersState {
  category: string;
  sortBy: SortBy;
  searchQuery: string;
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
}
