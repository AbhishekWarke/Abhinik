import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="container border-bottom mb-5">
      <div className="row mt-5 p-3 text-center">
        <h1 className="mt-5" style={{ color: "#424242", fontSize: "2.9em" }}>
          AbhiNik Solutions
        </h1>
        <h5 className="text-muted mt-2">
          Reliable, modern, and customer-focused elevator services
        </h5>
        <p className="mt-2 mb-5">
          Explore our{" "}
          <Link style={{ textDecoration: "none" }}>
            services and offerings →
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Hero;
