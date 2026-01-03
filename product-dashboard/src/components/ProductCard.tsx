import { Link } from 'react-router-dom';
import type { Product } from '@/types';
import { FaStar, FaRegStar, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { addToFavorites, removeFromFavorites } from '@/features/favorites/favoritesSlice';
import { selectIsFavorite } from '@/features/favorites/favoritesSlice';
// Remove unused import

const ProductCard = ({ product }: { product: Product }) => {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(selectIsFavorite(product.id));
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Toggling favorite for product:', product.id, 'Current state:', isFavorite);
    
    if (isFavorite) {
      console.log('Dispatching removeFromFavorites with ID:', product.id);
      dispatch(removeFromFavorites(product.id));
    } else {
      console.log('Dispatching addToFavorites with product:', product);
      const favoriteProduct = {
        ...product,
        rating: product.rating || { rate: 4, count: 100 },
        category: product.category || 'uncategorized',
        description: product.description || ''
      };
      console.log('Adding to favorites:', favoriteProduct);
      dispatch(addToFavorites(favoriteProduct));
    }
  };
  // Use product rating or default to 4
  const rating = product.rating?.rate || 4;
  
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
        <h3 title={product.title} className="product-title"> {product.title.length > 60 
            ? `${product.title.substring(0, 60)}...` 
            : product.title}</h3>
        <p title={product.category} className="product-category">{product.category}</p>
        <p title={product.description} className="product-description">
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