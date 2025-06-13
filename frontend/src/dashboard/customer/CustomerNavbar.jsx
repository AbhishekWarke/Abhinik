import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import { signOut } from "firebase/auth";

function CustomerNavbar() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container-fluid px-4">
        {/* Logo */}
        <Link className="navbar-brand" to="/user-dashboard">
          <img
            src="/Media/Logo.png"
            alt="AbhiNik Logo"
            style={{ height: "25px", width: "auto" }}
          />
        </Link>

        {/* Mobile Toggler */}
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

        {/* Navbar Links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul
            className="navbar-nav mb-2 mb-lg-0"
            style={{ display: "flex", alignItems: "center", gap: "1rem" }}
          >
            <li className="nav-item">
              <Link className="nav-link" to="/servicing-record">
              Servicing Record
              </Link>

            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/customer/complaints">
                Report a Problem
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/customer/dos-donts">
                Do's and Don'ts
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/customer/contact">
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="btn nav-link"
                onClick={handleLogout}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  color: "inherit",
                  cursor: "pointer",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.color = "red")}
                onMouseLeave={(e) => (e.target.style.color = "inherit")}
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

export default CustomerNavbar;
