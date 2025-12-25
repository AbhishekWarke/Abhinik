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
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid px-3 px-md-4">
        
        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/admin-dashboard">
          <img
            src="/Media/Logo.png"
            alt="Abhinik Logo"
            className="img-fluid"
            style={{ height: "25px" }}
          />
        </Link>

        {/* Mobile Toggle */}
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

        {/* Menu */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mt-3 mt-lg-0 text-center text-lg-start">
            
            <li className="nav-item">
              <Link className="nav-link px-lg-3" to="/admin-dashboard/contracts">
                Manage Contracts
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link px-lg-3" to="/admin-dashboard/servicing">
                Update Servicing
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link px-lg-3" to="/admin-dashboard/complaints">
                View Complaints
              </Link>
            </li>

            {/* Divider for mobile */}
            <li className="nav-item d-lg-none">
              <hr className="my-2" />
            </li>

            {/* Logout */}
            <li className="nav-item">
              <button
                onClick={handleLogout}
                onMouseEnter={() => setHoverLogout(true)}
                onMouseLeave={() => setHoverLogout(false)}
                className="nav-link btn btn-link px-lg-3"
                style={{
                  color: hoverLogout ? "red" : "black",
                  textDecoration: "none",
                }}
              >
                Logout
              </button>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
