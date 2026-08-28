import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../api";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [firms, setFirms] = useState([]);
  const [products, setProducts] = useState([]);

  const { cart } = useContext(CartContext);
  const { customer, logout } = useContext(AuthContext);
  const searchHandler = async () => {
    try {
      const res = await axios.get(`${API_URL}/search?q=${searchTerm}`);

      const data = res.data;

      setFirms(data.firms || []);
      setProducts(data.products || []);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logoLink">
        <div className="navbar-logo">FoodBlast</div>
      </Link>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search food..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button className="search-btn" onClick={searchHandler}>
          Search
        </button>
      </div>

      <div className="navbar-links">
        <Link to="/cart" className="cartLink">
          <span className="cartIcon">🛒</span>

          <span className="cartName">Cart</span>

          <span className="cartCount">{cart.length}</span>
        </Link>

        {customer ? (
          <>
            <span className="customerName">Hi, {customer.customerName}</span>

            <button className="logoutButton" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>

            <span>/</span>

            <Link to="/register">SignUp</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
