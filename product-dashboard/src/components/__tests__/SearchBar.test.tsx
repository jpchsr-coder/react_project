import { render, screen, fireEvent, act } from '@testing-library/react';
import SearchBar from '../SearchBar';
import '@testing-library/jest-dom';

// Mock the debounce implementation
jest.useFakeTimers();

describe('SearchBar', () => {
  const mockOnSearch = jest.fn();
  const placeholderText = 'Search products...';

  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it('renders the search input with placeholder', () => {
    render(<SearchBar onSearch={mockOnSearch} placeholder={placeholderText} />);
    
    const input = screen.getByPlaceholderText(placeholderText);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('aria-label', 'Search products');
  });

  it('updates input value when typing', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText('Search products...');
    
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input).toHaveValue('test');
  });

  it('calls onSearch with debounced value', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText('Search products...');
    
    // Type something
    fireEvent.change(input, { target: { value: 'test' } });
    
    // Shouldn't call immediately
    expect(mockOnSearch).not.toHaveBeenCalled();
    
    // Fast-forward time by 500ms
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    // Should call after debounce
    expect(mockOnSearch).toHaveBeenCalledWith('test');
  });

  it('only triggers onSearch once if input changes within debounce time', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText('Search products...');
    
    // Type something
    fireEvent.change(input, { target: { value: 't' } });
    
    // Change input before debounce time elapses
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    fireEvent.change(input, { target: { value: 'te' } });
    
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    // Should only call once with the latest value
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('te');
  });

  it('cleans up timer on unmount', () => {
    const { unmount } = render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText('Search products...');
    
    fireEvent.change(input, { target: { value: 'test' } });
    
    // Unmount before debounce time elapses
    unmount();
    
    // Fast-forward time
    act(() => {
      jest.runAllTimers();
    });
    
    // Should not call onSearch after unmount
    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it('renders search icon', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const icon = screen.getByRole('img', { hidden: true });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('viewBox', '0 0 20 20');
  });
});
