import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <>
      <section className="modern-hero">
        {/* Background Video */}
        <video
          className="hero-bg-video"
          src="/Media/LiftFinall.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Overlay */}
        <div className="hero-overlay"></div>

        {/* Content */}
        <div className="hero-content container">
          <span className="hero-badge">Trusted Elevator Services</span>

          <h1 className="hero-title">
            Reliable Elevator <br /> Servicing & Safety
          </h1>

          <p className="hero-subtitle">
            End-to-end lift servicing, breakdown support, AMC contracts, and
            real-time service tracking — built for safety, transparency, and
            peace of mind.
          </p>

          <div className="hero-actions">
            <Link to="/login">
              <button className="btn btn-primary hero-btn-primary">
                Get Started
              </button>
            </Link>

            <Link to="/services" className="hero-btn-secondary">
              Explore Services →
            </Link>
          </div>
        </div>
      </section>

      {/* =========================
          MODERN HERO STYLES
      ========================== */}
      <style>{`
        .modern-hero {
          position: relative;
          width: 100%;
          height: 90vh;
          min-height: 520px;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: #000;
        }

        .hero-bg-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            rgba(0, 0, 0, 0.65),
            rgba(0, 0, 0, 0.65)
          );
          z-index: 2;
        }

        .hero-content {
          position: relative;
          z-index: 3;
          color: #fff;
          max-width: 800px;
        }

        .hero-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.15);
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.85rem;
          margin-bottom: 1rem;
          backdrop-filter: blur(4px);
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 1rem;
        }

        .hero-subtitle {
          font-size: 1.15rem;
          font-weight: 300;
          line-height: 1.7;
          color: #e5e7eb;
          margin-bottom: 2rem;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .hero-btn-primary {
          padding: 0.75rem 2rem;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 30px;
        }

        .hero-btn-secondary {
          color: #fff;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 500;
          border-bottom: 1px solid rgba(255,255,255,0.6);
        }

        .hero-btn-secondary:hover {
          color: #0d6efd;
          border-color: #0d6efd;
        }

        /* =========================
           MOBILE RESPONSIVE
        ========================== */
        @media (max-width: 576px) {
          .modern-hero {
            height: auto;
            min-height: 100vh;
            padding: 3rem 0;
          }

          .hero-title {
            font-size: 2rem;
          }

          .hero-subtitle {
            font-size: 1rem;
          }

          .hero-actions {
            flex-direction: column;
            align-items: flex-start;
          }

          .hero-btn-primary {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
}

export default Hero;
