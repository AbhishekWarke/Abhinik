import React, { useState, useRef, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import { uploadServicingRecord } from "../../api/servicing";
import AdminFooter from "./AdminFooter";

const ServiceRecord = () => {
  const [searchInput, setSearchInput] = useState("");
  const [contract, setContract] = useState(null);
  const [error, setError] = useState("");
  const [servicingData, setServicingData] = useState({
    servicingNumber: "",
    servicingDate: "",
    remark: "",
    receipt: null,
    photos: [],
  });

  const [servicingRecords, setServicingRecords] = useState([]);

  // Overlay State
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const overlayRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target)) {
        setShowSuccessOverlay(false);
      }
    };
    if (showSuccessOverlay) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSuccessOverlay]);

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/contracts");
      const allContracts = response.data;

      const foundContract = allContracts.find(
        (c) =>
          c.contractNumber === searchInput.trim() ||
          c.customerName.toLowerCase() === searchInput.trim().toLowerCase()
      );

      if (foundContract) {
        setContract(foundContract);
        setError("");

        const recordResponse = await axios.get(
          `http://localhost:5000/api/servicing/${foundContract.contractNumber}`
        );
        setServicingRecords(recordResponse.data);
      } else {
        setContract(null);
        setServicingRecords([]);
        setError(
          "No such customer found. Try another contract number or customer name."
        );
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching contract data.");
      setServicingRecords([]);
    }
  };

  const handleInputChange = (e) => {
    setServicingData({ ...servicingData, [e.target.name]: e.target.value });
  };

  const handleReceiptChange = (e) => {
    setServicingData({ ...servicingData, receipt: e.target.files[0] });
  };

  const handlePhotosChange = (e) => {
    setServicingData({
      ...servicingData,
      photos: Array.from(e.target.files),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!servicingData.receipt) {
      alert("Service receipt is required.");
      return;
    }

    const formData = new FormData();
    formData.append("contractNumber", contract.contractNumber);
    formData.append("servicingNumber", servicingData.servicingNumber);
    formData.append("servicingDate", servicingData.servicingDate);
    formData.append("remark", servicingData.remark);
    formData.append("receipt", servicingData.receipt);
    servicingData.photos.forEach((photo) => {
      formData.append("photos", photo);
    });

    try {
      await uploadServicingRecord(formData);
      setServicingData({
        servicingNumber: "",
        servicingDate: "",
        remark: "",
        receipt: null,
        photos: [],
      });
      setShowSuccessOverlay(true); // Show overlay
    } catch (error) {
      console.error(error);
      alert("Failed to save servicing record. Check console for details.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminNavbar />
      <div style={{ flex: 1 }}>
        <h2 style={{ textAlign: "center", fontWeight: "300", marginTop: "20px" }}>
          Service Record Management
        </h2>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
          <input
            type="text"
            placeholder="Enter Contract Number or Customer Name"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            style={{ padding: "10px", width: "400px", marginRight: "10px" }}
          />
          <button
            onClick={handleSearch}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "200px",
            }}
          >
            Search
          </button>
        </div>

        {error && (
          <p style={{ color: "red", textAlign: "center", marginTop: "20px" }}>{error}</p>
        )}

        {contract && (
          <div
            style={{
              maxWidth: "800px",
              margin: "40px auto",
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <h3 style={{ textAlign: "center", fontWeight: "400" }}>Contract Summary</h3>
            <p><strong>Customer:</strong> {contract.customerName}</p>
            <p><strong>Contract Number:</strong> {contract.contractNumber}</p>
            <p><strong>Type:</strong> {contract.contractType}</p>
            <p><strong>Start Date:</strong> {new Date(contract.startDate).toLocaleDateString()}</p>
            <p><strong>End Date:</strong> {new Date(contract.endDate).toLocaleDateString()}</p>
            <p><strong>Number of Services:</strong> {contract.numberOfServices}</p>
            <p><strong>Contract Price:</strong> ₹{contract.contractPrice || "N/A"}</p>

            <hr style={{ margin: "20px 0" }} />
            <h4 style={{ marginBottom: "10px" }}>Servicing Records:</h4>
            {servicingRecords.length === 0 ? (
              <p style={{ fontStyle: "italic" }}>No record / No servicing done yet</p>
            ) : (
              <ul>
                {[...servicingRecords]
                  .sort((a, b) => a.servicingNumber - b.servicingNumber)
                  .map((record) => (
                    <li key={record._id} style={{ marginBottom: "15px" }}>
                      <strong>Servicing Number: {record.servicingNumber}</strong> -{" "}
                      {new Date(record.servicingDate).toLocaleDateString()}
                      <br />
                      Remark: {record.remark}
                      <br />
                      <a
                        href={`http://localhost:5000/${record.receipt}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Receipt
                      </a>
                    </li>
                  ))}
              </ul>
            )}

            <hr style={{ margin: "20px 0" }} />
            <h4>Add New Servicing Record</h4>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "10px" }}>
                <label>Servicing Number:</label><br />
                <input
                  type="text"
                  name="servicingNumber"
                  value={servicingData.servicingNumber}
                  onChange={handleInputChange}
                  style={{ width: "100%", padding: "8px" }}
                  required
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label>Servicing Date:</label><br />
                <input
                  type="date"
                  name="servicingDate"
                  value={servicingData.servicingDate}
                  onChange={handleInputChange}
                  style={{ width: "100%", padding: "8px" }}
                  required
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label>Remark:</label><br />
                <textarea
                  name="remark"
                  value={servicingData.remark}
                  onChange={handleInputChange}
                  style={{ width: "100%", padding: "8px" }}
                  rows={3}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label>Upload Service Receipt (PDF):</label><br />
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleReceiptChange}
                  required
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label>Upload Additional Photos (optional):</label><br />
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotosChange}
                />
              </div>
              <button
                type="submit"
                style={{
                  padding: "10px 20px",
                  backgroundColor: "green",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Save Servicing Record
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Success Overlay */}
      {showSuccessOverlay && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            ref={overlayRef}
            style={{
              backgroundColor: "#fff",
              padding: "30px 40px",
              borderRadius: "15px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              textAlign: "center",
              minWidth: "300px",
              position: "relative",
            }}
          >
            <button
              onClick={() => setShowSuccessOverlay(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "15px",
                background: "none",
                border: "none",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              &times;
            </button>
            <h3 style={{ fontWeight: "600", marginBottom: "10px", fontSize: "20px" }}>
              <span style={{ color: "red" }}>Abhi</span>
              <span style={{ color: "blue" }}>Nik</span>
            </h3>
            <p style={{ fontSize: "16px", margin: 0 }}>
              Servicing record saved successfully!
            </p>
          </div>
        </div>
      )}
      <AdminFooter />
    </div>
  );
};

export default ServiceRecord;
