import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="container border-bottom mb-5 hero-solutions-container">
      <div className="row mt-5 p-3 text-center">
        <h1
          className="mt-5 hero-solutions-title"
          style={{ color: "#424242", fontSize: "2.9em" }} // desktop unchanged
        >
          AbhiNik Solutions
        </h1>

        <h5 className="text-muted mt-2 hero-solutions-subtitle">
          Reliable, modern, and customer-focused elevator services
        </h5>

        <p className="mt-2 mb-5 hero-solutions-link">
          Explore our{" "}
          <Link style={{ textDecoration: "none" }}>
            services and offerings →
          </Link>
        </p>
      </div>

      {/* ✅ RESPONSIVE ONLY (NO JUSTIFY) */}
      <style>{`
        @media (max-width: 576px) {
          .hero-solutions-title {
            font-size: 2rem !important; /* scale heading */
            margin-top: 2.5rem !important;
          }

          .hero-solutions-subtitle {
            font-size: 1rem;
          }

          .hero-solutions-link {
            margin-bottom: 2.5rem !important;
            font-size: 0.95rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Hero;
