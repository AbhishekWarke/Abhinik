import React from "react";
import { Link } from "react-router-dom";



function Footer() {
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
              <Link to="/signup">Manage Account</Link><br />
              <Link to="/login">View Service Records</Link><br />
              <Link to="/signup">Service Requests</Link><br />
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
      </footer>
    </>
  );
}

export default Footer;
