import { useState } from "react";
import axios from "axios";
import { API_URL } from "../api";

const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [firms, setFirms] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchHandler = async () => {
    if (!searchTerm.trim()) {
      setFirms([]);
      setProducts([]);
      return;
    }

    try {
      setLoading(true);

      const res = await axios.get(`${API_URL}/search`, {
        params: {
          q: searchTerm,
        },
      });

      setFirms(res.data.firms || []);
      setProducts(res.data.products || []);
    } catch (error) {
      console.error("Search error:", error);
      setFirms([]);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    firms,
    products,
    loading,
    searchHandler,
  };
};

export default useSearch;
