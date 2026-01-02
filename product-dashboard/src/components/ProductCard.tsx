import { Link } from "react-router-dom";
import type { Product } from "../features/products/productsSlice";
import { FaStar, FaRegStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addToFavorites, removeFromFavorites } from "../features/favorites/favoritesSlice";
import { selectIsFavorite } from "../features/favorites/favoritesSlice";

const ProductCard = ({ product }: { product: Product }) => {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(selectIsFavorite(product.id));
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites({ ...product, rating: 4 } as any));
    }
  };
  // Generate random rating between 3-5 for demonstration
  const rating = Math.floor(Math.random() * 3) + 3;
  
  console.log("isFavorite:", isFavorite, "product.id:", product.id);
  return (
    <div className="product-card !p-4">
            <div className="product-image-container">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
        <button 
          onClick={toggleFavorite}
          className="favorite-button"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-gray-400 hover:text-red-500" />
          )}
        </button>
      </div>

      
      <div className="product-info pl-2">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-description">
          {product.description.length > 80 
            ? `${product.description.substring(0, 80)}...` 
            : product.description}
        </p>
        
        <div className="product-rating">
          {[...Array(5)].map((_, i) => 
            i < rating ? (
              <FaStar key={i} className="star filled" />
            ) : (
              <FaRegStar key={i} className="star" />
            )
          )}
        </div>
        
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <Link
            to={`/product/${product.id}`}
            className="view-details-btn"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;