import React, { useState } from "react";
import { API_Path } from "../../data/apiPath";
import axios from "axios";

const Login = ({ showWelcomeHandler, setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        API_Path + "/vendor/login",
        { email, password },
        { withCredentials: true },
      );
      if (res.status === 200) {
        setEmail("");
        setPassword("");
        alert("Vendor login successfully");
        localStorage.setItem("token", res.data.token);
        showWelcomeHandler();
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed");
    }
  };
  return (
    <div className="loginSection">
      <form className="authForm" onSubmit={loginHandler}>
        <h3>Vendor Login</h3>

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email"
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your Password"
        />

        <div className="btnSubmit">
          <button type="submit">Login</button>
        </div>
        <div className="backToAppContainer">
          <a
            href={import.meta.env.VITE_CUSTOMER_URL}
            className="backToAppButton"
          >
            ← Back to FoodBlast
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
