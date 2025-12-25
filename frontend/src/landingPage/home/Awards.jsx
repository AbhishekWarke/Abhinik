import React from "react";

function Awards() {
  return (
    <>
      <section className="awards-section">
        <div className="container">
          <div className="row align-items-center">
            {/* IMAGE */}
            <div className="col-lg-6 awards-image-col">
              <div className="awards-image-wrapper">
                <img
                  src="/Media/award3.jpg"
                  alt="Trusted Elevator Services"
                  className="awards-image"
                />
              </div>
            </div>

            {/* CONTENT */}
            <div className="col-lg-6 awards-text-col">
              <span className="awards-badge">Trusted Across Central India</span>

              <h2 className="awards-title">
                One of the Most Reliable <br /> Elevator Service Providers
              </h2>

              <p className="awards-description">
                With hundreds of satisfied clients across Central India, AbhiNik
                has built a reputation for delivering dependable elevator
                solutions — from installations to long-term maintenance and
                emergency support.
              </p>

              <div className="row awards-features">
                <div className="col-sm-6">
                  <ul>
                    <li>Residential Lift Installations</li>
                    <li>Annual Maintenance Contracts</li>
                    <li>Emergency Repair Services</li>
                  </ul>
                </div>

                <div className="col-sm-6">
                  <ul>
                    <li>Modernization & Upgrades</li>
                    <li>Safety Inspections</li>
                    <li>24×7 Customer Support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          MODERN AWARDS STYLES
      ========================== */}
      <style>{`
        .awards-section {
          padding: 4rem 0;
          background-color: #f8f9fa;
        }

        .awards-image-wrapper {
          background: #fff;
          padding: 1.5rem;
          border-radius: 20px;
          box-shadow: 0 15px 30px rgba(0,0,0,0.08);
          display: inline-block;
        }

        .awards-image {
          width: 100%;
          max-width: 380px;
          border-radius: 18px;
          object-fit: cover;
        }

        .awards-badge {
          display: inline-block;
          background-color: #e8f0fe;
          color: #0d6efd;
          font-size: 0.85rem;
          padding: 6px 14px;
          border-radius: 20px;
          margin-bottom: 1rem;
          font-weight: 500;
        }

        .awards-title {
          font-size: 2.2rem;
          font-weight: 700;
          color: #212529;
          margin-bottom: 1rem;
          line-height: 1.3;
        }

        .awards-description {
          font-size: 1.05rem;
          line-height: 1.7;
          color: #555;
          margin-bottom: 2rem;
        }

        .awards-features ul {
          list-style: none;
          padding-left: 0;
        }

        .awards-features li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.75rem;
          font-size: 0.95rem;
          color: #333;
        }

        .awards-features li::before {
          content: "✔";
          position: absolute;
          left: 0;
          color: #198754;
          font-size: 0.9rem;
        }

        /* =========================
           MOBILE RESPONSIVE
        ========================== */
        @media (max-width: 576px) {
          .awards-section {
            padding: 3rem 0;
          }

          .awards-image-wrapper {
            margin-bottom: 2rem;
          }

          .awards-title {
            font-size: 1.6rem;
          }

          .awards-description {
            font-size: 1rem;
          }

          .awards-text-col {
            text-align: left;
          }
        }
      `}</style>
    </>
  );
}

export default Awards;
