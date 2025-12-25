import React, { useState } from "react";
import { Link } from "react-router-dom";

function Footer() {
  const [showPopup, setShowPopup] = useState(false);

  const handleProtectedClick = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const closePopup = () => setShowPopup(false);

  return (
    <>
      <footer className="modern-footer">
        <div className="container footer-inner">
          <div className="row footer-main">
            {/* BRAND */}
            <div className="col-lg-3 footer-col">
              <Link to="/">
                <img
                  src="/Media/Logo.png"
                  alt="AbhiNik Logo"
                  className="footer-logo"
                />
              </Link>
              <p className="footer-copy">
                © 2025 AbhiNik Lift Services Ltd.<br />
                All rights reserved.
              </p>
            </div>

            {/* COMPANY */}
            <div className="col-lg-3 footer-col">
              <h6 className="footer-heading">Company</h6>
              <Link to="/about">About Us</Link>
              <Link to="/services">Services</Link>
              <Link to="/pricing">Pricing</Link>
            </div>

            {/* SUPPORT */}
            <div className="col-lg-3 footer-col">
              <h6 className="footer-heading">Support</h6>
              <Link to="/contact">Contact</Link>
              <Link to="/login">Service Portal</Link>
              <Link to="/login">Help Center</Link>
              <Link to="/login">Complaints</Link>
            </div>

            {/* ACCOUNT */}
            <div className="col-lg-3 footer-col">
              <h6 className="footer-heading">Account</h6>
              <a href="#" onClick={handleProtectedClick}>
                View Service Records
              </a>
              <a href="#" onClick={handleProtectedClick}>
                Service Requests
              </a>
              <Link to="/signup">Manage Account</Link>
            </div>
          </div>

          {/* BOTTOM TEXT */}
          <div className="footer-bottom">
            <p>
              AbhiNik Lift Services Ltd. is a trusted provider of elevator
              installation, maintenance, and repair solutions. All contracts,
              servicing records, and support requests are securely managed
              through our platform.
            </p>
            <p>
              For feedback or support, contact{" "}
              <strong>abhinik.elevator@gmail.com</strong>
            </p>
          </div>
        </div>

        {/* POPUP MODAL (UNCHANGED LOGIC) */}
        {showPopup && (
          <div className="footer-popup-overlay">
            <div className="footer-popup">
              <p>
                To access AbhiNik’s services, please log in or sign up first.
              </p>
              <img
                src="/Media/Logo.png"
                alt="AbhiNik Logo"
                className="popup-logo"
              />
              <button onClick={closePopup}>Close</button>
            </div>
          </div>
        )}
      </footer>

      {/* =========================
          MODERN FOOTER STYLES
      ========================== */}
      <style>{`
        .modern-footer {
          background-color: #f8f9fa;
          padding: 4rem 0 2rem;
          border-top: 1px solid #e5e7eb;
        }

        .footer-inner {
          max-width: 1200px;
        }

        .footer-main {
          margin-bottom: 3rem;
        }

        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .footer-logo {
          width: 130px;
          margin-bottom: 1rem;
        }

        .footer-copy {
          font-size: 0.85rem;
          color: #6b7280;
          line-height: 1.6;
        }

        .footer-heading {
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 0.6rem;
          color: #111827;
        }

        .footer-col a {
          font-size: 0.9rem;
          color: #374151;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-col a:hover {
          color: #0d6efd;
        }

        .footer-bottom {
          border-top: 1px solid #e5e7eb;
          padding-top: 1.5rem;
          font-size: 0.9rem;
          color: #6b7280;
          line-height: 1.7;
          text-align: center;
        }

        /* =========================
           POPUP MODAL STYLES
        ========================== */
        .footer-popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .footer-popup {
          background: #fff;
          padding: 2rem;
          border-radius: 12px;
          width: 90%;
          max-width: 420px;
          text-align: center;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }

        .footer-popup p {
          font-size: 1rem;
          margin-bottom: 1.2rem;
        }

        .popup-logo {
          width: 140px;
          margin-bottom: 1.2rem;
        }

        .footer-popup button {
          background-color: #111827;
          color: #fff;
          border: none;
          padding: 0.5rem 1.2rem;
          border-radius: 6px;
          cursor: pointer;
        }

        /* =========================
           MOBILE RESPONSIVE
        ========================== */
        @media (max-width: 576px) {
          .footer-main {
            text-align: center;
          }

          .footer-col {
            margin-bottom: 2rem;
            align-items: center;
          }

          .footer-bottom {
            text-align: justify;
            font-size: 0.85rem;
          }
        }
      `}</style>
    </>
  );
}

export default Footer;
