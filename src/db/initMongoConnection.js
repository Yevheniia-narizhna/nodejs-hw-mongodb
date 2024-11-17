import mongoose from 'mongoose';

const DB_URI = process.env.DB_URI;

export async function initMongoConnection() {
  try {
    await mongoose.connect(DB_URI);
    console.log('MongoDB connected...');
  } catch (error) {
    console.error('MongoDB connection failed', error);
    throw error;
  }
}
