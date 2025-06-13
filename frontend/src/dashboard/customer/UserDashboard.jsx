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
  const [errorMsg, setErrorMsg] = useState(null); // For showing fetch errors

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login");
      } else if (user.emailVerified) {
        setUserEmail(user.email);
      } else {
        navigate("/login"); // Redirect if email not verified
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
          `http://localhost:5000/api/contracts/user?email=${encodeURIComponent(userEmail)}`
        );

        if (res.data && Object.keys(res.data).length > 0) {
          setContract(res.data);
        } else {
          setContract(null); // No contract found
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
  }, [userEmail]);

  return (
    <div>
      <CustomerNavbar />

      <div className="container mt-4">

        {loading && <p>Loading your contract details...</p>}

        {!loading && errorMsg && <p className="text-danger">{errorMsg}</p>}

        {!loading && !errorMsg && !contract && (
          <p>You do not have any active contracts at the moment.</p>
        )}

        {!loading && !errorMsg && contract && (
          <CustomerContract contract={contract} />
        )}
      </div>
      < CustomerFooter />
    </div>
  );
}

export default UserDashboard;
