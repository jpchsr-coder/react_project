import { useEffect } from 'react';
import { useAppSelector } from '@/app/hooks';
import { selectFavorites } from '@/features/favorites/favoritesSlice';
import { useFavoritesPersistence } from '@/features/favorites/useFavoritesPersistence';
import ProductCard from '@/components/ProductCard';
import { Link } from 'react-router-dom';
import { FaHeartBroken } from 'react-icons/fa';
import './Favorites.css';

const Favorites = () => {
  const favorites = useAppSelector(selectFavorites);
  const { saveFavorites } = useFavoritesPersistence();

  // Save to localStorage whenever favorites change
  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites, saveFavorites]);

  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <FaHeartBroken className="empty-heart" />
        <h2>Your favorites list is empty</h2>
        <p>Add some products to your favorites to see them here</p>
        <Link to="/" className="browse-products-btn">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <h1>My Favorites</h1>
        <p>{favorites.length} {favorites.length === 1 ? 'item' : 'items'}</p>
      </div>
      
      <div className="favorites-grid">
        {favorites.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
