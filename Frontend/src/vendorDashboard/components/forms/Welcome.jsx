import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="welcomePage">
      <main className="welcomeHero">
        <div className="welcomeContent">
          <p className="welcomeBadge">🍴 FOODBLAST PARTNER</p>

          <h1>
            Grow Your Restaurant
            <br />
            With <span>FoodBlast</span>
          </h1>

          <p className="welcomeDescription">
            Welcome to your FoodBlast vendor portal. Manage your restaurants,
            products and orders all in one place.
          </p>

          <div className="welcomeButtons">
            <Link to="/add-firm" className="primaryWelcomeButton">
              + Add Your Restaurant
            </Link>

            <Link to="/dashboard" className="secondaryWelcomeButton">
              Go to Dashboard
            </Link>
          </div>
        </div>

        <div className="welcomeIllustration">
          <div className="foodCircle">🍔</div>

          <div className="floatingCard cardOne">
            <span>📈</span>
            <div>
              <strong>Grow Faster</strong>
              <small>Reach more customers</small>
            </div>
          </div>

          <div className="floatingCard cardTwo">
            <span>⭐</span>
            <div>
              <strong>Build Your Brand</strong>
              <small>Get discovered</small>
            </div>
          </div>
        </div>
      </main>

      <section className="welcomeFeatures">
        <div className="featureCard">
          <div className="featureIcon">🏪</div>
          <h3>Manage Restaurants</h3>
          <p>Add and manage your restaurant information easily.</p>
        </div>

        <div className="featureCard">
          <div className="featureIcon">🍽️</div>
          <h3>Manage Products</h3>
          <p>Add food items, prices and descriptions to your menu.</p>
        </div>

        <div className="featureCard">
          <div className="featureIcon">📊</div>
          <h3>Grow Your Business</h3>
          <p>Reach more customers and grow your food business.</p>
        </div>
      </section>
    </div>
  );
};

export default Welcome;
