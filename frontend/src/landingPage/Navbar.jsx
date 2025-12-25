import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg custom-navbar"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <div className="container-fluid px-3">
          {/* Logo */}
          <Link className="navbar-brand" to="/">
            <img
              src="/Media/Logo.png"
              alt="AbhiNik Logo"
              className="navbar-logo"
            />
          </Link>

          {/* Toggler */}
          <button
            className="navbar-toggler custom-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Links */}
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/about">About Us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/services">Services</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/pricing">Pricing</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact Us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* ✅ UI FIXES ONLY */}
      <style>{`
        .navbar-logo {
          height: 26px;
          width: auto;
        }

        .custom-navbar {
          border-bottom: 1px solid #e5e7eb;
        }

        .custom-toggler {
          border: none;
          padding: 6px 8px;
        }

        .custom-toggler:focus {
          box-shadow: none;
        }

        /* MOBILE FIX */
        @media (max-width: 576px) {
          .custom-navbar {
            padding: 0.4rem 0;
          }

          .navbar-logo {
            height: 24px;
          }

          .navbar-nav {
            text-align: center;
            padding-top: 1rem;
          }

          .nav-link {
            padding: 0.6rem 0;
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
}

export default Navbar;
