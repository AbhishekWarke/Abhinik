import React from "react";

function Hero() {
  return (
    <div
      className="hero-container"
      style={{
        position: "relative",
        width: "100%",
        height: "250px", // unchanged
        backgroundImage: "url('/Media/Contactus.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="hero-text"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "2.5rem", // desktop unchanged
          fontWeight: "300",
          textAlign: "center",
          padding: "0 1rem", // ✅ prevents edge overflow on mobile
        }}
      >
        Contact us for more information & assistance
      </div>

      {/* ✅ MOBILE-ONLY FIX */}
      <style>{`
        @media (max-width: 576px) {
          .hero-text {
            font-size: 1.4rem; /* 🔴 explicit mobile fix */
            line-height: 1.4;
          }
        }
      `}</style>
    </div>
  );
}

export default Hero;
