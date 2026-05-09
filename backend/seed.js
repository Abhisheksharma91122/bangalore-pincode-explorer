const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Pincode = require('./models/Pincode');
const connectDB = require('./config/db');

dotenv.config();

const samplePincodes = [
  { areaName: 'Indiranagar', pincode: '560038', district: 'Bangalore', state: 'Karnataka', taluk: 'Bangalore North', region: 'Bangalore HQ', deliveryStatus: 'Delivery', latitude: 12.9784, longitude: 77.6408 },
  { areaName: 'Koramangala', pincode: '560034', district: 'Bangalore', state: 'Karnataka', taluk: 'Bangalore South', region: 'Bangalore HQ', deliveryStatus: 'Delivery', latitude: 12.9279, longitude: 77.6271 },
  { areaName: 'Whitefield', pincode: '560066', district: 'Bangalore', state: 'Karnataka', taluk: 'Bangalore North', region: 'Bangalore HQ', deliveryStatus: 'Delivery', latitude: 12.9698, longitude: 77.7499 },
  { areaName: 'Jayanagar', pincode: '560011', district: 'Bangalore', state: 'Karnataka', taluk: 'Bangalore South', region: 'Bangalore HQ', deliveryStatus: 'Delivery', latitude: 12.9299, longitude: 77.5822 },
  { areaName: 'Malleswaram', pincode: '560003', district: 'Bangalore', state: 'Karnataka', taluk: 'Bangalore North', region: 'Bangalore HQ', deliveryStatus: 'Delivery', latitude: 13.0068, longitude: 77.5702 },
  { areaName: 'HSR Layout', pincode: '560102', district: 'Bangalore', state: 'Karnataka', taluk: 'Bangalore South', region: 'Bangalore HQ', deliveryStatus: 'Delivery', latitude: 12.9121, longitude: 77.6446 },
  { areaName: 'Electronic City', pincode: '560100', district: 'Bangalore', state: 'Karnataka', taluk: 'Bangalore South', region: 'Bangalore HQ', deliveryStatus: 'Delivery', latitude: 12.8452, longitude: 77.6602 },
  { areaName: 'BTM Layout', pincode: '560076', district: 'Bangalore', state: 'Karnataka', taluk: 'Bangalore South', region: 'Bangalore HQ', deliveryStatus: 'Delivery', latitude: 12.9166, longitude: 77.6101 },
  { areaName: 'Marathahalli', pincode: '560037', district: 'Bangalore', state: 'Karnataka', taluk: 'Bangalore North', region: 'Bangalore HQ', deliveryStatus: 'Delivery', latitude: 12.9569, longitude: 77.7011 },
  { areaName: 'Yelahanka', pincode: '560064', district: 'Bangalore', state: 'Karnataka', taluk: 'Bangalore North', region: 'Bangalore HQ', deliveryStatus: 'Delivery', latitude: 13.1007, longitude: 77.5963 }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('Clearing existing pincodes...');
    await Pincode.deleteMany();

    console.log('Inserting sample pincodes...');
    await Pincode.insertMany(samplePincodes);

    console.log('Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
