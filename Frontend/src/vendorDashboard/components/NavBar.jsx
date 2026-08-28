import React, { useEffect, useState } from "react";

const NavBar = ({
  showLoginHandler,
  showRegisterHandler,
  isLoggedIn,
  handleLogout,
  selectedFirm,
}) => {
  return (
    <div className="navSection">
      <div className="welcomeLogo">
        Food<span>Blast</span>
        <small> Partner</small>
      </div>

      

      <div className="currentFirm">
        {selectedFirm ? selectedFirm.firmName : ""}
      </div>

      <div className="userAuth">
        {!isLoggedIn ? (
          <>
            <button onClick={showLoginHandler}>Login</button>/
            <button onClick={showRegisterHandler}>Register</button>
          </>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
