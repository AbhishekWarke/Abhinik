import React from "react";
import { Link } from "react-router-dom";

function RightSection({
  productName,
  productDescription,
  imageURL,
}) {
  return (
    <>
      <section className="feature-section feature-section-reverse">
        <div className="container">
          <div className="row align-items-center">
            {/* TEXT */}
            <div className="col-lg-6 feature-text-col">
              <h2 className="feature-title">{productName}</h2>

              <p className="feature-description">
                {productDescription}
              </p>

              <div className="feature-actions">
                <Link to="/contact" className="feature-link primary">
                  Learn More →
                </Link>
              </div>
            </div>

            {/* IMAGE */}
            <div className="col-lg-6 feature-image-col">
              <div className="feature-image-card">
                <img
                  src={imageURL}
                  alt={productName}
                  className="feature-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          RIGHT SECTION STYLES
      ========================== */}
      <style>{`
        .feature-section {
          padding: 4.5rem 0;
          background-color: #ffffff;
        }

        .feature-section-reverse {
          background-color: #f9fafb;
        }

        .feature-image-card {
          background: #ffffff;
          padding: 1.5rem;
          border-radius: 22px;
          box-shadow: 0 15px 30px rgba(0,0,0,0.08);
          display: inline-block;
        }

        .feature-image {
          width: 100%;
          max-width: 420px;
          border-radius: 20px;
          object-fit: cover;
        }

        .feature-text-col {
          padding-right: 2.5rem;
        }

        .feature-title {
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 1.4rem;
          color: #212529;
        }

        .feature-description {
          font-size: 1.1rem;
          font-weight: 300;
          line-height: 1.8;
          color: #555;
          text-align: justify;
          margin-bottom: 2rem;
        }

        .feature-actions {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .feature-link {
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          color: #0d6efd;
        }

        .feature-link:hover {
          text-decoration: underline;
        }

        /* =========================
           MOBILE RESPONSIVE
        ========================== */
        @media (max-width: 576px) {
          .feature-section {
            padding: 3rem 0;
          }

          .feature-text-col {
            padding-right: 0;
            order: 2;
            margin-top: 2rem;
          }

          .feature-image-col {
            order: 1;
          }

          .feature-title {
            font-size: 1.6rem;
          }

          .feature-description {
            font-size: 1rem;
            line-height: 1.7;
          }

          .feature-actions {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.8rem;
          }
        }
      `}</style>
    </>
  );
}

export default RightSection;
