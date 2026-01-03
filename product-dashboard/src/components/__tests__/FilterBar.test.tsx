import { render, screen, fireEvent } from '@testing-library/react';
import FilterBar from '../FilterBar';
import { BrowserRouter } from 'react-router-dom';

// Mock the SearchBar component
jest.mock('../SearchBar', () => ({
  __esModule: true,
  default: ({
    onSearch,
    placeholder,
  }: {
    onSearch: (value: string) => void;
    placeholder: string;
  }) => (
    <input
      data-testid="search-input"
      onChange={(e) => onSearch(e.target.value)}
      placeholder={placeholder}
    />
  ),
}));

describe('FilterBar', () => {
  const mockOnCategoryChange = jest.fn();
  const mockOnSortChange = jest.fn();
  const mockSetSearch = jest.fn();

  const renderComponent = (includeSearch = true) => {
    return render(
      <BrowserRouter>
        <FilterBar
          onCategoryChange={mockOnCategoryChange}
          onSortChange={mockOnSortChange}
          {...(includeSearch && { setSearch: mockSetSearch })}
        />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the filter bar with all controls', () => {
    renderComponent();
    
    expect(screen.getByText('Go to Favorites')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
    expect(screen.getByLabelText('Filter by category')).toBeInTheDocument();
    expect(screen.getByLabelText('Sort by price')).toBeInTheDocument();
  });

  it('calls onCategoryChange when category is selected', () => {
    renderComponent();
    const categorySelect = screen.getByLabelText('Filter by category');
    
    fireEvent.change(categorySelect, { target: { value: "electronics" } });
    expect(mockOnCategoryChange).toHaveBeenCalledWith('electronics');
  });

  it('calls onSortChange when sort option is selected', () => {
    renderComponent();
    const sortSelect = screen.getByLabelText('Sort by price');
    
    fireEvent.change(sortSelect, { target: { value: 'desc' } });
    expect(mockOnSortChange).toHaveBeenCalledWith('desc');
  });

  it('calls setSearch when search input changes', () => {
    renderComponent();
    const searchInput = screen.getByPlaceholderText('Search products...');
    
    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(mockSetSearch).toHaveBeenCalledWith('test');
  });

  it('does not render search input when setSearch is not provided', () => {
    renderComponent(false);
    
    expect(screen.queryByPlaceholderText('Search products...')).not.toBeInTheDocument();
  });

  it('navigates to favorites when button is clicked', () => {
    renderComponent();
    const button = screen.getByText('Go to Favorites');
    
    expect(button.closest('a')).toHaveAttribute('href', '/favorites');
  });

  it('has all category options', () => {
    renderComponent();
    const categorySelect = screen.getByLabelText('Filter by category');
    const options = Array.from(categorySelect.querySelectorAll('option')).map(opt => (opt as HTMLOptionElement).value);
    
    expect(options).toEqual(['', "men's clothing", "women's clothing", 'electronics', 'jewelery']);
  });

  it('has all sort options', () => {
    renderComponent();
    const sortSelect = screen.getByLabelText('Sort by price');
    const options = Array.from(sortSelect.querySelectorAll('option')).map(opt => (opt as HTMLOptionElement).value);
    
    expect(options).toEqual(['asc', 'desc']);
  });
});
