import React, { useState } from "react";
import { Link } from "react-router-dom";

function CustomerFooter() {
  const [showFAQ, setShowFAQ] = useState(false);

  const faqs = [
    {
      question: "How can I request servicing?",
      answer:
        "Log in to your dashboard and go to 'Request Servicing' under the Quick Links or Account section.",
    },
    {
      question: "Where can I view my past service history?",
      answer:
        "All your previous service records are available in the 'Servicing Record' section.",
    },
    {
      question: "How do I report a problem?",
      answer:
        "Navigate to 'Report a Problem' in the footer or from the dashboard menu.",
    },
  ];

  const handleFAQClick = () => {
    setShowFAQ(true);
  };

  const handleOverlayClick = () => {
    setShowFAQ(false);
  };

  return (
    <>
      <hr style={{ borderTop: "1px solid #d1d5db" }} />
      <footer style={{ backgroundColor: "#f7f7f7", fontSize: "0.92em" }}>
        <div className="container border-top mt-5">
          <div className="row mt-5 footer-row">
            {/* Logo and Copyright */}
            <div className="col-12 col-md-3 mb-4 footer-col">
              <Link to="/user-dashboard">
                <img
                  src="/Media/Logo.png"
                  alt="AbhiNik Logo"
                  className="footer-logo"
                  style={{ width: "50%", maxWidth: "180px" }}
                />
              </Link>
              <p className="text-muted mt-3 footer-text-small">
                © {new Date().getFullYear()}, AbhiNik Lift Services Ltd. <br />
                All rights reserved.
              </p>
            </div>

            {/* Quick Links */}
            <div
              className="col-12 col-md-3 mb-4 footer-col"
              style={{ lineHeight: "1.7" }}
            >
              <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                Quick Links
              </p>
              <Link
                to="/servicing-record"
                className="text-decoration-none d-block"
              >
                Servicing Record
              </Link>
              <Link
                to="/customer/complaints"
                className="text-decoration-none d-block"
              >
                Report a Problem
              </Link>
              <Link
                to="/customer/dos-donts"
                className="text-decoration-none d-block"
              >
                Do's and Don'ts
              </Link>
              <Link
                to="/customer/contact"
                className="text-decoration-none d-block"
              >
                Contact Us
              </Link>
            </div>

            {/* Help & Info */}
            <div
              className="col-12 col-md-3 mb-4 footer-col"
              style={{ lineHeight: "1.7" }}
            >
              <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                Help & Info
              </p>
              <Link
                to="/customer/contact"
                className="d-block text-decoration-none"
              >
                Help Center
              </Link>
              <span
                className="d-block text-decoration-none"
                style={{ cursor: "pointer" }}
                onClick={handleFAQClick}
              >
                FAQs
              </span>
              <Link
                to="/customer/contact"
                className="d-block text-decoration-none"
              >
                Support
              </Link>
            </div>

            {/* Address Info */}
            <div className="col-12 col-md-3 mb-4 footer-col">
              <p className="fw-bold mb-2" style={{ fontSize: "0.9rem" }}>
                Office Address
              </p>
              <p
                className="text-muted"
                style={{ fontSize: "0.9rem", lineHeight: "1.6" }}
              >
                AbhiNik Lift Services Ltd.
                <br />
                2nd Floor, Omega Towers,
                <br />
                Sector 45, Navi Mumbai,
                <br />
                Maharashtra, India – 400706
              </p>
              <p className="text-muted" style={{ fontSize: "0.75rem" }}>
                📞 +91 98765 43210
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-4 text-muted footer-disclaimer">
            <p>
              AbhiNik Lift Services Ltd. provides professional lift maintenance,
              repair, and installation services. You can track all your service
              records and contracts securely on your dashboard.
            </p>
            <p>
              For complaints or queries, email us at{" "}
              <strong>support@abhinik.com</strong>.
            </p>
          </div>

          {/* Policy Links */}
          <div className="footer-policy-links">
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Customer Agreement</a>
          </div>
        </div>

        {/* FAQ Overlay */}
        {showFAQ && (
          <div
            className="faq-overlay"
            onClick={handleOverlayClick}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <div
              className="faq-content"
              style={{
                backgroundColor: "#fff",
                padding: "2rem",
                borderRadius: "10px",
                width: "90%",
                maxWidth: "600px",
                boxShadow: "0 0 15px rgba(0,0,0,0.2)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h5 className="mb-3">Frequently Asked Questions</h5>
              {faqs.map((faq, index) => (
                <div key={index} className="mb-3">
                  <strong>{faq.question}</strong>
                  <p className="text-muted mb-0">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </footer>

      {/* ✅ RESPONSIVE ONLY — NO DESIGN CHANGE */}
      <style>{`
        @media (max-width: 768px) {
          .footer-row {
            text-align: center;
          }

          @media (max-width: 768px) {
  .footer-col {
    text-align: center;
  }

  .footer-logo {
    max-width: 140px;
    width: 100%;
    height: auto;
  }
}


          .footer-logo {
            width: 120px;
          }

          .footer-text-small {
            font-size: 0.8em;
          }

          .footer-disclaimer {
            text-align: center;
            font-size: 0.85em;
            line-height: 1.6;
          }

          .footer-policy-links {
            justify-content: center;
            text-align: center;
          }
        }

        .footer-policy-links {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
          margin-top: 1rem;
          margin-bottom: 1rem;
          font-size: 0.85em;
          color: #6c757d;
        }
      `}</style>
    </>
  );
}

export default CustomerFooter;
