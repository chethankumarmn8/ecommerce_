// src/pages/HomePage.js
import React from "react";
import HeroSection from "../components/homepage/HeroSection";
import FeaturedCollections from "../components/homepage/FeaturedCollections";
import TrustBadges from "../components/homepage/TrustBadges";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedCollections />
      <TrustBadges />
    </div>
  );
};

export default HomePage;

