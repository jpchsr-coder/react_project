import SearchBar from "./SearchBar";
import "./FilterBar.css";
import { Link } from "react-router-dom";

interface Props {
  onCategoryChange: (value: string) => void;
  onSortChange: (value: "asc" | "desc") => void;
  setSearch?: (value: string) => void;
}

const FilterBar = ({ onCategoryChange, onSortChange, setSearch }: Props) => {
  return (
    <div className="filter-bar">
      <button onClick={() => window.location.href = '/favorites'} className="favorites-button">Go to Favorites</button>
       
      {setSearch && (
        <div className="search-bar">
          <SearchBar
            onSearch={(value: string) => {
              if (setSearch) setSearch(value);
            }}
            placeholder="Search products..."
          />
        </div>
      )}
      
      <select
        className="select-dropdown"
        onChange={(e) => onCategoryChange(e.target.value)}
        aria-label="Filter by category"
      >
        <option value="">All Categories</option>
        <option value="men's clothing">Men's Clothing</option>
        <option value="women's clothing">Women's Clothing</option>
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewelry</option>
      </select>

      <select
        className="select-dropdown"
        onChange={(e) => onSortChange(e.target.value as "asc" | "desc")}
        aria-label="Sort by price"
      >
        <option value="asc">Price: Low → High</option>
        <option value="desc">Price: High → Low</option>
      </select>
    </div>
  );
};

export default FilterBar;
