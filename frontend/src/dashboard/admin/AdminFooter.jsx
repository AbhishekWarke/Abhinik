import React from "react";
import { Link } from "react-router-dom";

function AdminFooter() {
  return (
    <>
      <hr style={{ borderTop: "1px solid #dee2e6", marginTop: "2rem" }} />
      <footer style={{ backgroundColor: "#f8f9fa", padding: "2rem 0" }}>
        <div className="container">
          <div className="row">
            {/* Logo and Info */}
            <div className="col-md-3 mb-4">
              <Link to="/admin-dashboard">
                <img
                  src="/Media/Logo.png"
                  alt="AbhiNik Logo"
                  style={{ width: "43%", minWidth: "80px" }}
                />
              </Link>
              <p
                className="text-muted mt-3"
                style={{ fontSize: "0.75rem", lineHeight: "1.6" }}
              >
                © 2025 AbhiNik Lift Services Ltd.
                <br />
                Admin Panel – Internal Use Only
              </p>
            </div>

            {/* Address and Contact */}
            <div className="col-md-3 mb-4">
              <p className="fw-bold mb-2" style={{ fontSize: "0.9rem" }}>
                Office Address
              </p>
              <p
                className="text-muted"
                style={{ fontSize: "0.75rem", lineHeight: "1.6" }}
              >
                AbhiNik Lift Services Ltd.
                <br />
                Sector 45, Navi Mumbai,
                <br />
                Maharashtra, India – 400706
              </p>
              <p className="text-muted" style={{ fontSize: "0.75rem" }}>
                📞 +91 7xxxxxxxxx2
              </p>
            </div>

            {/* Admin Navigation */}
            <div className="col-md-3 mb-4">
              <p className="fw-bold mb-2" style={{ fontSize: "0.9rem" }}>
                Admin Shortcuts
              </p>
              <ul
                className="list-unstyled"
                style={{ lineHeight: "1.8", fontSize: "0.85rem" }}
              >
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

            {/* Support Info */}
            <div className="col-md-3 mb-4">
              <p className="fw-bold mb-2" style={{ fontSize: "0.9rem" }}>
                Support & Help
              </p>
              <ul
                className="list-unstyled"
                style={{ lineHeight: "1.8", fontSize: "0.85rem" }}
              >
                <li>
                  Email Support
                </li>
              </ul>
            </div>
          </div>

          <div
            className="text-center text-muted mt-3"
            style={{ fontSize: "0.75rem" }}
          >
            For internal technical issues, contact IT at{" "}
            <strong>abhinik.elevator@gmail.com</strong>.
          </div>
        </div>
      </footer>
    </>
  );
}

export default AdminFooter;
