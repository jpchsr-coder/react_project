import { useState, useEffect } from "react";
import "./SearchBar.css";

interface Props {
  onSearch: (value: string) => void;
  placeholder?: string;
}

const SearchBar = ({ onSearch }: Props) => {
  const [value, setValue] = useState("");
  // Simple debounce implementation
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [value]);

  // Trigger search when debounced value changes
  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className="search-container">
      <svg
        className="search-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
        />
      </svg>
      <input style={{ paddingRight: '2.5rem' }}
        type="text"
        placeholder={ "Search products..."}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="search-input"
        aria-label="Search products"
      />
    </div>
  );
};

export default SearchBar;
