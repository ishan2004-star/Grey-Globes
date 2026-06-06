const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    console.error("MongoDB features (auth, saved countries, etc.) will be unavailable.");
    // Do NOT call process.exit(1) — let the server continue
    // so existing API routes (countries, economy, etc.) still work
  }
};

module.exports = connectDB;