import React from "react";
import AdminNavbar from "./AdminNavbar";
import CustomerList from "./CustomerList";
import AdminFooter from "./AdminFooter";

function AdminDashboard() {
  return (
    <div className="d-flex flex-column min-vh-100">
      
      {/* Navbar */}
      <AdminNavbar />

      {/* Page Content */}
      <main className="flex-grow-1">
        <div className="admin-dashboard-container">
          <CustomerList />
        </div>
      </main>

      {/* Footer */}
      <AdminFooter />
    </div>
  );
}

export default AdminDashboard;
