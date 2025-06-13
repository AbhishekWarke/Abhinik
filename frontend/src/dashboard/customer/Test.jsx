import React, { useState, useRef, useEffect } from "react";
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

      setShowSuccessOverlay(true);

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
                {/* All existing input fields remain unchanged */}

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

        {/* ✅ Success Overlay */}
        {showSuccessOverlay && (
          <div className="overlay-backdrop">
            <div className="overlay-box" ref={overlayRef}>
              <button
                className="overlay-close"
                onClick={() => setShowSuccessOverlay(false)}
              >
                ×
              </button>
              <h4>✅ Contract saved successfully!</h4>
              <p>You may now proceed with another entry or check dashboard.</p>
            </div>
          </div>
        )}
      </section>
      <AdminFooter />
    </>
  );
}

export default ManageContract;
