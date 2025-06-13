import React, { useState, useEffect } from "react";
import { uploadContract } from "../../api/contracts";
import "./ManageContract.css";
import AdminNavbar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";

function ManageContract() {
  const [contractDetails, setContractDetails] = useState({
    customerName: "",
    customerEmail: "",
    contractNumber: "",
    startDate: "",
    endDate: "",
    contractType: "",
    numberOfServices: "",
    contractPrice: "",
    contractPDF: null,
  });

  const [formErrors, setFormErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => {
      if (showSuccess) setShowSuccess(false);
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [showSuccess]);

  const handleChange = (e) => {
    setContractDetails({
      ...contractDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setContractDetails({
      ...contractDetails,
      contractPDF: file,
    });
    document.getElementById("file-name").textContent =
      file?.name || "No file chosen";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    if (!contractDetails.customerName.trim())
      errors.customerName = "Name is required";
    if (!contractDetails.customerEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      errors.customerEmail = "Invalid email";
    if (!contractDetails.contractNumber.trim())
      errors.contractNumber = "Contract number is required";
    if (!contractDetails.contractType)
      errors.contractType = "Please select a contract type";
    if (!contractDetails.startDate) errors.startDate = "Start date is required";
    if (!contractDetails.endDate) errors.endDate = "End date is required";
    if (
      !contractDetails.numberOfServices ||
      contractDetails.numberOfServices <= 0
    )
      errors.numberOfServices = "Enter a valid number";
    if (
      !contractDetails.contractPrice ||
      parseFloat(contractDetails.contractPrice) <= 0
    )
      errors.price = "Enter a valid price";
    if (!contractDetails.contractPDF)
      errors.contractPDF = "Upload a contract PDF";

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      const submissionData = {
        ...contractDetails,
        numberOfServices: parseInt(contractDetails.numberOfServices, 10),
        contractPrice: parseFloat(contractDetails.contractPrice),
      };

      await uploadContract(submissionData);
      setShowSuccess(true); // ✅ Show overlay instead of alert

      setContractDetails({
        customerName: "",
        customerEmail: "",
        contractNumber: "",
        startDate: "",
        endDate: "",
        contractType: "",
        numberOfServices: "",
        contractPrice: "",
        contractPDF: null,
      });

      setFormErrors({});
      document.getElementById("file-name").textContent = "No file chosen";
    } catch (error) {
      console.error("Error uploading contract:", error);
      alert("Failed to save contract. Please try again.");
    }
  };

  return (
    <>
      <AdminNavbar />
      <section className="manage-contract section">
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-4">
            <span style={{ color: "red" }}>Abhi</span>
            <span style={{ color: "blue" }}>Nik</span> CUSTOMER CONTRACT
          </h2>
        </div>

        <div className="mb-4 px-4">
          <div className="row gx-5">
            <div className="col-md-6 mb-3 text-muted">
              • Ensure all details are correct before submitting.
            </div>
            <div className="col-md-6 mb-3 text-muted">
              • Uploaded contracts will be stored permanently and visible to
              customers.
            </div>
            <div className="col-md-6 mb-3 text-muted">
              • Double-check start/end dates and PDF upload before proceeding.
            </div>
            <div className="col-md-6 mb-3 text-muted">
              • If you realize a mistake after submission, delete the contract
              from the dashboard and re-upload it correctly.
            </div>
          </div>
        </div>

        <div className="container">
          <div className="inner">
            <h2 className="text-center mt-2">Add Contract Details</h2>
            <p>
              Enter contract information to keep everything tracked and updated.
            </p>

            <form className="form" onSubmit={handleSubmit}>
              <div className="row">
                <div className="form-group col-md-6">
                  <input
                    type="text"
                    name="customerName"
                    placeholder="Customer Name"
                    value={contractDetails.customerName}
                    onChange={handleChange}
                  />
                  {formErrors.customerName && (
                    <small className="text-danger">
                      {formErrors.customerName}
                    </small>
                  )}
                </div>

                <div className="form-group col-md-6">
                  <input
                    type="email"
                    name="customerEmail"
                    placeholder="Customer Email"
                    value={contractDetails.customerEmail}
                    onChange={handleChange}
                  />
                  {formErrors.customerEmail && (
                    <small className="text-danger">
                      {formErrors.customerEmail}
                    </small>
                  )}
                </div>

                <div className="form-group col-md-6">
                  <input
                    type="text"
                    name="contractNumber"
                    placeholder="Contract Number"
                    value={contractDetails.contractNumber}
                    onChange={handleChange}
                  />
                  {formErrors.contractNumber && (
                    <small className="text-danger">
                      {formErrors.contractNumber}
                    </small>
                  )}
                </div>

                <div className="form-group col-md-6">
                  <select
                    name="contractType"
                    value={contractDetails.contractType}
                    onChange={handleChange}
                  >
                    <option value="">Select Contract Type</option>
                    <option value="AMC">AMC</option>
                    <option value="Half-Yearly">Half-Yearly</option>
                  </select>
                  {formErrors.contractType && (
                    <small className="text-danger">
                      {formErrors.contractType}
                    </small>
                  )}
                </div>

                <div className="form-group col-md-6">
                  <label className="input-label">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={contractDetails.startDate}
                    onChange={handleChange}
                  />
                  {formErrors.startDate && (
                    <small className="text-danger">
                      {formErrors.startDate}
                    </small>
                  )}
                </div>

                <div className="form-group col-md-6">
                  <label className="input-label">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={contractDetails.endDate}
                    onChange={handleChange}
                  />
                  {formErrors.endDate && (
                    <small className="text-danger">{formErrors.endDate}</small>
                  )}
                </div>

                <div className="form-group col-md-6">
                  <label htmlFor="numberOfServices">Number of Servicing</label>
                  <input
                    type="number"
                    id="numberOfServices"
                    name="numberOfServices"
                    className="form-control"
                    placeholder="Enter No. of Servicing"
                    value={contractDetails.numberOfServices}
                    onChange={handleChange}
                  />
                  {formErrors.numberOfServices && (
                    <small className="text-danger">
                      {formErrors.numberOfServices}
                    </small>
                  )}
                </div>

                <div className="form-group col-md-6">
                  <label htmlFor="contractPrice">Price</label>
                  <input
                    type="number"
                    id="contractPrice"
                    name="contractPrice"
                    className="form-control"
                    placeholder="Enter Price"
                    value={contractDetails.contractPrice}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                  />
                  {formErrors.price && (
                    <small className="text-danger">{formErrors.price}</small>
                  )}
                </div>

                <div className="form-group col-12 d-flex justify-content-center">
                  <div>
                    <label
                      htmlFor="contractPDF"
                      style={{
                        display: "block",
                        textAlign: "center",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Upload Contract PDF
                    </label>
                    <div
                      className="custom-file-input-wrapper"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <label
                        htmlFor="contractPDF"
                        className="custom-file-label"
                        style={{ cursor: "pointer" }}
                      >
                        Choose PDF
                      </label>
                      <input
                        type="file"
                        id="contractPDF"
                        name="contractPDF"
                        accept=".pdf"
                        className="hidden-file-input"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                      />
                      <span id="file-name" className="file-name-text">
                        No file chosen
                      </span>
                    </div>
                    {formErrors.contractPDF && (
                      <small
                        className="text-danger"
                        style={{ display: "block", textAlign: "center" }}
                      >
                        {formErrors.contractPDF}
                      </small>
                    )}
                  </div>
                </div>

                <div className="form-group col-12">
                  <button className="btn submit-button" type="submit">
                    Save Contract
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="text-center mt-5">
          <p className="text-muted">
            Want to view all added contracts? Head over to your{" "}
            <strong>Admin Dashboard</strong> to see a summary of customer
            contracts.
          </p>
        </div>
      </section>

      {/* ✅ Overlay Message */}
      {showSuccess && (
        <div
          className="success-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
          onClick={() => setShowSuccess(false)}
        >
          <div
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0,0,0,0.2)",
              textAlign: "center",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowSuccess(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "15px",
                background: "transparent",
                border: "none",
                fontSize: "1.5rem",
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
             ✅ Contract Added Successfully
            </p>
          </div>
        </div>
      )}

      <AdminFooter />
    </>
  );
}

export default ManageContract;
