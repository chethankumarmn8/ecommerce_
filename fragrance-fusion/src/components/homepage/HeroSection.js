import React from "react";
import { useNavigate } from "react-router-dom";
import "./herosection.css";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      {/* Background Container */}
      <div className="hero-bg-container">
        <div className="hero-bg-image"></div>
        <div className="hero-bg-overlay"></div>
      </div>

      {/* Content */}
      <div className="hero-content">
        <h1 className="hero-title">
          <span>LUXURY SCENT</span>
          <span>CRAFTSMANSHIP</span>
        </h1>
        <p className="hero-tagline">
          Where Every Scent Unfolds a Story of Elegance and Passion
        </p>
        <div className="hero-buttons">
          <button onClick={() => navigate("/marketplace")}>
            Explore Collections
          </button>
          <button onClick={() => navigate("/artisan-responsibilities")}>
            Create Your Scent Profile
          </button>
        </div>
      </div>
    </section>
  );
};

export default React.memo(HeroSection);