import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import AddProductModal from '../components/AddProductModal';
import axios from 'axios';
import { Plus, MoreVertical, Edit, Trash2 } from 'lucide-react';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('published');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/products');
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product', error);
      }
    }
  };

  const filteredProducts = products.filter(p => p.status === activeTab);

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="page-container">
          <div className="products-header">
            <div>
              <h1>Products</h1>
              <p>Manage your store products here.</p>
            </div>
            <button className="btn-primary flex-center" onClick={() => setIsModalOpen(true)}>
              <Plus size={18} className="mr-2" /> Add Product
            </button>
          </div>
          
          <div className="products-tabs">
            <button 
              className={`tab-btn ${activeTab === 'published' ? 'active' : ''}`}
              onClick={() => setActiveTab('published')}
            >
              Published ({products.filter(p => p.status === 'published').length})
            </button>
            <button 
              className={`tab-btn ${activeTab === 'unpublished' ? 'active' : ''}`}
              onClick={() => setActiveTab('unpublished')}
            >
              Unpublished ({products.filter(p => p.status === 'unpublished').length})
            </button>
          </div>
          
          <div className="products-content">
            {loading ? (
              <div className="loading-state">Loading products...</div>
            ) : filteredProducts.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon-wrapper">
                  <Package size={48} />
                </div>
                <h3>No products found</h3>
                <p>You haven't added any {activeTab} products yet.</p>
                <button className="btn-outline mt-4" onClick={() => setIsModalOpen(true)}>
                  Create Product
                </button>
              </div>
            ) : (
              <div className="products-grid">
                {filteredProducts.map(product => (
                  <div className="product-card" key={product._id}>
                    <div className="product-image-container">
                      {product.images && product.images.length > 0 && !product.images[0].includes('via.placeholder') ? (
                        <img src={product.images[0]} alt={product.name} />
                      ) : (
                        <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80" alt={product.name} style={{ objectFit: 'cover' }} />
                      )}
                    </div>
                    
                    <div className="product-card-content">
                      <h3 className="product-card-title">{product.name}</h3>
                      <hr className="divider" />
                      
                      <div className="product-details-list">
                        <div className="detail-row">
                          <span className="detail-label">Product type</span>
                          <span className="detail-value">{product.type}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Quantity Stock</span>
                          <span className="detail-value">{product.quantityStock}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">MRP</span>
                          <span className="detail-value">₹ {product.mrp}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Selling price</span>
                          <span className="detail-value">₹ {product.sellingPrice}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Brand Name</span>
                          <span className="detail-value">{product.brandName || '-'}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Total Number of Images</span>
                          <span className="detail-value">{product.images ? product.images.length : 0}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Exchange Eligibility</span>
                          <span className="detail-value">{product.isReturnable ? 'Yes' : 'No'}</span>
                        </div>
                      </div>
                      
                      <hr className="divider" />
                      
                      <div className="product-card-actions">
                        <button 
                          className={`btn-action status-btn ${product.status === 'published' ? 'btn-unpublish' : 'btn-publish'}`}
                        >
                          {product.status === 'published' ? 'Unpublish' : 'Publish'}
                        </button>
                        
                        <div className="right-actions">
                          <button className="btn-action edit-btn">Edit</button>
                          <button className="btn-action delete-btn" onClick={() => handleDelete(product._id)}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {isModalOpen && (
        <AddProductModal 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={() => {
            setIsModalOpen(false);
            fetchProducts();
          }} 
        />
      )}
    </div>
  );
};

export default Products;

// Helper icons
const Package = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: 'var(--text-light)'}}>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
);
