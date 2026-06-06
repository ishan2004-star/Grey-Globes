const express = require("express");
const cors = require("cors");
const countryRoutes = require("./routes/countryRoutes");
const economyRoutes = require("./routes/economyRoutes");
const climateRoutes = require("./routes/climateRoutes");
const intelligenceRoutes = require("./routes/intelligenceRoutes");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const compareRoutes = require("./routes/compareRoutes");
const analysisRoutes = require("./routes/analysisRoutes");
const authRoutes = require("./routes/authRoutes");
const savedCountryRoutes = require("./routes/savedCountryRoutes");
const comparisonRoutes = require("./routes/comparisonRoutes");
const commentRoutes = require("./routes/commentRoutes");
const noteRoutes = require("./routes/noteRoutes");

const app = express();

app.use(cors());  
app.use(express.json());
app.use(logger);

// Existing routes
app.use("/api/countries", countryRoutes);
app.use("/api/economy", economyRoutes);
app.use("/api/climate", climateRoutes);
app.use("/api/intelligence", intelligenceRoutes);
app.use("/api/compare", compareRoutes);
app.use("/api/analysis", analysisRoutes); 

// Phase 4 routes
app.use("/api/auth", authRoutes);
app.use("/api/saved-countries", savedCountryRoutes);
app.use("/api/comparisons", comparisonRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/notes", noteRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Grey Globes API Running",
  });
});

app.use(errorHandler);

module.exports = app;