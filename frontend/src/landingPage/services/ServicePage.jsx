import React from "react";
import Hero from "./Hero";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import { Link } from "react-router-dom";

function ServicePage() {
  return (
    <>
      <Hero />

      <LeftSection
        imageURL="/Media/Services1.jpg"
        productName="Servicing"
        productDescription="Ensure your elevators operate smoothly and efficiently with our comprehensive servicing solutions. Regular inspections and preventive maintenance are key to enhancing the lifespan and performance of your lift systems."
      />

      <RightSection
        imageURL="/Media/Services5.png"
        productName="Breakdown Support"
        productDescription="Unexpected elevator issues? Our expert team provides rapid breakdown assistance to minimize downtime and ensure safety. Available round the clock for urgent support and quick resolutions."
      />

      <LeftSection
        imageURL="/Media/Services3.jpg"
        productName="AMC Contracting of Lift"
        productDescription="Protect your investment with our Annual Maintenance Contracts (AMC). Enjoy peace of mind with regular maintenance, priority service, and extended equipment life at affordable pricing."
      />

      <RightSection
        imageURL="/Media/Services2.jpg"
        productName="Maintenance Services"
        productDescription="Stay ahead of potential issues with our proactive lift maintenance services. From routine checkups to major component care, we ensure your elevators meet the highest safety and reliability standards."
      />

      <LeftSection
        imageURL="/Media/Service.jpg"
        productName="Modernization Services"
        productDescription="Upgrade your aging lift systems with our modernization solutions. Improve performance, energy efficiency, safety, and aesthetics — giving your old elevators a brand-new life."
      />

      {/* FOOTER TEXT */}
      <p className="servicepage-footer-text">
        Want to learn more about our services and innovations? Explore the{" "}
        <Link style={{ textDecoration: "none" }}>
          AbhiNik Services Blog
        </Link>{" "}
        for detailed insights.
      </p>

      {/* =========================
          SERVICE PAGE STYLES
      ========================== */}
      <style>{`
        .servicepage-footer-text {
          font-size: 1.2rem;
          text-align: justify;
          margin: 3rem auto 5rem;
          max-width: 900px;
          color: #444;
        }

        @media (max-width: 576px) {
          .servicepage-footer-text {
            font-size: 1rem;
            padding: 0 1rem;
            line-height: 1.7;
            margin-bottom: 3rem;
          }
        }
      `}</style>
    </>
  );
}

export default ServicePage;
