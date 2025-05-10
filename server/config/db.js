import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log("🌐 Connecting to MongoDB URI:", process.env.MONGODB_URI); // Debug

    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB Connection Error:');
    console.error('🔹 Error Name:', error.name);
    console.error('🔹 Error Message:', error.message);
    console.error('🔹 Full Error:', error);
    process.exit(1);
  }
};

export default connectDB;
