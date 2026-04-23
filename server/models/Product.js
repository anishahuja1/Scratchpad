const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name']
  },
  type: {
    type: String,
    required: [true, 'Please select a product type']
  },
  category: {
    type: String,
    required: [true, 'Please select a category']
  },
  quantityStock: {
    type: Number,
    required: [true, 'Please add quantity stock'],
    default: 0
  },
  mrp: {
    type: Number,
    required: [true, 'Please add MRP']
  },
  sellingPrice: {
    type: Number,
    required: [true, 'Please add a selling price']
  },
  brandName: {
    type: String,
  },
  description: {
    type: String,
  },
  images: {
    type: [String],
    default: []
  },
  isReturnable: {
    type: Boolean,
    default: true
  },
  storeLocation: {
    type: String,
  },
  status: {
    type: String,
    enum: ['published', 'unpublished'],
    default: 'unpublished'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
