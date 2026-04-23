import React, { useState } from 'react';
import axios from 'axios';
import { X, UploadCloud } from 'lucide-react';
import './AddProductModal.css';

const AddProductModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    category: '',
    quantityStock: '',
    mrp: '',
    sellingPrice: '',
    brandName: '',
    description: '',
    isReturnable: true,
    storeLocation: '',
    status: 'published'
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await axios.post('/products', {
        ...formData,
        quantityStock: Number(formData.quantityStock),
        mrp: Number(formData.mrp),
        sellingPrice: Number(formData.sellingPrice),
        isReturnable: formData.isReturnable.toString() === 'true'
      });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add Product</h2>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-body">
          {error && <div className="error-message mb-3">{error}</div>}
          
          <div className="form-grid">
            <div className="form-group">
              <label>Product Name *</label>
              <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. CakeZone Walnut Brownie" />
            </div>
            
            <div className="form-group">
              <label>Product Type *</label>
              <select className="form-control" name="type" value={formData.type} onChange={handleChange} required>
                <option value="">Select product type</option>
                <option value="Food">Food & Beverage</option>
                <option value="Electronics">Electronics</option>
                <option value="Apparel">Apparel</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Category *</label>
              <select className="form-control" name="category" value={formData.category} onChange={handleChange} required>
                <option value="">Select category</option>
                <option value="Dessert">Dessert</option>
                <option value="Snacks">Snacks</option>
                <option value="Gadgets">Gadgets</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Quantity Stock *</label>
              <input type="number" className="form-control" name="quantityStock" value={formData.quantityStock} onChange={handleChange} required min="0" />
            </div>
            
            <div className="form-group">
              <label>MRP *</label>
              <input type="number" className="form-control" name="mrp" value={formData.mrp} onChange={handleChange} required min="0" step="0.01" />
            </div>
            
            <div className="form-group">
              <label>Selling Price *</label>
              <input type="number" className="form-control" name="sellingPrice" value={formData.sellingPrice} onChange={handleChange} required min="0" step="0.01" />
            </div>
            
            <div className="form-group">
              <label>Brand Name</label>
              <input type="text" className="form-control" name="brandName" value={formData.brandName} onChange={handleChange} />
            </div>
            
            <div className="form-group">
              <label>Store Location</label>
              <select className="form-control" name="storeLocation" value={formData.storeLocation} onChange={handleChange}>
                <option value="">Select location</option>
                <option value="Store 1">Store 1 - Downtown</option>
                <option value="Store 2">Store 2 - Uptown</option>
              </select>
            </div>
          </div>
          
          <div className="form-group mt-3">
            <label>Description</label>
            <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} rows="3"></textarea>
          </div>
          
          <div className="form-group mt-3">
            <label>Upload Product Images</label>
            <div className="upload-area">
              <UploadCloud size={32} className="upload-icon" />
              <p>Drag and drop or <span className="browse-link">Browse</span> to upload</p>
              <span className="upload-hint">PNG, JPG, GIF up to 5MB</span>
            </div>
          </div>
          
          <div className="form-grid mt-3">
            <div className="form-group">
              <label>Exchange or Return Eligibility</label>
              <select className="form-control" name="isReturnable" value={formData.isReturnable} onChange={handleChange}>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Status</label>
              <select className="form-control" name="status" value={formData.status} onChange={handleChange}>
                <option value="published">Published</option>
                <option value="unpublished">Unpublished</option>
              </select>
            </div>
          </div>
          
          <div className="modal-footer">
            <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
