const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/myDatabase'
    
    await mongoose.connect(MONGODB_URI)
    
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('MongoDB connection error:', error.message)
    process.exit(1)
  }
}

connectDB().catch(err => console.error(err))
