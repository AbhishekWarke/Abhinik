import React, { useEffect, useState } from "react";
import CustomerNavbar from "./CustomerNavbar";
import CustomerFooter from "./CustomerFooter";
      
function ServicingRecord() {
  const [contract, setContract] = useState(null);
  const [servicingRecords, setServicingRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showPhotosModal, setShowPhotosModal] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  const userEmail = JSON.parse(localStorage.getItem("user"))?.email;

  useEffect(() => {
    const fetchContract = async () => {
      try {
        if (!userEmail) {
          console.log("User email not found.");
          setLoading(false);
          return;
        }

        const res = await fetch(
          `http://localhost:5000/api/contracts/user?email=${userEmail}`
        );
        const data = await res.json();

        if (data && data.contractNumber) {
          setContract(data);
          await fetchServicings(data.contractNumber);
        } else {
          console.log("No contract found");
        }
      } catch (err) {
        console.error("Error fetching contract:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchServicings = async (contractNumber) => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/servicing/${contractNumber}`
        );
        const data = await res.json();

        const sortedData = data.sort(
          (a, b) => a.servicingNumber - b.servicingNumber
        );

        setServicingRecords(sortedData);
      } catch (err) {
        console.error("Error fetching servicings:", err);
      }
    };

    fetchContract();
  }, [userEmail]);

  // Open modal and show all photos for a servicing record
  const handleViewPhotos = (photos) => {
    if (!photos || photos.length === 0) return;
    setSelectedPhotos(
      photos.map((photo) => `http://localhost:5000/${photo.replace(/\\/g, "/")}`)
    );
    setShowPhotosModal(true);
  };

  // Close photos modal
  const closePhotosModal = () => {
    setShowPhotosModal(false);
    setSelectedPhotos([]);
  };

  return (
    <>
      <CustomerNavbar />
      <div
        className="container py-4"
        style={{ fontFamily: "Segoe UI, sans-serif" }}
      >
        {loading ? (
          <h3 className="text-center">Loading your contract details...</h3>
        ) : contract ? (
          <>
            <h3 className="text-center mb-3 fw-bold text-primary">
              Hello, {contract.customerName}.
            </h3>
            <p className="text-center fs-5 text-secondary">
              According to your contract, you are entitled to{" "}
              {contract.numberOfServices} servicing
              {contract.numberOfServices > 1 ? "s" : ""} within a one-year
              period.
            </p>
            <p className="text-center fs-6 text-muted">
              So far, {servicingRecords.length} servicing
              {servicingRecords.length !== 1 ? "s" : ""} have been completed for
              your lift.
            </p>

            <div className="d-flex flex-wrap justify-content-center gap-4 mt-4">
              {servicingRecords.map((record, index) => {
                const isHovered = hoveredCard === index;

                return (
                  <div
                    key={index}
                    className="card"
                    style={{
                      width: "18rem",
                      boxShadow: isHovered
                        ? "0 12px 20px rgba(0,0,0,0.3)"
                        : "0 4px 8px rgba(0,0,0,0.1)",
                      transition: "all 0.3s ease",
                      transform: isHovered ? "translateY(-8px)" : "translateY(0)",
                      cursor: "pointer",
                      borderRadius: "0.375rem",
                    }}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {record.photos && record.photos.length > 0 && (
                      <img
                        src={`http://localhost:5000/${record.photos[0].replace(
                          /\\/g,
                          "/"
                        )}`}
                        alt="Servicing Photo 1"
                        style={{
                          width: "100%",
                          height: "180px",
                          objectFit: "cover",
                          borderTopLeftRadius: "0.375rem",
                          borderTopRightRadius: "0.375rem",
                          boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                        }}
                      />
                    )}

                    <div className="card-body">
                      <h5 className="card-title">
                        Servicing #{record.servicingNumber}
                      </h5>
                      <p className="card-text text-muted" style={{ fontSize: "0.9rem" }}>
                        {record.remark ? record.remark : "No remarks"}
                      </p>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <strong>Servicing Date:</strong>{" "}
                        {record.servicingDate
                          ? new Date(record.servicingDate).toLocaleDateString()
                          : "Date not available"}
                      </li>
                    </ul>
                    <div
                      className="card-body d-flex justify-content-between gap-2"
                      style={{ flexWrap: "wrap", rowGap: "0.5rem" }}
                    >
                      <a
                        href={`http://localhost:5000/${record.receipt.replace(
                          /\\/g,
                          "/"
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-primary view-receipt-btn"
                        style={{ flex: "1 1 45%", whiteSpace: "nowrap" }}
                      >
                        📄 View Receipt
                      </a>

                      {record.photos && record.photos.length > 0 ? (
                        <button
                          className="btn btn-outline-secondary view-photos-btn"
                          onClick={() => handleViewPhotos(record.photos)}
                          style={{ flex: "1 1 45%", whiteSpace: "nowrap" }}
                        >
                          🖼️ View Photos ({record.photos.length})
                        </button>
                      ) : (
                        <span
                          className="text-muted"
                          style={{ flex: "1 1 45%", fontSize: "0.9rem", alignSelf: "center" }}
                        >
                          No photos available
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Photos Modal */}
            {showPhotosModal && (
              <div
                className="modal fade show d-block"
                tabIndex="-1"
                role="dialog"
                style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                onClick={closePhotosModal}
              >
                <div
                  className="modal-dialog modal-lg modal-dialog-centered"
                  role="document"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Servicing Photos</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={closePhotosModal}
                        aria-label="Close"
                      />
                    </div>
                    <div className="modal-body d-flex flex-wrap gap-3 justify-content-center">
                      {selectedPhotos.map((photoUrl, idx) => (
                        <img
                          key={idx}
                          src={photoUrl}
                          alt={`Servicing Photo ${idx + 1}`}
                          style={{
                            maxHeight: "250px",
                            borderRadius: "0.5rem",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                            objectFit: "cover",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <h3 className="text-center">No contract found for your account.</h3>
        )}
      </div>

      {/* Inline styles for button hover effects */}
      <style>
        {`
          .view-receipt-btn:hover {
            background-color: #007bff !important; /* Bootstrap blue */
            color: white !important;
            border-color: #007bff !important;
          }
          .view-photos-btn:hover {
            background-color: #28a745 !important; /* Bootstrap green */
            color: white !important;
            border-color: #28a745 !important;
          }
        `}
      </style>
      < CustomerFooter />
    </>
  );
}

export default ServicingRecord;
