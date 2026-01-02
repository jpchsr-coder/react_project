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

export type SortBy = 'price_asc' | 'price_desc' | 'rating' | 'title';

export interface FiltersState {
  category: string;
  sortBy: SortBy;
  searchQuery: string;
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
}
