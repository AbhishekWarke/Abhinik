import React from "react";
import { Link } from "react-router-dom";

function LeftSection({ imageURL, productName, productDescription }) {
  return (
    <>
      <section className="feature-section">
        <div className="container">
          <div className="row align-items-center">
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

            {/* TEXT */}
            <div className="col-lg-6 feature-text-col">
              <h2 className="feature-title">{productName}</h2>

              <p className="feature-description">{productDescription}</p>

              <div className="feature-actions">
                <Link to="/contact" className="feature-link primary">
                  Contact Us →
                </Link>

                <Link to="/contact" className="feature-link secondary">
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          LEFT SECTION STYLES
      ========================== */}
      <style>{`
  .feature-section {
    padding: 4.5rem 0;
    background-color: #ffffff;
  }

  .feature-image-card {
    background: #f8f9fa;
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
    padding-left: 2.5rem;
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
  }

  .feature-link.primary {
    color: #0d6efd;
  }

  .feature-link.secondary {
    color: #374151;
  }

  .feature-link:hover {
    text-decoration: underline;
  }

  /* =========================
     MOBILE RESPONSIVE FIX
  ========================== */
  @media (max-width: 576px) {
    .feature-section {
      padding: 3rem 0;
    }

    /* 🔴 IMPORTANT FIX */
    .feature-text-col {
      padding: 0 1.25rem;   /* ✅ prevents text sticking to edges */
      margin-top: 2rem;
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

export default LeftSection;
