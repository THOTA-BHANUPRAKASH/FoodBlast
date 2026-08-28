import { useEffect, useState } from "react";
import { API_URL } from "../api";
import { Link } from "react-router-dom";

const FirmCollections = () => {
  const [firmData, setFirmData] = useState([]);

  const [areaFilter, setAreaFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [regionFilter, setRegionFilter] = useState("All");

  const [showArea, setShowArea] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showRegion, setShowRegion] = useState(false);

  const firmDataHandler = async () => {
    try {
      const res = await fetch(`${API_URL}/vendor/all-vendors`);

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }

      const newFirmData = await res.json();

      setFirmData(newFirmData.vendor || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    firmDataHandler();
  }, []);

  const allFirms = firmData.flatMap((vendor) => vendor.firm || []);

  const areas = [
    "All",
    ...new Set(allFirms.map((firm) => firm.area).filter(Boolean)),
  ];

  const categories = [
    "All",
    ...new Set(allFirms.flatMap((firm) => firm.category || [])),
  ];

  const regions = [
    "All",
    ...new Set(allFirms.flatMap((firm) => firm.region || [])),
  ];

  const filteredFirms = allFirms.filter((firm) => {
    const areaMatch = areaFilter === "All" || firm.area === areaFilter;

    const categoryMatch =
      categoryFilter === "All" || firm.category?.includes(categoryFilter);

    const regionMatch =
      regionFilter === "All" || firm.region?.includes(regionFilter);

    let priceMatch = true;

    if (priceFilter !== "All") {
      const price = Number(firm.price);

      if (priceFilter === "low") {
        priceMatch = price < 200;
      }

      if (priceFilter === "medium") {
        priceMatch = price >= 200 && price <= 500;
      }

      if (priceFilter === "high") {
        priceMatch = price > 500;
      }
    }

    return areaMatch && categoryMatch && priceMatch && regionMatch;
  });

  return (
    <div className="firmCollections">
      <div className="collectionHeader">
        <h2>Restaurants in India</h2>

        <div className="filterSection">
          <div className="filterDropdown">
            <button
              className="filterButton"
              onClick={() => {
                setShowArea(!showArea);
                setShowPrice(false);
                setShowCategory(false);
              }}
            >
              Area
              <span>▼</span>
            </button>

            {showArea && (
              <div className="filterMenu">
                {areas.map((area) => (
                  <button
                    key={area}
                    onClick={() => {
                      setAreaFilter(area);
                      setShowArea(false);
                    }}
                  >
                    {area}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="filterDropdown">
            <button
              className="filterButton"
              onClick={() => {
                setShowPrice(!showPrice);
                setShowArea(false);
                setShowCategory(false);
              }}
            >
              Price
              <span>▼</span>
            </button>

            {showPrice && (
              <div className="filterMenu">
                <button
                  onClick={() => {
                    setPriceFilter("All");
                    setShowPrice(false);
                  }}
                >
                  All
                </button>

                <button
                  onClick={() => {
                    setPriceFilter("low");
                    setShowPrice(false);
                  }}
                >
                  Under ₹200
                </button>

                <button
                  onClick={() => {
                    setPriceFilter("medium");
                    setShowPrice(false);
                  }}
                >
                  ₹200 - ₹500
                </button>

                <button
                  onClick={() => {
                    setPriceFilter("high");
                    setShowPrice(false);
                  }}
                >
                  Above ₹500
                </button>
              </div>
            )}
          </div>

          <div className="filterDropdown">
            <button
              className="filterButton"
              onClick={() => {
                setShowCategory(!showCategory);
                setShowArea(false);
                setShowPrice(false);
              }}
            >
              Category
              <span>▼</span>
            </button>

            {showCategory && (
              <div className="filterMenu">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setCategoryFilter(category);
                      setShowCategory(false);
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="filterDropdown">
            <button
              className="filterButton"
              onClick={() => {
                setShowRegion(!showRegion);
                setShowArea(false);
                setShowPrice(false);
                setShowCategory(false);
              }}
            >
              Region
              <span>▼</span>
            </button>

            {showRegion && (
              <div className="filterMenu">
                {regions.map((region) => (
                  <button
                    key={region}
                    onClick={() => {
                      setRegionFilter(region);
                      setShowRegion(false);
                    }}
                  >
                    {region}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="activeFilters">
        {areaFilter !== "All" && (
          <span className="activeFilter">
            Area: {areaFilter}
            <button onClick={() => setAreaFilter("All")}>×</button>
          </span>
        )}

        {priceFilter !== "All" && (
          <span className="activeFilter">
            Price:{" "}
            {priceFilter === "low"
              ? "Under ₹200"
              : priceFilter === "medium"
                ? "₹200 - ₹500"
                : "Above ₹500"}
            <button onClick={() => setPriceFilter("All")}>×</button>
          </span>
        )}

        {categoryFilter !== "All" && (
          <span className="activeFilter">
            Category: {categoryFilter}
            <button onClick={() => setCategoryFilter("All")}>×</button>
          </span>
        )}

        {regionFilter !== "All" && (
          <span className="activeFilter">
            Region: {regionFilter}
            <button onClick={() => setRegionFilter("All")}>×</button>
          </span>
        )}
      </div>

      <div className="firmGrid">
        {filteredFirms.length > 0 ? (
          filteredFirms.map((firm) => (
            <Link
              to={`/products/${firm._id}`}
              className="firmLink"
              key={firm._id}
            >
              <div className="firmCard">
                <div className="firmImageContainer">
                  <img
                    src={`${API_URL}/uploads/${firm.image}`}
                    alt={firm.firmName}
                    className="firmImage"
                  />

                  <div className="offerDetails">{firm.offer}</div>
                </div>

                <div className="firmDetails">
                  <h3>{firm.firmName}</h3>

                  <p>
                    <strong>Area:</strong> {firm.area}
                  </p>

                  <p>
                    <strong>Region:</strong> {firm.region?.join(", ")}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="noResults">
            <div className="sadEmoji">😔</div>
            <div>Sorry...No restaurants found</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FirmCollections;
