import { useEffect, useState } from "react";
import { API_URL } from "../api";

const ChainRestaurant = () => {
  const [vendorData, setVendorData] = useState([]);
  const [loading, setLoading] = useState(true);

  const vendorFirmHandler = async () => {
    try {
      const res = await fetch(`${API_URL}/vendor/all-vendors`);

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }

      const newData = await res.json();

      setVendorData(newData.vendor || []);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = (direction) => {
    const gallery = document.getElementById("chaingallery");

    const scrollAmount = 300;

    if (direction === "left") {
      gallery.scrollTo({
        left: gallery.scrollLeft - scrollAmount,
        behavior: "smooth",
      });
    } else if (direction === "right") {
      gallery.scrollTo({
        left: gallery.scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    vendorFirmHandler();
  }, []);

  if (loading) {
    return (
      <div className="chainRestaurant">
        <h2>Chain Restaurants</h2>
        <p>Loading restaurants...</p>
      </div>
    );
  }

  return (
    <div className="chainRestaurant">
      <div className="chainHeader">
        <h2>Chain Restaurants</h2>

        <div className="btnSection">
          <button className="scrollBtn" onClick={() => handleScroll("left")}>
            &#129032;
          </button>

          <button className="scrollBtn" onClick={() => handleScroll("right")}>
            &#129030;
          </button>
        </div>
      </div>

      <div className="chainSection" id="chaingallery">
        {vendorData.flatMap((vendor) =>
          (vendor.firm || []).map((firm) => (
            <div className="firmBox" key={firm._id}>
              <img
                src={`${API_URL}/uploads/${firm.image}`}
                alt={firm.firmName}
                className="FirmImage"
              />

              <div className="firmName">{firm.firmName}</div>
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default ChainRestaurant;
