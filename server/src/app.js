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

const app = express();

app.use(cors());  
app.use(express.json());
app.use(logger);
app.use(errorHandler);
app.use("/api/countries", countryRoutes);
app.use("/api/economy", economyRoutes);
app.use("/api/climate",climateRoutes);
app.use("/api/intelligence", intelligenceRoutes);
app.use("/api/compare", compareRoutes);
app.use("/api/analysis", analysisRoutes); 

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Grey Globes API Running",
  });
});

module.exports = app;