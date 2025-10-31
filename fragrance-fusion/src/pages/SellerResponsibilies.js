import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaWineBottle,
  FaRegClock,
  FaComments,
  FaLeaf,
  FaGlobe,
  FaCoins,
  FaChartLine,
  FaFlask,
  FaSeedling
} from "react-icons/fa";

const ArtisanResponsibilities = () => {
  const navigate = useNavigate();

  // Updated data arrays for perfume-specific content
  const perfumerStandards = [
    {
      icon: <FaFlask />,
      title: "Scent Mastery",
      text: "Maintain exceptional fragrance blending techniques",
    },
    {
      icon: <FaRegClock />,
      title: "Aging Process",
      text: "Adhere to proper maturation timelines",
    },
    {
      icon: <FaComments />,
      title: "Client Consultations",
      text: "Provide expert scent recommendations",
    },
    {
      icon: <FaLeaf />,
      title: "Natural Ingredients",
      text: "Use 100% premium essential oils",
    },
  ];

  const perfumerBenefits = [
    {
      icon: <FaGlobe />,
      title: "Global Exposure",
      text: "Present creations to international clientele",
    },
    {
      icon: <FaCoins />,
      title: "Premium Earnings",
      text: "Retain 88% of every exclusive blend",
    },
    {
      icon: <FaWineBottle />,
      title: "Bottling Support",
      text: "Premium packaging & presentation",
    },
    {
      icon: <FaChartLine />,
      title: "Market Insights",
      text: "Access luxury fragrance trends data",
    },
  ];

  return (
    <div className="container py-5">
      {/* Header Section */}
      <div className="row justify-content-center mb-5">
        <div className="col-12 text-center">
          <h1
            className="display-4 fw-bold mb-3"
            style={{
              color: "#4A2D7A", // Deep purple
              textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
              animation: "fadeIn 1s ease-in",
            }}
          >
            Craft Olfactory Masterpieces
          </h1>
          <p
            className="lead"
            style={{ 
              color: "#D4AF37", // Gold
              animation: "slideUp 0.8s ease-out" 
            }}
          >
            Join Our Guild of Master Perfumers
          </p>
        </div>
      </div>

      {/* Standards & Benefits Grid */}
      <div className="row g-4 justify-content-center">
        {/* Perfumer Standards */}
        <div className="col-12 col-lg-6" style={{ animation: "slideInLeft 0.8s ease-out" }}>
          <div className="card h-100 border-0 shadow-lg rounded-3 overflow-hidden">
            <div
              className="card-header py-4 text-white"
              style={{
                background: "linear-gradient(45deg, #4A2D7A, #6f42c1)", // Purple gradient
              }}
            >
              <h3 className="mb-0 d-flex align-items-center gap-3">
                <FaSeedling />
                Perfumer Standards
              </h3>
            </div>
            <div className="card-body">
              <div className="row g-3">
                {perfumerStandards.map((item, index) => (
                  <div key={index} className="col-12 col-md-6">
                    <div
                      className="d-flex align-items-center p-3 bg-light rounded-3 h-100"
                      style={{ transition: "transform 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                    >
                      <span 
                        className="icon-wrapper rounded-circle p-3 me-3"
                        style={{ 
                          background: "#4A2D7A",
                          color: "#D4AF37"
                        }}
                      >
                        {item.icon}
                      </span>
                      <div>
                        <h5 className="mb-1" style={{ color: "#4A2D7A" }}>{item.title}</h5>
                        <p className="mb-0 text-muted small">{item.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Perfumer Benefits */}
        <div className="col-12 col-lg-6" style={{ animation: "slideInRight 0.8s ease-out" }}>
          <div className="card h-100 border-0 shadow-lg rounded-3 overflow-hidden">
            <div
              className="card-header py-4 text-white"
              style={{
                background: "linear-gradient(45deg, #D4AF37, #b5942d)", // Gold gradient
              }}
            >
              <h3 className="mb-0 d-flex align-items-center gap-3">
                <FaWineBottle />
                Master Perfumer Advantages
              </h3>
            </div>
            <div className="card-body">
              <div className="row g-3">
                {perfumerBenefits.map((item, index) => (
                  <div key={index} className="col-12 col-md-6">
                    <div
                      className="d-flex align-items-center p-3 bg-light rounded-3 h-100"
                      style={{ transition: "transform 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                    >
                      <span 
                        className="icon-wrapper rounded-circle p-3 me-3"
                        style={{ 
                          background: "#D4AF37",
                          color: "#4A2D7A"
                        }}
                      >
                        {item.icon}
                      </span>
                      <div>
                        <h5 className="mb-1" style={{ color: "#D4AF37" }}>{item.title}</h5>
                        <p className="mb-0 text-muted small">{item.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="row justify-content-center mt-5" style={{ animation: "fadeInUp 0.8s ease-out" }}>
        <div className="col-12 col-md-8 text-center">
          <div className="d-flex flex-column flex-lg-row gap-3 justify-content-center">
            <button
              className="btn btn-lg px-4 py-3 fw-bold text-white border-0"
              style={{
                background: "linear-gradient(45deg, #4A2D7A, #6f42c1)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(74, 45, 122, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
              onClick={() => navigate("/artisan-register")}
            >
              Create Your Signature Scent
            </button>

            <button
              className="btn btn-lg px-4 py-3 fw-bold"
              style={{
                border: "2px solid #D4AF37",
                color: "#D4AF37",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#D4AF3710";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.transform = "scale(1)";
              }}
              onClick={() => navigate("/artisan-login")}
            >
              Master Perfumer Portal
            </button>
          </div>
          <p className="text-muted mt-4 small" style={{ color: "#4A2D7A" }}>
            Competitive 12% commission • Bi-weekly payments • Scentcraft mentorship
          </p>
        </div>
      </div>

      {/* Keep existing animation styles */}
    </div>
  );
};

export default ArtisanResponsibilities;