import React, { useEffect, useState } from "react";
import axios from "axios";
import { deleteContract } from "../../api/contracts";

const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const FILES_BASE =
  import.meta.env.VITE_FILES_URL || "http://localhost:5000/uploads";

function CustomerList() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [contractToDelete, setContractToDelete] = useState(null);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE}/contracts`);
        setContracts(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching contracts:", error);
        setError("Failed to load contracts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, []);

  const handleDeleteRequest = (id) => {
    setContractToDelete(id);
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!contractToDelete) return;

    try {
      await deleteContract(contractToDelete);
      setContracts((prevContracts) =>
        prevContracts.filter(
          (contract) => contract._id !== contractToDelete
        )
      );
      setShowConfirmDialog(false);
      setShowDeleteSuccess(true);
      setContractToDelete(null);
      setTimeout(() => setShowDeleteSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to delete contract:", error);
      alert("Failed to delete contract. Please try again.");
      setShowConfirmDialog(false);
      setContractToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
    setContractToDelete(null);
  };

  // Inline popup styles (made responsive)
  const styles = {
    popupOverlay: {
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
      padding: "1rem",
    },
    popupContent: {
      background: "#fff",
      padding: "1.5rem",
      borderRadius: "10px",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
      textAlign: "center",
      width: "100%",
      maxWidth: "360px",
    },
    confirmText: {
      fontSize: "1rem",
      marginBottom: "1.5rem",
      color: "#333",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "1rem",
      flexWrap: "wrap",
    },
    confirmButton: {
      padding: "10px 20px",
      border: "none",
      borderRadius: "5px",
      backgroundColor: "#dc3545",
      color: "white",
      fontSize: "16px",
      cursor: "pointer",
    },
    cancelButton: {
      padding: "10px 20px",
      border: "none",
      borderRadius: "5px",
      backgroundColor: "#6c757d",
      color: "white",
      fontSize: "16px",
      cursor: "pointer",
    },
    successText: {
      fontSize: "1.1rem",
      marginBottom: "1rem",
      color: "#333",
    },
    brandHeader: {
      fontWeight: "600",
      fontSize: "22px",
    },
  };

  return (
    <div className="container my-4">
      <h1 className="fs-3 text-center mb-4">
        Keep a track of your customers
      </h1>

      {/* Intro Section */}
      <div className="row border-top pt-3 text-muted small">
        <div className="col-12 col-md-6 mb-3">
          <p>
            Abhinik’s contract system offers two types of service agreements:
            Annual Maintenance Contracts (AMC) and Half Yearly Contracts.
          </p>
        </div>
        <div className="col-12 col-md-6 mb-3">
          <p>
            Both contract types include start/end dates and a PDF copy of the
            terms for reference.
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive mt-4">
        {loading ? (
          <p className="text-center text-muted">
            Loading contracts...
          </p>
        ) : error ? (
          <p className="text-center text-danger">{error}</p>
        ) : contracts.length === 0 ? (
          <p className="text-center text-muted">
            No contracts available. Please add some from the Manage Contract
            page.
          </p>
        ) : (
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr className="small">
                <th>#</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Contract No</th>
                <th>Price</th>
                <th>Start</th>
                <th>End</th>
                <th>PDF</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="small">
              {contracts.map((contract, index) => (
                <tr key={contract._id}>
                  <td>{index + 1}</td>
                  <td>{contract.customerName}</td>
                  <td>{contract.customerEmail}</td>
                  <td>{contract.contractNumber}</td>
                  <td>₹{contract.contractPrice}</td>
                  <td>
                    {new Date(contract.startDate).toLocaleDateString()}
                  </td>
                  <td>
                    {new Date(contract.endDate).toLocaleDateString()}
                  </td>
                  <td>
                    <a
                      href={`${FILES_BASE}/contracts/${contract.contractPDF}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-primary w-100"
                    >
                      View
                    </a>
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        handleDeleteRequest(contract._id)
                      }
                      className="btn btn-sm btn-danger w-100"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupContent}>
            <p style={styles.confirmText}>
              Are you sure you want to delete this contract?
            </p>
            <div style={styles.buttonContainer}>
              <button
                onClick={handleConfirmDelete}
                style={styles.confirmButton}
              >
                Yes, Delete
              </button>
              <button
                onClick={handleCancelDelete}
                style={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showDeleteSuccess && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupContent}>
            <p style={styles.successText}>
              ✅ Contract Deleted Successfully
            </p>
            <h3 style={styles.brandHeader}>
              <span style={{ color: "red" }}>Abhi</span>
              <span style={{ color: "blue" }}>Nik</span>
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerList;
