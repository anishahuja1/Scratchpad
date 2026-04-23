const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');

    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();
    console.log('Existing data cleared.');

    // Create a dummy user
    const user = await User.create({
      name: 'Admin User',
      emailOrPhone: '9166927838', // This matches the screenshot!
      password: 'password123',
    });
    console.log(`Created user: ${user.emailOrPhone} with password: password123`);

    // Create dummy products
    await Product.create([
      {
        user: user._id,
        name: 'CakeZone Walnut Brownie',
        type: 'Food',
        category: 'Dessert',
        quantityStock: 50,
        mrp: 5.99,
        sellingPrice: 4.99,
        brandName: 'CakeZone',
        description: 'Delicious chocolate brownie with walnuts.',
        images: ['https://via.placeholder.com/150'],
        isReturnable: false,
        storeLocation: 'Store 1',
        status: 'published'
      },
      {
        user: user._id,
        name: 'Apple iPhone 14',
        type: 'Electronics',
        category: 'Gadgets',
        quantityStock: 10,
        mrp: 999.00,
        sellingPrice: 899.00,
        brandName: 'Apple',
        description: 'Latest model iPhone.',
        images: ['https://via.placeholder.com/150'],
        isReturnable: true,
        storeLocation: 'Store 2',
        status: 'published'
      },
      {
        user: user._id,
        name: 'Draft T-Shirt',
        type: 'Apparel',
        category: 'Clothing',
        quantityStock: 100,
        mrp: 29.99,
        sellingPrice: 19.99,
        brandName: 'BrandX',
        description: 'Cotton T-Shirt',
        images: ['https://via.placeholder.com/150'],
        isReturnable: true,
        storeLocation: 'Store 1',
        status: 'unpublished'
      }
    ]);

    console.log('Sample products created.');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
