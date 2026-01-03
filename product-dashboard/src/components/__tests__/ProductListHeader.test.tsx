import { render, screen, fireEvent } from '@testing-library/react';
import ProductListHeader from '../ProductListHeader';
import { BrowserRouter } from 'react-router-dom';

// Mock the FilterBar component
jest.mock('../FilterBar', () => ({
  __esModule: true,
  default: ({
    setSearch,
    onCategoryChange,
    onSortChange,
  }: {
    setSearch: (value: string) => void;
    onCategoryChange: (value: string) => void;
    onSortChange: (value: 'asc' | 'desc') => void;
  }) => (
    <div data-testid="mock-filter-bar">
      <button onClick={() => onCategoryChange('electronics')}>Set Category</button>
      <button onClick={() => onSortChange('desc')}>Set Sort</button>
      <input
        data-testid="search-input"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
      />
    </div>
  ),
}));

describe('ProductListHeader', () => {
  const mockSetSort = jest.fn();
  const mockSetSearch = jest.fn();
  const mockSetCategory = jest.fn();

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <ProductListHeader
          setSort={mockSetSort}
          setSearch={mockSetSearch}
          setCategory={mockSetCategory}
        />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the header with title', () => {
    renderComponent();
    expect(screen.getByText('Products')).toBeInTheDocument();
  });

  it('renders the FilterBar component', () => {
    renderComponent();
    expect(screen.getByTestId('mock-filter-bar')).toBeInTheDocument();
  });

  it('passes setSearch to FilterBar', () => {
    renderComponent();
    const searchInput = screen.getByPlaceholderText('Search products...');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(mockSetSearch).toHaveBeenCalledWith('test');
  });

  it('passes setCategory to FilterBar', () => {
    renderComponent();
    const categoryButton = screen.getByText('Set Category');
    fireEvent.click(categoryButton);
    expect(mockSetCategory).toHaveBeenCalledWith('electronics');
  });

  it('passes setSort to FilterBar', () => {
    renderComponent();
    const sortButton = screen.getByText('Set Sort');
    fireEvent.click(sortButton);
    expect(mockSetSort).toHaveBeenCalledWith('desc');
  });
});
