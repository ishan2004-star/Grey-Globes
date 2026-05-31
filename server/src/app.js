const express = require("express");
const cors = require("cors");
const countryRoutes = require("./routes/countryRoutes");
const economyRoutes = require("./routes/economyRoutes");

const app = express();

app.use(cors());  
app.use(express.json());


app.use("/api/countries", countryRoutes);
app.use("/api/economy", economyRoutes);
  
 
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Grey Globes API Running",
  });
});

module.exports = app;