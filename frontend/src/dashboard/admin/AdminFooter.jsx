import React from "react";
import { Link } from "react-router-dom";

function AdminFooter() {
  return (
    <>
      <hr className="mt-5" />
      <footer className="bg-light py-4">
        <div className="container">
          <div className="row text-center text-md-start">
            
            <div className="col-12 col-md-3 mb-4">
              <Link to="/admin-dashboard">
                <img
                  src="/Media/Logo.png"
                  alt="AbhiNik Logo"
                  className="img-fluid mb-3"
                  style={{ maxWidth: "120px" }}
                />
              </Link>
              <p className="text-muted small lh-base">
                © 2025 AbhiNik Lift Services Ltd.
                <br />
                Admin Panel – Internal Use Only
              </p>
            </div>

            <div className="col-12 col-md-3 mb-4">
              <p className="fw-bold mb-2 small">Office Address</p>
              <p className="text-muted small lh-base">
                AbhiNik Lift Services Ltd.
                <br />
                Sector 45, Navi Mumbai,
                <br />
                Maharashtra, India – 400706
              </p>
              <p className="text-muted small mb-0">📞 +91 7xxxxxxxxx2</p>
            </div>

            <div className="col-12 col-md-3 mb-4">
              <p className="fw-bold mb-2 small">Admin Shortcuts</p>
              <ul className="list-unstyled small lh-lg">
                <li>
                  <Link to="/admin-dashboard/contracts">Manage Contracts</Link>
                </li>
                <li>
                  <Link to="/admin-dashboard/servicing">Update Servicing</Link>
                </li>
                <li>
                  <Link to="/admin-dashboard/complaints">View Complaints</Link>
                </li>
              </ul>
            </div>

            <div className="col-12 col-md-3 mb-4">
              <p className="fw-bold mb-2 small">Support & Help</p>
              <ul className="list-unstyled small lh-lg">
                <li>Email Support</li>
              </ul>
            </div>
          </div>

          <div className="text-center text-muted small mt-3">
            For internal technical issues, contact IT at{" "}
            <strong>abhinik.elevator@gmail.com</strong>.
          </div>
        </div>
      </footer>
    </>
  );
}

export default AdminFooter;
