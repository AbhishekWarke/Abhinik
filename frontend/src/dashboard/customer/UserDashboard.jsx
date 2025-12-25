import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import CustomerNavbar from "../customer/CustomerNavbar";
import CustomerContract from "./CustomerContract";
import axios from "axios";
import CustomerFooter from "./CustomerFooter";

function UserDashboard() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login");
      } else if (user.emailVerified) {
        setUserEmail(user.email);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchContract = async () => {
      if (!userEmail) return;

      setLoading(true);
      setErrorMsg(null);

      try {
        const res = await axios.get(
          `${API_URL}/contracts/user?email=${encodeURIComponent(userEmail)}`
        );

        if (res.data && Object.keys(res.data).length > 0) {
          setContract(res.data);
        } else {
          setContract(null);
        }
      } catch (err) {
        console.error("Error fetching contract:", err);
        setErrorMsg("Failed to load contract details. Please try again later.");
        setContract(null);
      } finally {
        setLoading(false);
      }
    };

    fetchContract();
  }, [userEmail, API_URL]);

  return (
    <div className="user-dashboard-wrapper">
      <CustomerNavbar />

      <main className="user-dashboard-content">
        <div className="container mt-4">
          {loading && <p>Loading your contract details...</p>}

          {!loading && errorMsg && (
            <p className="text-danger">{errorMsg}</p>
          )}

          {!loading && !errorMsg && !contract && (
            <p>You do not have any active contracts at the moment.</p>
          )}

          {!loading && !errorMsg && contract && (
            <CustomerContract contract={contract} />
          )}
        </div>
      </main>

      {/* Page-specific footer fix */}
      <style>{`
        .user-dashboard-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .user-dashboard-content {
          flex: 1;
        }
      `}</style>

      <CustomerFooter />
    </div>
  );
}

export default UserDashboard;
