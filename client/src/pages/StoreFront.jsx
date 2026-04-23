import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StoreFront.css';

const StoreFront = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We can fetch from /products if it's public, or just use the same API 
    // Since the API requires auth currently, wait! 
    // The product route has `protect` middleware! 
    // I need to make a public route or just remove `protect` for GET /products 
    // Or add a GET /api/products/public
    
    const fetchPublicProducts = async () => {
      try {
        const res = await axios.get('/products/public');
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPublicProducts();
  }, []);

  return (
    <div className="store-front">
      <header className="store-header">
        <h1>Productr Live Store</h1>
        <p>Welcome to our catalog</p>
      </header>
      
      <main className="store-main">
        {loading ? (
          <p>Loading products...</p>
        ) : products.length === 0 ? (
          <p>No published products available right now.</p>
        ) : (
          <div className="public-products-grid">
            {products.map(product => (
              <div className="public-card" key={product._id}>
                <div className="public-card-image">
                  {product.images && product.images.length > 0 && !product.images[0].includes('via.placeholder') ? (
                    <img src={product.images[0]} alt={product.name} />
                  ) : product.images && product.images.length > 0 ? (
                    <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80" alt={product.name} />
                  ) : (
                    <div className="no-img">No Image</div>
                  )}
                </div>
                <div className="public-card-info">
                  <h3>{product.name}</h3>
                  <p className="category">{product.category}</p>
                  <p className="price">₹ {product.sellingPrice}</p>
                  <button 
                    className="buy-btn" 
                    onClick={() => alert(`Added ${product.name} to your cart!`)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default StoreFront;
