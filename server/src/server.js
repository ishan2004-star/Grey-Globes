require("dotenv").config();
const connectDB = require("./config/db");
const app = require("./app");

const PORT = process.env.PORT || 5000;

// Start the server first, then connect to MongoDB
// This ensures existing APIs work even if MongoDB is temporarily unavailable
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Connect to MongoDB (non-blocking)
connectDB();
