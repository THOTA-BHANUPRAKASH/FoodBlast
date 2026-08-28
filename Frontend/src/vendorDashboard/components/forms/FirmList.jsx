import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_Path } from "../../data/apiPath";

const FirmList = ({ showProductHandler, showAllProductHandler,selectedFirm ,setSelectedFirm}) => {
  const [firms, setFirms] = useState([]);
  

  const handleAddProduct = (firmId) => {
    localStorage.setItem("firmId", firmId);

    showProductHandler();
  };

  useEffect(() => {
    const fetchFirms = async () => {
      try {
        const res = await axios.get(`${API_Path}/vendor/vendor-firms`, {
          withCredentials: true,
        });

        setFirms(res.data.vendor.firm);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFirms();
  }, []);

  const handleFirmClick = (firm) => {
    setSelectedFirm(firm);
  };

  return (
    <div className="firmContainer">
      <ul className="firmList">
        {firms.map((firm) => (
          <li
            key={firm._id}
            className="firmItem"
            onClick={() => handleFirmClick(firm)}
          >
            {firm.firmName}
          </li>
        ))}
      </ul>

      {selectedFirm && (
        <div className="firmDetails">
          <h3>{selectedFirm.firmName}</h3>
          <div>
            <button
              className="addProductBtn"
              onClick={() => handleAddProduct(selectedFirm._id)}
            >
              Add Product
            </button>
            <button
              className="allProductBtn"
              onClick={() => {
                localStorage.setItem("firmId", selectedFirm._id);
                showAllProductHandler();
              }}
            >
              All Products
            </button>
          </div>
          <p>
            <strong>Area:</strong> {selectedFirm.area}
          </p>

          <p>
            <strong>Offer:</strong> {selectedFirm.offer}
          </p>

          <p>
            <strong>Category:</strong> {selectedFirm.category.join(", ")}
          </p>

          <p>
            <strong>Region:</strong> {selectedFirm.region.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};

export default FirmList;
