import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API_URL, VENDOR_URL } from "../api";

const CustomerRegister = () => {
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      setLoading(true);

      await axios.post(`${API_URL}/customer/register`, {
        customerName,
        email,
        password,
      });

      setSuccess("Registration successful!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error("Registration error:", error);

      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="customerRegisterPage">
      <div className="customerRegisterCard">
        <button
          type="button"
          className="backButton"
          onClick={() => navigate("/")}
        >
          ←
        </button>
        <h2>Create Account</h2>

        <p className="registerSubtitle">Register to continue to FoodBlast</p>

        <form onSubmit={registerHandler}>
          <div className="formGroup">
            <label>Customer Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>

          <div className="formGroup">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="formGroup">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="formError">{error}</p>}

          {success && <p className="formSuccess">{success}</p>}

          <button type="submit" className="registerButton" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="loginLinkText">
          Already have an account? <Link to="/login">Login</Link>
        </p>
        <div className="vendorRegisterSection">
          <p>Are you a vendor?</p>

          <a href={`${VENDOR_URL}/`} className="vendorRegisterButton">
            Register as Vendor
          </a>
        </div>
      </div>
    </div>
  );
};

export default CustomerRegister;
