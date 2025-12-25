import React from "react";
import { Link } from "react-router-dom";

function Stats() {
  return (
    <>
      <section className="stats-section">
        <div className="container">
          <div className="row align-items-center">
            {/* LEFT CONTENT */}
            <div className="col-lg-7 stats-content">
              <span className="stats-badge">Why Choose AbhiNik</span>

              <h2 className="stats-title">
                Reliable Elevator Solutions <br /> Built on Trust & Safety
              </h2>

              <div className="stats-features">
                <div className="stats-feature">
                  <h5>Customer-First Approach</h5>
                  <p>
                    Thousands of satisfied clients rely on AbhiNik for seamless
                    elevator maintenance, installation, and dependable support
                    services across residential and commercial buildings.
                  </p>
                </div>

                <div className="stats-feature">
                  <h5>Transparent & Reliable</h5>
                  <p>
                    No hidden charges, no surprises. We deliver honest pricing,
                    clear communication, and on-time service — exactly what
                    modern infrastructure demands.
                  </p>
                </div>

                <div className="stats-feature">
                  <h5>Complete Lift Ecosystem</h5>
                  <p>
                    From installation and AMC contracts to servicing records and
                    complaint resolution — manage your entire lift lifecycle on
                    one trusted platform.
                  </p>
                </div>

                <div className="stats-feature">
                  <h5>Safety Is Our Priority</h5>
                  <p>
                    Regular inspections, real-time updates, and trained
                    engineers ensure every lift operates safely, efficiently,
                    and without compromise.
                  </p>
                </div>
              </div>

              <Link to="/services" className="stats-link">
                Explore Our Services →
              </Link>
            </div>

            {/* RIGHT IMAGE */}
            <div className="col-lg-5 text-center">
              {/* ✅ SAME BACKGROUND STYLE AS AWARDS */}
              <div className="stats-image-card">
                <img
                  src="/Media/EL2.jpg"
                  alt="AbhiNik Elevator Ecosystem"
                  className="stats-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          UPDATED STATS STYLES
      ========================== */}
      <style>{`
        .stats-section {
          padding: 4.5rem 0;
          background-color: #ffffff;
        }

        .stats-badge {
          display: inline-block;
          background-color: #e8f0fe;
          color: #0d6efd;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
          margin-bottom: 1rem;
        }

        .stats-title {
          font-size: 2.3rem;
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 2.5rem;
          color: #212529;
        }

        .stats-features {
          display: flex;
          flex-direction: column;
          gap: 1.6rem;
        }

        .stats-feature h5 {
          font-size: 1.05rem;
          font-weight: 600;
          margin-bottom: 0.4rem;
          color: #111;
        }

        .stats-feature p {
          font-size: 0.95rem;
          line-height: 1.7;
          color: #555;
          text-align: justify;
        }

        .stats-link {
          display: inline-block;
          margin-top: 2.5rem;
          text-decoration: none;
          font-weight: 600;
          color: #0d6efd;
        }

        .stats-link:hover {
          text-decoration: underline;
        }

        /* ✅ SAME CARD BACKGROUND AS AWARDS */
        .stats-image-card {
          background: #f8f9fa;
          padding: 1.5rem;
          border-radius: 22px;
          box-shadow: 0 15px 30px rgba(0,0,0,0.08);
          display: inline-block;
        }

        .stats-image {
          width: 100%;
          max-width: 360px;
          border-radius: 20px;
          object-fit: cover;
        }

        /* =========================
           MOBILE RESPONSIVE
        ========================== */
        @media (max-width: 576px) {
          .stats-title {
            font-size: 1.7rem;
          }

          .stats-section {
            padding: 3rem 0;
          }

          .stats-image-card {
            margin-top: 2.5rem;
          }
        }
      `}</style>
    </>
  );
}

export default Stats;
