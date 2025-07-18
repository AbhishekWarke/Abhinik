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
      <hr style={{ borderTop: "1px solid #d1d5db" }} /> {/* light gray line */}
      <footer style={{ backgroundColor: "#f7f7f7" }}> {/* slight gray */}
        <div className="container border-top mt-5">
          <div className="row mt-5">
            <div className="col-3">
              <Link to="/">
                <img src="/Media/Logo.png" alt="AbhiNik Logo" style={{ width: "50%" }} />
              </Link>
              <p className="text-muted mt-3" style={{ fontSize: "0.8em" }}>
                © 2025, AbhiNik Lift Services Ltd. <br />
                All rights reserved.
              </p>
            </div>

            <div className="col-3" style={{ lineHeight: "1.8" }}>
              <p style={{ fontSize: "1.25rem", fontWeight: "bold" }}>Company</p>
              <Link to="/about">About Us</Link><br />
              <Link to="/services">Services</Link><br />
              <Link to="/pricing">Pricing</Link><br />
            </div>

            <div className="col-3" style={{ lineHeight: "1.8" }}>
              <p style={{ fontSize: "1.25rem", fontWeight: "bold" }}>Support</p>
              <Link to="/contact">Contact</Link><br />
              <Link to="/login">Service Portal</Link><br />
              <Link to="/login">Help Center</Link><br />
              <Link to="/login">Complaints</Link><br />
            </div>

            <div className="col-3" style={{ lineHeight: "1.8" }}>
              <p style={{ fontSize: "1.25rem", fontWeight: "bold" }}>Account</p>
              <a href="#" onClick={handleProtectedClick}>View Service Records</a><br />
              <a href="#" onClick={handleProtectedClick}>Service Requests</a><br />
              <Link to="/signup">Manage Account</Link><br />
            </div>
          </div>

          <div className="mt-5 text-muted" style={{ fontSize: "0.9em", lineHeight: "1.8" }}>
            <p>
              AbhiNik Lift Services Ltd. is a leading provider of lift maintenance, repair, and installation services.
              Our registered office is located in [City, Country]. All service contracts and records are available
              through our platform.
            </p>

            <p>
              For complaints, issues, or feedback, please reach out to <strong> abhinik.elevator@gmail.com </strong>
            </p>
          </div>
        </div>

        {/* Popup Modal */}
        {showPopup && (
          <div style={{
            position: "fixed",
            top: 0, left: 0,
            width: "100%", height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 9999
          }}>
            <div style={{
              backgroundColor: "#fff",
              padding: "2rem",
              borderRadius: "10px",
              width: "90%", maxWidth: "500px",
              textAlign: "center",
              boxShadow: "0px 0px 10px rgba(0,0,0,0.2)"
            }}>
              <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem" }}>
                To access AbhiNik’s services, please log in or sign up first.
              </p>
              <img
                src="/Media/Logo.png"
                alt="AbhiNik Logo"
                style={{ width: "150px", marginTop: "10px" }}
              />
              <button onClick={closePopup} style={{
                marginTop: "1.5rem",
                backgroundColor: "#424242",
                color: "#fff",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}>
                Close
              </button>
            </div>
          </div>
        )}
      </footer>
    </>
  );
}

export default Footer;
