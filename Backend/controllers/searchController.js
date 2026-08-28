const Firm = require("../models/Firm");
const Product = require("../models/Product");

const searchController = async (req, res) => {
  try {
    const searchTerm = req.query.q;

    console.log("Search term:", searchTerm);

    const allFirms = await Firm.find();

    console.log("All firms:", allFirms);

    const firms = await Firm.find({
      firmName: {
        $regex: searchTerm,
        $options: "i",
      },
    });

    const products = await Product.find({
      productName: {
        $regex: searchTerm,
        $options: "i",
      },
    }).populate("firm");

    console.log("Matching firms:", firms, products);

    res.json({
      firms,
      products,
    });
  } catch (error) {
    console.log("Search error:", error);

    res.status(500).json({
      message: "Search failed",
      error: error.message,
    });
  }
};

module.exports = searchController;
