import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_Path } from "../../data/apiPath";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const firmId = localStorage.getItem("firmId");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_Path}/product/${firmId}/products`, {
          withCredentials: true,
        });

        setProducts(res.data.products);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (firmId) {
      fetchProducts();
    }
  }, [firmId]);

  if (loading) {
    return <h2>Loading Products...</h2>;
  }

  const handleDeleteProduct = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_Path}/product/${productId}`, {
        withCredentials: true,
      });

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId),
      );

      alert("Product deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="allProductsContainer">
      <h2>All Products</h2>

      {products.length === 0 ? (
        <p>No Products Found</p>
      ) : (
        <div className="productsGrid">
          {products.map((product) => (
            <div className="productCard" key={product._id}>
              <img
                src={`${API_Path}/uploads/${product.image}`}
                alt={product.productName}
                className="productImage"
              />

              <h3>{product.productName}</h3>

              <p>
                <strong>Price:</strong> ₹{product.price}
              </p>

              <p>
                <strong>Category:</strong>{" "}
                {Array.isArray(product.category)
                  ? product.category.join(", ")
                  : product.category}
              </p>

              <p>
                <strong>Best Seller:</strong>{" "}
                {product.bestSeller ? "Yes" : "No"}
              </p>

              <p>{product.description}</p>

              <button
                className="deleteBtn"
                onClick={() => handleDeleteProduct(product._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
