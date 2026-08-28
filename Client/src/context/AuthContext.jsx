import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (customerData) => {
    setCustomer(customerData);
  };

  const checkAuth = async () => {
    try {
      const res = await axios.get(`${API_URL}/customer/me`, {
        withCredentials: true,
      });

      setCustomer(res.data.customer);
    } catch (error) {
      console.error("Customer is not logged in", error);

      setCustomer(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${API_URL}/customer/logout`,
        {},
        {
          withCredentials: true,
        },
      );

      setCustomer(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        customer,
        setCustomer,
        login,
        loading,
        checkAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
