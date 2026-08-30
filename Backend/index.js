const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const vendorRoutes = require("./routes/vendorRoutes");
const bodyParser = require("body-parser");
const firmRoutes = require("./routes/firmRoutes");
const productRoutes = require("./routes/productRoutes");
const searchRoutes = require("./routes/searchRoutes");
const customerRoutes = require("./routes/customerRoutes");

const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3333;

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:9999",
      "http://localhost:4444",
      "https://food-blast-client.vercel.app",
      "https://food-blast-frontend.vercel.app",
    ],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/vendor", vendorRoutes);
app.use("/firm", firmRoutes);
app.use("/product", productRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/search", searchRoutes);
app.use("/customer", customerRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.log(error));

app.listen(PORT, () => {
  console.log(`Server started successfully at ${PORT}`);
});

app.use("/", (req, res) => {
  res.send("<h1>Welcome to FOODBLAST</h1>");
});