import React, { useState } from "react";
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
      const formData = {
        ...contractDetails,
        numberOfServices: parseInt(contractDetails.numberOfServices, 10),
        contractPrice: parseFloat(contractDetails.contractPrice),
      };

      await uploadContract(formData);
      setShowSuccess(true);

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

      <section className="manage-contract section py-4">
        {/* Header */}
        <div className="text-center mb-4 px-3">
          <h2 className="fw-bold">
            <span style={{ color: "red" }}>Abhi</span>
            <span style={{ color: "blue" }}>Nik</span> CUSTOMER CONTRACT
          </h2>
        </div>

        {/* Instructions */}
        <div className="container mb-4">
          <div className="row text-muted small">
            <div className="col-12 col-md-6 mb-2">
              • Ensure all details are correct before submitting.
            </div>
            <div className="col-12 col-md-6 mb-2">
              • Uploaded contracts will be permanently visible to customers.
            </div>
            <div className="col-12 col-md-6 mb-2">
              • Double-check start/end dates and PDF upload.
            </div>
            <div className="col-12 col-md-6 mb-2">
              • If mistaken, delete the contract and re-upload correctly.
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="container">
          <div className="inner mx-auto">
            <h2 className="text-center mb-2">Add Contract Details</h2>
            <p className="text-center text-muted mb-4">
              Enter contract information to keep everything tracked and updated.
            </p>

            <form className="form" onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <input
                    type="text"
                    name="customerName"
                    placeholder="Customer Name"
                    value={contractDetails.customerName}
                    onChange={handleChange}
                  />
                  {formErrors.customerName && (
                    <small className="text-danger">{formErrors.customerName}</small>
                  )}
                </div>

                <div className="col-12 col-md-6">
                  <input
                    type="email"
                    name="customerEmail"
                    placeholder="Customer Email"
                    value={contractDetails.customerEmail}
                    onChange={handleChange}
                  />
                  {formErrors.customerEmail && (
                    <small className="text-danger">{formErrors.customerEmail}</small>
                  )}
                </div>

                <div className="col-12 col-md-6">
                  <input
                    type="text"
                    name="contractNumber"
                    placeholder="Contract Number"
                    value={contractDetails.contractNumber}
                    onChange={handleChange}
                  />
                  {formErrors.contractNumber && (
                    <small className="text-danger">{formErrors.contractNumber}</small>
                  )}
                </div>

                <div className="col-12 col-md-6">
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
                    <small className="text-danger">{formErrors.contractType}</small>
                  )}
                </div>

                <div className="col-12 col-md-6">
                  <label className="input-label">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={contractDetails.startDate}
                    onChange={handleChange}
                  />
                  {formErrors.startDate && (
                    <small className="text-danger">{formErrors.startDate}</small>
                  )}
                </div>

                <div className="col-12 col-md-6">
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

                <div className="col-12 col-md-6">
                  <label>Number of Servicing</label>
                  <input
                    type="number"
                    name="numberOfServices"
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

                <div className="col-12 col-md-6">
                  <label>Price</label>
                  <input
                    type="number"
                    name="contractPrice"
                    placeholder="Enter Price"
                    value={contractDetails.contractPrice}
                    onChange={handleChange}
                  />
                  {formErrors.price && (
                    <small className="text-danger">{formErrors.price}</small>
                  )}
                </div>

                {/* PDF Upload */}
                <div className="col-12 text-center">
                  <label className="mb-2 d-block">Upload Contract PDF</label>
                  <div className="custom-file-input-wrapper flex-wrap">
                    <label
                      htmlFor="contractPDF"
                      className="custom-file-label"
                    >
                      Choose PDF
                    </label>
                    <input
                      type="file"
                      id="contractPDF"
                      accept=".pdf"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                    <span id="file-name" className="file-name-text">
                      No file chosen
                    </span>
                  </div>
                  {formErrors.contractPDF && (
                    <small className="text-danger d-block mt-1">
                      {formErrors.contractPDF}
                    </small>
                  )}
                </div>

                {/* Submit */}
                <div className="col-12">
                  <button className="btn submit-button w-100" type="submit">
                    Save Contract
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Footer note */}
        <div className="text-center mt-5 px-3">
          <p className="text-muted small">
            Want to view all added contracts? Head over to your{" "}
            <strong>Admin Dashboard</strong>.
          </p>
        </div>
      </section>

      {/* Success Popup */}
      {showSuccess && (
        <div
          className="contract-popup-overlay"
          onClick={() => setShowSuccess(false)}
        >
          <div
            className="contract-popup-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontWeight: 600, fontSize: "20px" }}>
              <span style={{ color: "red" }}>Abhi</span>
              <span style={{ color: "blue" }}>Nik</span>
            </h3>
            <p className="mt-2">✅ Contract Added Successfully</p>
          </div>
        </div>
      )}

      <AdminFooter />
    </>
  );
}

export default ManageContract;
