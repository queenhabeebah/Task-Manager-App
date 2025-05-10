import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

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
