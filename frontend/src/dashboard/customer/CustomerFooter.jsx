import React, { useState } from "react";
import { Link } from "react-router-dom";

function CustomerFooter() {
  const [showFAQ, setShowFAQ] = useState(false);

  const faqs = [
    {
      question: "How can I request servicing?",
      answer: "Log in to your dashboard and go to 'Request Servicing' under the Quick Links or Account section."
    },
    {
      question: "Where can I view my past service history?",
      answer: "All your previous service records are available in the 'Servicing Record' section."
    },
    {
      question: "How do I report a problem?",
      answer: "Navigate to 'Report a Problem' in the footer or from the dashboard menu."
    }
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
          <div className="row mt-5">
            {/* Logo and Copyright */}
            <div className="col-12 col-md-3 mb-4">
              <Link to="/user-dashboard"><img src="/Media/Logo.png" alt="AbhiNik Logo" style={{ width: "50%" }} /></Link>
              <p className="text-muted mt-3" style={{ fontSize: "0.75em" }}>
                © {new Date().getFullYear()}, AbhiNik Lift Services Ltd. <br />
                All rights reserved.
              </p>
            </div>

            {/* Quick Links */}
            <div className="col-12 col-md-3 mb-4" style={{ lineHeight: "1.7" }}>
              <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>Quick Links</p>
              <Link to="/servicing-record" className="text-decoration-none d-block">Servicing Record</Link>
              <Link to="/customer/complaints" className="text-decoration-none d-block">Report a Problem</Link>
              <Link to="/customer/dos-donts" className="text-decoration-none d-block">Do's and Don'ts</Link>
              <Link to="/customer/contact" className="text-decoration-none d-block">Contact Us</Link>
            </div>

            {/* Help & Info */}
            <div className="col-12 col-md-3 mb-4" style={{ lineHeight: "1.7" }}>
              <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>Help & Info</p>
              <Link to="/customer/contact" className="d-block text-decoration-none">Help Center</Link>
              <span className="d-block text-decoration-none" style={{ cursor: "pointer" }} onClick={handleFAQClick}>FAQs</span>
              <Link to="/customer/contact" className="d-block text-decoration-none">Support</Link>
            </div>

            {/* Address Info */}
           <div className="col-md-3 mb-4">
              <p className="fw-bold mb-2" style={{ fontSize: "0.9rem" }}>Office Address</p>
              <p className="text-muted" style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
                AbhiNik Lift Services Ltd.<br />
                2nd Floor, Omega Towers,<br />
                Sector 45, Navi Mumbai,<br />
                Maharashtra, India – 400706
              </p>
              <p className="text-muted" style={{ fontSize: "0.75rem" }}>
                📞 +91 98765 43210
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-4 text-muted" style={{ fontSize: "0.85em", lineHeight: "1.7" }}>
            <p>
              AbhiNik Lift Services Ltd. provides professional lift maintenance, repair, and installation services.
              You can track all your service records and contracts securely on your dashboard.
            </p>
            <p>
              For complaints or queries, email us at <strong>support@abhinik.com</strong>.
            </p>
          </div>

          {/* Policy Links */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "12px",
              marginTop: "1rem",
              marginBottom: "1rem",
              fontSize: "0.85em",
              color: "#6c757d"
            }}
          >
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
              zIndex: 1000
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
                boxShadow: "0 0 15px rgba(0,0,0,0.2)"
              }}
              onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
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
    </>
  );
}

export default CustomerFooter;
