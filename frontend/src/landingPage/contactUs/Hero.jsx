import React from "react";

function Hero() {
  return (
    <div
      className="hero-container"
      style={{
        position: "relative",
        width: "100%",
        height: "250px",  // Reduced height from 400px to 250px
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
          fontSize: "2.5rem",
          fontWeight: "300",  // Changed to lighter font weight
        }}
      >
        Contact us for more information & assistance
      </div>
    </div>
  );
}

export default Hero;
