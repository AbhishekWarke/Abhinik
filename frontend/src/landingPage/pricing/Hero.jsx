import React from "react";

function Hero() {
  return (
    <>
      <section className="pricing-hero">
        <div className="container pricing-hero-inner">
          <span className="pricing-badge">Transparent Pricing</span>

          <h1 className="pricing-title">
            Simple, Fair & Reliable <br /> Pricing for Elevator Services
          </h1>

          <p className="pricing-description">
            At AbhiNik, pricing is designed to be transparent and flexible.
            Whether it’s call-based servicing, emergency support, or annual
            maintenance contracts (AMC), you receive competitive rates with no
            hidden costs — ensuring safety, reliability, and peace of mind.
          </p>
        </div>
      </section>

      {/* =========================
          PRICING HERO STYLES
      ========================== */}
      <style>{`
        .pricing-hero {
          background: linear-gradient(
            135deg,
            #f8f9fa 0%,
            #ffffff 100%
          );
          padding: 4.5rem 0 3.5rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .pricing-hero-inner {
          max-width: 820px;
          text-align: center;
        }

        .pricing-badge {
          display: inline-block;
          background-color: #e8f0fe;
          color: #0d6efd;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
          margin-bottom: 1.2rem;
        }

        .pricing-title {
          font-size: 2.6rem;
          font-weight: 700;
          line-height: 1.25;
          margin-bottom: 1.5rem;
          color: #212529;
        }

        .pricing-description {
          font-size: 1.15rem;
          line-height: 1.75;
          color: #555;
          text-align: justify;
        }

        /* =========================
           MOBILE RESPONSIVE
        ========================== */
        @media (max-width: 576px) {
          .pricing-hero {
            padding: 3.5rem 0 2.5rem;
          }

          .pricing-title {
            font-size: 1.8rem;
          }

          .pricing-description {
            font-size: 1rem;
            line-height: 1.6;
          }
        }
      `}</style>
    </>
  );
}

export default Hero;
