import React, { useRef, useState } from "react";
import { API_Path } from "../../data/apiPath";
import axios from "axios";

const AddFirm = ({ setSelectedFirm }) => {
  const [firstName, setFirstName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
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

  const handleRegionChange = (e) => {
    const value = e.target.value;
    if (region.includes(value)) {
      setRegion(region.filter((item) => item !== value));
    } else {
      setRegion([...region, value]);
    }
  };

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setFile(selectedImage);
  };

  const handleFirmSubmit = async (e) => {
    e.preventDefault();

    if (
      !firstName.trim() ||
      !area.trim() ||
      category.length === 0 ||
      region.length === 0 ||
      !offer.trim() ||
      !file
    ) {
      alert("Please fill all the fields.");
      return;
    }

    const formData = new FormData();

    formData.append("firmName", firstName);
    formData.append("area", area);
    formData.append("offer", offer);
    formData.append("image", file);

    category.forEach((value) => {
      formData.append("category", value);
    });

    region.forEach((value) => {
      formData.append("region", value);
    });

    try {
      const res = await axios.post(API_Path + `/firm/add-firm`, formData, {
        withCredentials: true,
      });
      

      const newFirm = res.data.firm;
      localStorage.setItem("firmId", newFirm._id);

      setSelectedFirm(newFirm);

      alert(res.data.message);
      setFirstName("");
      setArea("");
      setCategory([]);
      setRegion([]);
      setOffer("");
      setFile(null);

      fileInputRef.current.value = "";
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };
  return (
    <div className="firmSection">
      <form className="firmForm" onSubmit={handleFirmSubmit}>
        <h3>Firm Details</h3>

        <label>FirstName</label>
        <input
          type="text"
          placeholder="Enter your FirstName"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label>Area</label>
        <input
          type="text"
          placeholder="Enter your Area"
          name="area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />

        <div className="category-input">
          <label>Category</label>

          <div className="checkboxContainer">
            <input
              type="checkbox"
              checked={category.includes("veg")}
              id="veg"
              value="veg"
              onChange={handleCategoryChange}
            />
            <label htmlFor="veg" id="veg-value">
              Veg
            </label>

            <input
              type="checkbox"
              checked={category.includes("Non-veg")}
              id="Non-veg"
              value="Non-veg"
              onChange={handleCategoryChange}
            />
            <label htmlFor="nonveg" id="nonveg-value">
              Non-Veg
            </label>
          </div>
        </div>

        <div className="region-input">
          <label>Region</label>

          <div className="RegioncheckboxContainer">
            <div className="checkboxItem">
              <input
                type="checkbox"
                checked={region.includes("South-Indian")}
                id="SouthIndian"
                value="South-Indian"
                onChange={handleRegionChange}
              />
              <label htmlFor="SouthIndian">South Indian</label>
            </div>

            <div className="checkboxItem">
              <input
                type="checkbox"
                checked={region.includes("North-Indian")}
                id="NorthIndian"
                value="North-Indian"
                onChange={handleRegionChange}
              />
              <label htmlFor="NorthIndian">North Indian</label>
            </div>

            <div className="checkboxItem">
              <input
                type="checkbox"
                checked={region.includes("Chinese")}
                id="Chinese"
                value="Chinese"
                onChange={handleRegionChange}
              />
              <label htmlFor="Chinese">Chinese</label>
            </div>

            <div className="checkboxItem">
              <input
                type="checkbox"
                checked={region.includes("Bakery")}
                id="Bakery"
                value="Bakery"
                onChange={handleRegionChange}
              />
              <label htmlFor="Bakery">Bakery</label>
            </div>
          </div>
        </div>

        <label>Offer</label>
        <input
          type="text"
          placeholder="Enter your Offer's details"
          name="offer"
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
        />

        <label>Firm Image</label>
        <input
          className="inputFile"
          ref={fileInputRef}
          type="file"
          onChange={handleImageUpload}
        />

        <div className="btnSubmit">
          <button type="submit">Add Firm</button>
        </div>
      </form>
    </div>
  );
};

export default AddFirm;
