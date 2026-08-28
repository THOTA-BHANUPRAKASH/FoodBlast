import React from "react";

const NotFound = () => {
  return (
    <div className="notFoundPage">
      <div className="notFoundContent">
        <h1>404</h1>

        <h2>Page Not Found</h2>

        <p>
          Sorry, the page you are looking for doesn't exist.
        </p>

        <button onClick={() => window.location.href = "/"}>
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;