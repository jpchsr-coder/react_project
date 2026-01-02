// src/app/pages/ProductDetail.tsx
import { useParams, Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectProductById } from '../../features/products/productsSlice';
import { addToFavorites, removeFromFavorites, selectIsFavorite } from '../../features/favorites/favoritesSlice';
import { FaStar, FaChevronRight, FaShoppingCart, FaTruck, FaCheck, FaHeart, FaRegHeart, FaChevronLeft } from 'react-icons/fa';
import { useState } from 'react';
import './ProductDetail.css';

const colors = [
  { name: 'Black', class: 'bg-black' },
  { name: 'Purple', class: 'bg-purple-600' },
  { name: 'Blue', class: 'bg-blue-600' },
  { name: 'Red', class: 'bg-red-600' },
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = useAppSelector((state) => selectProductById(state, id || ''));
  const dispatch = useAppDispatch();
  
  const isFavorite = useAppSelector((state:any) => selectIsFavorite(Number(id))(state));
  const [quantity, setQuantity] = useState(1);
  if (!product) {
    return <div>Product not found</div>;
  }
  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(Number(id)));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <FaChevronRight className="mr-1 h-4 w-4 transform rotate-180" />
          Back to Shop
        </Link>
      </div>
    </div>;
  }

  return (
    <div className="product-detail-container">
     
      <div className="product-detail-content">
         <button onClick={() => window.history.back()} className="back-button">
        <FaChevronLeft className="mr-1 h-4 w-4 transform rotate-180" />
        Back to Products
      </button>
        <div className="product-grid">
          {/* Product Image */}
          <div className="product-image-containers">
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

          {/* Product Info */}
          <div className="product-info">
            <div className="product-rating">
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} className="h-4 w-4 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-gray-600">100% Recommended</span>
              </div>
              <a className="reviews-link">
                See 5 reviews
              </a>
            </div>

            <div>
              <h1 className="product-title">{product.title}</h1>
              <div className="product-price">
                ${product.price.toFixed(2)}
                <span className="shipping-text">Free Shipping</span>
              </div>
              <div className="discount-badge">
                Save 20% with code SAVE20
              </div>
            </div>

           

            <div className="form-group">
              <div className="flex items-center">
                <label className="form-label mb-0 mr-4">Quantity:</label>
                <div className="quantity-selector">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="quantity-btn"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="quantity-display">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="quantity-btn"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <button className="add-to-cart-btn">
              <FaShoppingCart className="mr-2" />
              Add to Cart
            </button>
            
            <button 
                className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
                onClick={toggleFavorite}
              >
                {isFavorite ? (
                  <>
                    <FaHeart className="mr-2" />
                    Remove from Favorites
                  </>
                ) : (
                  <>
                    <FaRegHeart className="mr-2" />
                    Add to Favorites
                  </>
                )}
              </button>

            <div className="rewards-text">
              <FaCheck className="text-green-600" />
              <span>Earn ${(product.price * 0.02).toFixed(2)} in Rewards points</span>
            </div>

            <div className="shipping-info">
              <div className="shipping-details">
                <FaTruck className="shipping-icon mt-1" />
                <div>
                  <div className="shipping-address">Shipping to: 94102</div>
                  <div className="shipping-method">Get it by Fri, Jan 26 with ground shipping</div>
                  <div className="shipping-method">Get it by Wed, Jan 24 with expedited shipping</div>
                </div>
              </div>
              <div className="shoprunner-text">
                <span>ShopRunner:</span> FREE 2-Day Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;