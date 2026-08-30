import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { API_URL } from "../api";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import { CartContext } from "../context/cartContext";

const ProductMenu = () => {
  const [products, setProducts] = useState([]);
  const [restaurantName, setRestaurantName] = useState("");

  const { cart, addToCart } = useContext(CartContext);

  const { firmId } = useParams();

  const productHandler = async () => {
    try {
      const res = await axios.get(`${API_URL}/product/${firmId}/products`);

      setProducts(res.data.products || []);
      setRestaurantName(res.data.restaurantName || "");
    } catch (err) {
      console.error("Fetching products failed:", err);
    }
  };

  useEffect(() => {
    productHandler();
  }, [firmId]);

  return (
    <div className="productMenu">
      <NavBar />

      <h2 className="restaurantName">{restaurantName}</h2>

      <div className="productList">
        {products.map((product) => (
          <div className="productCard" key={product._id}>
            <div className="productInfo">
              {product.bestSeller && (
                <div className="bestSeller">
                  <span className="star">★</span>
                  <span>Best Seller</span>
                </div>
              )}

              <div className="productCategory">
                {product.category?.map((category) => (
                  <div className="categoryName" key={category}>
                    <span
                      className={
                        category === "Veg"
                          ? "categoryDot vegDot"
                          : "categoryDot nonVegDot"
                      }
                    ></span>

                    <span>{category}</span>
                  </div>
                ))}
              </div>

              <h3 className="productName">{product.productName}</h3>

              <p className="productPrice">₹{product.price}</p>

              <p className="productDescription">{product.description}</p>
            </div>

            <div className="productImageSection">
              <img
                src={`${API_URL}/uploads/${product.image}`}
                alt={product.productName}
                className="productImage"
              />

              <button
                className="addButton"
                onClick={() => {
                  addToCart(product);
                }}
              >
                ADD
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductMenu;
