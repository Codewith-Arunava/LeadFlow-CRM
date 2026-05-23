const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/User');

let mongod = null;

const connectDB = async () => {
  try {
    let dbUri = process.env.MONGODB_URI;

    // Check if we want to use the local memory server fallback
    if (!dbUri || dbUri.includes('localhost')) {
      console.log('Setting up MongoDB Memory Server (No installation required)...');
      mongod = await MongoMemoryServer.create();
      dbUri = mongod.getUri();
    }

    const conn = await mongoose.connect(dbUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Auto-create a test user if it's the memory server
    if (mongod) {
      const userExists = await User.findOne({ email: 'arunavachakraborty170@gmail.com' });
      if (!userExists) {
        await User.create({
          name: 'Arunava Chakraborty',
          email: 'arunavachakraborty170@gmail.com',
          password: 'password123',
          role: 'admin'
        });
        console.log('✅ Created default test user: arunavachakraborty170@gmail.com / password123');
      }
    }

  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
