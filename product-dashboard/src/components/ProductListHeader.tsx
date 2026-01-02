
import { Link } from "react-router-dom";
import FilterBar from "./FilterBar";
import "./ProductListHeader.css";

interface ProductListHeaderProps {
  setSort: (value: "asc" | "desc") => void;
  setSearch: (value: string) => void;
  setCategory: (value: string) => void;
}

const ProductListHeader = ({
  setSort,
  setSearch,
  setCategory,
}: ProductListHeaderProps) => {
  return (
    <div className="product-list-header">
      <div className="header-container">
        <div className="header-content">
          <h1 className="header-title">Products</h1>
        
        </div>

        <div className="filters-container">
           
          <FilterBar
            setSearch={setSearch}
            onCategoryChange={(value: string) => setCategory(value)}
            onSortChange={(value: "asc" | "desc") => setSort(value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductListHeader;
