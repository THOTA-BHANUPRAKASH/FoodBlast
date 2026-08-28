import { Link } from "react-router-dom";
import { API_URL } from "../api";

const SearchResults = ({ firms, products, loading, searchTerm }) => {
  if (!searchTerm.trim()) {
    return null;
  }

  return (
    <div className="searchResultsContainer">
      <h3>Search Results</h3>

      {loading ? (
        <div className="searchLoading">Searching...</div>
      ) : (
        <>
          {firms.map((firm) => (
            <Link
              to={`/products/${firm._id}`}
              className="searchResultCard"
              key={`firm-${firm._id}`}
            >
              <img
                src={`${API_URL}/uploads/${firm.image}`}
                alt={firm.firmName}
                className="searchResultImage"
              />

              <div className="searchResultInfo">
                <h4>{firm.firmName}</h4>

                <p>{firm.area}</p>

                <span>Restaurant</span>
              </div>
            </Link>
          ))}

          {products.map((product) => {
            const firmId = product.firm?.[0]?._id;

            return (
              <Link
                to={`/products/${firmId}`}
                className="searchResultCard"
                key={`product-${product._id}`}
              >
                <img
                  src={product.firm?.[0]?.image}
                  alt={product.productName}
                  className="searchResultImage"
                />

                <div className="searchResultInfo">
                  <h4>{product.productName}</h4>

                  <p>{product.firm?.[0]?.firmName}</p>

                  <span>{product.firm?.[0]?.area}</span>
                </div>
              </Link>
            );
          })}

          {firms.length === 0 && products.length === 0 && (
            <div className="noSearchResults">😔 No results found</div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;
