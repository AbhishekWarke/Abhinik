import React from 'react';
import AdminNavbar from './AdminNavbar';
import CustomerList from './CustomerList';
import AdminFooter from "./AdminFooter";

function AdminDashboard() {
  return (
    <>
    <AdminNavbar />
    <div className="admin-dashboard-container">
      <CustomerList/>
    </div>
      <AdminFooter />
    </>
  );
}

export default AdminDashboard;
