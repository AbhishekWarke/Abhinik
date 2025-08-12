import React, { useEffect, useState } from "react";
import axios from "axios";
import { deleteContract } from "../../api/contracts";

function CustomerList() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for the two pop-ups: confirmation and success
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [contractToDelete, setContractToDelete] = useState(null);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/contracts");
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

  // Step 1: When delete is clicked, show the custom confirmation dialog
  const handleDeleteRequest = (id) => {
    setContractToDelete(id);
    setShowConfirmDialog(true);
  };

  // Step 2: If user confirms, proceed with deletion
  const handleConfirmDelete = async () => {
    if (!contractToDelete) return;

    try {
      await deleteContract(contractToDelete);
      setContracts((prevContracts) =>
        prevContracts.filter((contract) => contract._id !== contractToDelete)
      );
      
      // Hide confirmation and show success message
      setShowConfirmDialog(false);
      setShowDeleteSuccess(true);
      
      // Reset the contract to delete
      setContractToDelete(null);

      // Hide the success message after 3 seconds
      setTimeout(() => {
        setShowDeleteSuccess(false);
      }, 3000);

    } catch (error) {
      console.error("Failed to delete contract:", error);
      alert("Failed to delete contract. Please try again.");
      setShowConfirmDialog(false); // Hide dialog on error
      setContractToDelete(null);
    }
  };
  
  // Step 3: If user cancels, just close the dialog
  const handleCancelDelete = () => {
      setShowConfirmDialog(false);
      setContractToDelete(null);
  };


  // --- Inline styles for all pop-ups ---
  const styles = {
    popupOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
    },
    popupContent: {
      background: '#fff',
      padding: '2rem',
      borderRadius: '10px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
      textAlign: 'center',
      width: '350px',
    },
    confirmText: {
        fontSize: '18px',
        marginBottom: '1.5rem',
        color: '#333'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem'
    },
    confirmButton: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#dc3545',
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer'
    },
    cancelButton: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#6c757d',
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer'
    },
    successText: { 
        fontSize: '18px', 
        margin: '0 0 1rem 0', 
        color: '#333' 
    },
    brandHeader: {
        fontWeight: '600',
        fontSize: '22px'
    }
  };
  // ------------------------------------

  return (
    <div className="container mt-4 mb-4">
      <h1 className="fs-2 text-center mb-4">Keep a track of your customers.</h1>

      <div
        className="row border-top p-3 text-muted"
        style={{ lineHeight: "1.65", fontSize: "1.05rem" }}
      >
        <div className="col-md-6 p-2">
          <p>
            Abhinik’s contract system offers two types of service agreements:
            Annual Maintenance Contracts (AMC) and Half Yearly Contracts. The
            AMC provides a full year of comprehensive maintenance...
          </p>
        </div>
        <div className="col-md-6 p-2">
          <p>
            Half Yearly Contracts are for shorter terms, typically six months.
            Both contract types include start/end dates and a PDF copy of the
            terms for reference.
          </p>
        </div>
      </div>

      <div className="table-responsive mt-4">
        {loading ? (
          <p className="text-center text-muted">Loading contracts...</p>
        ) : error ? (
          <p className="text-center text-danger">{error}</p>
        ) : contracts.length === 0 ? (
          <p className="text-center text-muted">
            No contracts available. Please add some from the Manage Contract
            page.
          </p>
        ) : (
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Serial No.</th>
                <th>Customer Name</th>
                <th>Email</th>
                <th>Contract Number</th>
                <th>Contract Price</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Contract PDF</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract, index) => (
                <tr key={contract._id}>
                  <td>{index + 1}</td>
                  <td>{contract.customerName}</td>
                  <td>{contract.customerEmail}</td>
                  <td>{contract.contractNumber}</td>
                  <td>₹{contract.contractPrice}</td>
                  <td>{new Date(contract.startDate).toLocaleDateString()}</td>
                  <td>{new Date(contract.endDate).toLocaleDateString()}</td>
                  <td>
                    <a
                      href={`http://localhost:5000/uploads/contracts/${contract.contractPDF}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-primary"
                    >
                      View/Download
                    </a>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteRequest(contract._id)}
                      className="btn btn-sm btn-danger"
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

      {/* Custom Confirmation Dialog */}
      {showConfirmDialog && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupContent}>
            <p style={styles.confirmText}>Are you sure you want to delete this contract?</p>
            <div style={styles.buttonContainer}>
                <button onClick={handleConfirmDelete} style={styles.confirmButton}>Yes, Delete</button>
                <button onClick={handleCancelDelete} style={styles.cancelButton}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Success Pop-up */}
      {showDeleteSuccess && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupContent}>
            <p style={styles.successText}>
                ✅ Contract Deleted Successfully
            </p>
            <h3 style={styles.brandHeader}>
                <span style={{ color: 'red' }}>Abhi</span>
                <span style={{ color: 'blue' }}>Nik</span>
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerList;