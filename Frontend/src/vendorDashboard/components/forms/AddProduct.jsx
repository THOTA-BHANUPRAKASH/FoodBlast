import React, { useState, useRef } from "react";
import axios from "axios";
import { API_Path } from "../../data/apiPath";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleCategoryChange = (e) => {
    const value = e.target.value;

    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };
  const handleBestSeller = (e) => {
    const value = e.target.value === "true";
    setBestSeller(value);
  };

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setFile(selectedImage);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const firmId = localStorage.getItem("firmId");
    if (!firmId) {
      alert("Please add a firmID... ");
      return;
    }
    if (
      !productName.trim() ||
      !price.trim() ||
      category.length === 0 ||
      !description.trim() ||
      !file
    ) {
      alert("Please fill all fields.");
      return;
    }

    const formData = new FormData();

    formData.append("productName", productName);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", file);
    formData.append("bestSeller", bestSeller);

    category.forEach((value) => {
      formData.append("category", value);
    });

    try {
      await axios.post(API_Path + `/product/add-product/${firmId}`, formData, {
        withCredentials: true,
      });

      setProductName("");
      setPrice("");
      setCategory([]);
      setBestSeller(false);
      setDescription("");
      setFile(null);

      fileInputRef.current.value = "";
      alert("Product added sucessfully!");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="productSection">
      <form className="productForm" onSubmit={handleAddProduct}>
        <h3>Product Details</h3>

        <label>Product Name</label>
        <input
          type="text"
          placeholder="Enter Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <label>Price</label>
        <input
          type="text"
          placeholder="Enter Item Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <div className="category-input">
          <label>Category</label>

          <div className="checkboxContainer">
            <input
              type="checkbox"
              id="veg"
              value="Veg"
              checked={category.includes("Veg")}
              onChange={handleCategoryChange}
            />
            <label htmlFor="veg" id="veg-value">
              Veg
            </label>

            <input
              type="checkbox"
              id="nonveg"
              value="Non-Veg"
              checked={category.includes("Non-Veg")}
              onChange={handleCategoryChange}
            />
            <label htmlFor="nonveg" id="nonveg-value">
              Non-Veg
            </label>
          </div>
        </div>

        <div className="bestSeller-input">
          <label>Best Seller</label>

          <div className="checkboxContainer">
            <input
              className="radioBtn"
              type="radio"
              id="yes"
              name="bestSeller"
              value="true"
              checked={bestSeller === true}
              onChange={handleBestSeller}
            />
            <label htmlFor="yes">Yes</label>

            <input
              className="radioBtn"
              type="radio"
              id="no"
              name="bestSeller"
              value="false"
              checked={bestSeller === false}
              onChange={handleBestSeller}
            />
            <label htmlFor="no">No</label>
          </div>
        </div>

        <label>Description</label>
        <textarea
          placeholder="Describe the food item..."
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label>Product Image</label>
        <input
          className="inputFile"
          ref={fileInputRef}
          type="file"
          onChange={handleImageUpload}
        />

        <div className="btnSubmit">
          <button type="submit">Add Product</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
