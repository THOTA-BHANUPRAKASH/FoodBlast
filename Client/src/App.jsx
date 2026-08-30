import LandingPage from "./Pages/LandingPage";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ProductMenu from "./Components/ProductMenu";
import CartProvider from "./context/cartContext";
import Cart from "./Components/Cart";
import CustomerLogin from "./Pages/CustomerLogin";
import AuthProvider from "./context/AuthContext";
import CustomerRegister from "./Pages/CustomerRegister";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/products/:firmId" element={<ProductMenu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<CustomerRegister />} />
          <Route path="/login" element={<CustomerLogin />} />
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
