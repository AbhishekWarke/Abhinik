import { useLocation, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from "./landingPage/ScrollToTop";

import HomePage from './landingPage/home/HomePage';
import SignupPage from './landingPage/signup/SignupPage';
import AboutPage from './landingPage/about/AboutPage';
import ServicePage from './landingPage/services/ServicePage';
import ContactPage from './landingPage/contactUs/ContactPage';
import PricingPage from './landingPage/pricing/PricingPage';
import Navbar from './landingPage/Navbar';
import Footer from './landingPage/Footer';
import LoginSelection from './landingPage/signup/LoginSelection';

import RespondProblem from './dashboard/admin/RespondProblem';
import AdminDashboard from './dashboard/admin/AdminDashboard';
import UserDashboard from './dashboard/customer/UserDashboard';
import ManageContract from './dashboard/admin/ManageContract';
import ServiceRecord from './dashboard/admin/ServiceRecord';
import ServicingRecord from './dashboard/customer/ServicingRecord';  // Adjust path accordingly
import Guidelines from './dashboard/customer/Guidelines';


import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import ReportProblem from './dashboard/customer/ReportProblem';
import ContactUs from './dashboard/customer/ContactUs';


function App() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user && user.emailVerified);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

const hideNavbarFooter = [
  '/login',
  '/signup',
  '/user-dashboard',
  '/admin-dashboard',
  '/admin-dashboard/contracts',
  '/admin-dashboard/servicing',
  '/servicing-record',   // Added here
  '/customer/complaints',
  '/admin-dashboard/complaints',
  '/customer/dos-donts',
  '/customer/contact'
];


  const ProtectedRoute = ({ element, redirectTo }) => {
    if (loading) return <div>Loading...</div>;
    return isAuthenticated ? element : <Navigate to={redirectTo} />;
  };

  return (
    <>
     <ScrollToTop /> 
      {!hideNavbarFooter.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginSelection />} />
        

        {/* Protected Routes */}
        <Route path="/user-dashboard" element={<ProtectedRoute element={<UserDashboard />} redirectTo="/login" />} />
        <Route path="/admin-dashboard" element={<ProtectedRoute element={<AdminDashboard />} redirectTo="/login" />} />
        <Route path="/admin-dashboard/contracts" element={<ProtectedRoute element={<ManageContract />} redirectTo="/login" />} />
        <Route path="/admin-dashboard/servicing" element={<ProtectedRoute element={<ServiceRecord />} redirectTo="/login" />} />
        <Route path="/admin-dashboard/complaints" element={<ProtectedRoute element={<RespondProblem />} redirectTo="/login" />} />
        <Route path="/customer/dos-donts" element={<ProtectedRoute element={<Guidelines />} redirectTo="/login" />} />
        <Route path="/servicing-record" element={<ProtectedRoute element={<ServicingRecord  />} redirectTo="/login" />} />
        <Route path="/customer/complaints" element={<ProtectedRoute element={<ReportProblem />} redirectTo="/login" />} />
        <Route path="/customer/contact" element={<ProtectedRoute element={<ContactUs/>} redirectTo="/login" />} />


      </Routes>
      {!hideNavbarFooter.includes(location.pathname) && <Footer />}
    </>
  );
}

export default App;
