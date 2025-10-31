import React from "react";
import {
  FaLock,
  FaLeaf,
  FaTruck,
  FaRegHeart,
  FaHeadset,
  
} from "react-icons/fa";
import { GiPerfumeBottle } from "react-icons/gi";

const TrustBadges = () => {
  const badges = [
    {
      icon: <FaLock className="text-amber" />,
      title: "Secure Transactions",
      description: "Encrypted payment processing"
    },
    {
      icon: <FaLeaf className="text-amber" />,
      title: "Natural Essences",
      description: "Ethically sourced ingredients"
    },
    {
      icon: <FaTruck className="text-amber" />,
      title: "Global Delivery",
      description: "Discreet & insured shipping"
    },
    {
      icon: <GiPerfumeBottle className="text-amber" />,
      title: "Artisan Crafted",
      description: "Hand-blended by master perfumers"
    },
    {
      icon: <FaRegHeart className="text-amber" />,
      title: "Scent Guarantee",
      description: "28-day fragrance trial"
    },
    {
      icon: <FaHeadset className="text-amber" />,
      title: "Concierge Service",
      description: "Personal scent consultations"
    }
  ];

  return (
    <section className="py-5 bg-satin">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-light mb-3 text-ebony">
            The Essence of Excellence
          </h2>
          <p className="text-muted">
            Crafting timeless olfactory experiences
          </p>
        </div>

        <div className="row g-4 g-lg-5">
          {badges.map((badge, index) => (
            <div key={index} className="col-md-4 col-lg-2">
              <div className="trust-card p-4 text-center h-100 transition-all hover-shadow">
                <div className="icon-wrapper mb-3 mx-auto">{badge.icon}</div>
                <h5 className="h6 fw-normal mb-2">{badge.title}</h5>
                <p className="small text-muted mb-0">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .text-amber {
          color: #b76e79;
        }
        .text-ebony {
          color: #555152;
        }
        .bg-satin {
          background-color: #f9f6f2;
        }
        .trust-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 12px;
          border: 1px solid rgba(183, 110, 121, 0.1);
          transition: all 0.3s ease;
        }
        .hover-shadow:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(183, 110, 121, 0.1);
        }
        .icon-wrapper {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff5f7;
          border-radius: 50%;
          font-size: 1.75rem;
          transition: all 0.3s ease;
        }
        .trust-card:hover .icon-wrapper {
          background: linear-gradient(45deg, #b76e79, #8a4f58);
          color: white !important;
        }
      `}</style>
    </section>
  );
};

export default TrustBadges;