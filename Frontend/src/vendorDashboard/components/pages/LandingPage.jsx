import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_Path } from "../../data/apiPath";
import NavBar from "../NavBar";
import SideBar from "../SideBar";
import Login from "../forms/Login";
import Register from "../forms/Register";
import AddFirm from "../forms/AddFirm";
import AddProduct from "../forms/AddProduct";
import Welcome from "../forms/Welcome";
import FirmList from "../forms/FirmList";
import AllProducts from "../forms/AllProducts";


const LandingPage = () => {
  const [activeForm, setActiveForm] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedFirm, setSelectedFirm] = useState(null);

  const showLoginHandler = () => {
    setActiveForm(activeForm === "login" ? null : "login");
  };

  const showRegisterHandler = () => {
    setActiveForm(activeForm === "register" ? null : "register");
  };
  const showFirmHandler = () => {
    setSelectedFirm(null);
    setActiveForm(activeForm === "showfirm" ? null : "showfirm");
  };

  const showProductHandler = () => {
    setActiveForm(activeForm === "showproduct" ? null : "showproduct");
  };
  const showWelcomeHandler = () => {
    setActiveForm(activeForm === "showwelcome" ? null : "showwelcome");
  };
  const showFirmlisthandler = () => {
    setActiveForm(activeForm === "showfirmlist" ? null : "showfirmlist");
  };

  const showAllProductHandler = () => {
    setActiveForm(activeForm === "allproducts" ? null : "allproducts");
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_Path}/vendor/logout`,
        {},
        {
          withCredentials: true,
        },
      );

      localStorage.clear();

      setIsLoggedIn(false);
      setSelectedFirm(null);
      setActiveForm("login");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
  const checkLogin = async () => {
    try {
      const res = await axios.get(
        `${API_Path}/vendor/loggedInvendor`,
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        setIsLoggedIn(true);

        setActiveForm("showwelcome");
      }
    } catch (error) {
      setIsLoggedIn(false);
      setActiveForm("login");
    }
  };

  checkLogin();
}, []);

  return (
    <>
      <section className="landingSection">
        <NavBar
          isLoggedIn={isLoggedIn}
          showLoginHandler={showLoginHandler}
          showRegisterHandler={showRegisterHandler}
          handleLogout={handleLogout}
          selectedFirm={selectedFirm}
        />
        <div className="collectionSection">
         {isLoggedIn && (<SideBar
            showFirmHandler={showFirmHandler}
            showProductHandler={showProductHandler}
            showFirmlisthandler={showFirmlisthandler}
          />)}
          {!isLoggedIn &&activeForm === "login" && (
            <Login
              showWelcomeHandler={showWelcomeHandler}
              setIsLoggedIn={setIsLoggedIn}
            />
          )}
          {!isLoggedIn && activeForm === "register" && (
            <Register showLoginHandler={showLoginHandler} />
          )}
          {isLoggedIn && activeForm === "showfirmlist" && (
            <FirmList
              showProductHandler={showProductHandler}
              showAllProductHandler={showAllProductHandler}
              selectedFirm={selectedFirm}
              setSelectedFirm={setSelectedFirm}
            />
          )}
          {isLoggedIn && activeForm === "showfirm" && (
            <AddFirm setSelectedFirm={setSelectedFirm} />
          )}
          {isLoggedIn && activeForm === "showproduct" && <AddProduct />}
          {isLoggedIn && activeForm === "showwelcome" && <Welcome />}
          {isLoggedIn && activeForm === "allproducts" && <AllProducts />}
          
        </div>
      </section>
      
    </>
  );
};

export default LandingPage;
