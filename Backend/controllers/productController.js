const Product = require("../models/Product");
const multer = require("multer");
const Firm = require("../models/Firm");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const addProduct = async (req, res) => {
  try {
    const { productName, price, category, bestSeller, description } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const firmId = req.params.firmId;
    const firm = await Firm.findById(firmId);

    if (!firm) {
      return res.status(404).json({ error: "No firm found" });
    }

    const existingProduct = await Product.findOne({
      productName,
      firm: firmId,
    });

    if (existingProduct) {
      return res.status(400).json({
        error: "Product already exists in this firm",
      });
    }

    const product = new Product({
      productName,
      price,
      category,
      bestSeller,
      description,
      image,
      firm: firm._id,
    });
    const savedProduct = await product.save();
    firm.Product.push(savedProduct);
    await firm.save();

    res.status(200).json({ savedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  }
};

const getProductByFirm = async (req, res) => {
  try {
    const firmId = req.params.firmId;
    const firm = await Firm.findById(firmId);

    if (!firm) {
      return res.status(404).json({ error: "No firm found" });
    }
    const restaurantName = firm.firmName;
    const products = await Product.find({ firm: firmId });

    res.status(200).json({ restaurantName, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const deleteProduct = await Product.findByIdAndDelete(productId);
    if (!deleteProduct) {
      return res.status(404).json({ error: "No product found" });
    }
    res.status(200).json({
      message: "Product deleted successfully",
      deleteProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addProduct: [upload.single("image"), addProduct],
  getProductByFirm,
  deleteProductById,
};
