const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const vendorRoutes = require("./routes/vendorRoutes");
const bodyParser = require("body-parser");
const firmRoutes = require("./routes/firmRoutes");
const productRoutes = require("./routes/productRoutes");
const searchRoutes = require("./routes/searchRoutes");
const customerRoutes = require("./routes/customerRoutes");

const path = require("path");
const CORS = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(
  CORS({
    origin: ["http://localhost:9999", "http://localhost:4444","https://food-blast-client.vercel.app","https://food-blast-frontend.vercel.app"],
    credentials: true,
  }),
);
app.use(cookieParser());
const PORT = process.env.PORT || 3333;

dotEnv.config();

app.use(express.json());
app.use(bodyParser.json());
app.use("/vendor", vendorRoutes);
app.use("/firm", firmRoutes);
app.use("/product", productRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/search", searchRoutes);
app.use("/customer", customerRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database conected sucessfully"))
  .catch((error) => console.log(error));

app.listen(PORT, () => {
  console.log(`Server started and running sucessfully at ${PORT}`);
});

app.use("/", (req, res) => {
  res.send("<h1>welcom to FOODBLAST</h1>");
});
