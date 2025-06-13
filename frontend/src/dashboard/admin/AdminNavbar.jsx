// AdminNavbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import { signOut } from "firebase/auth";

function AdminNavbar() {
  const [hoverLogout, setHoverLogout] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div className="container-fluid px-4">
        <Link className="navbar-brand" to="/admin-dashboard">
          <img
            src="/Media/Logo.png"
            alt="Abhinik Logo"
            style={{ height: "25px", width: "auto" }}
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/admin-dashboard/contracts">
                Manage Contracts
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin-dashboard/servicing">
                Update Servicing
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin-dashboard/complaints">
                View Complaints
              </Link>
            </li>
            <li className="nav-item">
              <button
                onClick={handleLogout}
                onMouseEnter={() => setHoverLogout(true)}
                onMouseLeave={() => setHoverLogout(false)}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  margin: 0,
                  cursor: "pointer",
                }}
              >
                <span
                  className="nav-link"
                  style={{
                    color: hoverLogout ? "red" : "black",
                    fontWeight: "normal",
                    fontFamily: "inherit",
                  }}
                >
                  Logout
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
