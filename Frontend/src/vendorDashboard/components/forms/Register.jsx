import React, { useState } from "react";
import { API_Path } from "../../data/apiPath";
import axios from "axios";


const Register = ({showLoginHandler}) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(API_Path + "/vendor/register", {
        username:userName,
        email,
        password,
      });

      
      if (res.status === 201) {
        setUserName("");
        setEmail("");
        setPassword("");
        alert("Vendor registered successfully");
        showLoginHandler();
      }
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed");
    }
  };

  return (
    <div className="registerSection">
      <form className="registerForm" onSubmit={handleSubmit}>
        <h3>Vendor Registration</h3>

        <label>UserName</label>
        <input type="text" name="userName" value={userName} onChange={(e)=>setUserName(e.target.value)} placeholder="Enter your UserName" />

        <label>Email</label>
        <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your Email" />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <div className="btnSubmit">
          <button type="submit">Register</button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Register;
