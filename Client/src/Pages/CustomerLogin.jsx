import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../api";
import { AuthContext } from "../context/AuthContext";

const CustomerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_URL}/customer/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      login(res.data.customer);

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);

      setError(
        error.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="customerLoginPage">
      <div className="customerLoginCard">
        <button
          type="button"
          className="backButton"
          onClick={() => navigate("/")}
        >
          ←
        </button>
        <h2>Welcome Back</h2>

        <p className="loginSubtitle">Login to continue to FoodBlast</p>

        <form onSubmit={loginHandler}>
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

          <button type="submit" className="loginButton" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="registerLinkText">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default CustomerLogin;
