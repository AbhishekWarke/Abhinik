import React, { useEffect, useState } from "react";
import CustomerNavbar from "./CustomerNavbar";
import CustomerFooter from "./CustomerFooter";

const API_URL = import.meta.env.VITE_API_URL;
const FILES_URL = import.meta.env.VITE_FILES_URL;

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
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_URL}/contracts/user?email=${userEmail}`);
        const data = await res.json();

        if (data && data.contractNumber) {
          setContract(data);
          await fetchServicings(data.contractNumber);
        }
      } catch (err) {
        console.error("Error fetching contract:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchServicings = async (contractNumber) => {
      try {
        const res = await fetch(`${API_URL}/servicing/${contractNumber}`);
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

  const handleViewPhotos = (photos) => {
    if (!photos || photos.length === 0) return;
    setSelectedPhotos(
      photos.map((photo) => `${FILES_URL}/${photo.replace(/\\/g, "/")}`)
    );
    setShowPhotosModal(true);
  };

  const closePhotosModal = () => {
    setShowPhotosModal(false);
    setSelectedPhotos([]);
  };

  return (
    <div className="servicing-page-wrapper">
      <CustomerNavbar />

      <main className="servicing-page-content">
        <div
          className="container py-4 servicing-container"
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
                {servicingRecords.length !== 1 ? "s" : ""} have been completed
                for your lift.
              </p>

              <div className="d-flex flex-wrap justify-content-center gap-4 mt-4">
                {servicingRecords.map((record, index) => {
                  const isHovered = hoveredCard === index;

                  return (
                    <div
                      key={index}
                      className="card servicing-card"
                      style={{
                        width: "18rem",
                        boxShadow: isHovered
                          ? "0 12px 20px rgba(0,0,0,0.3)"
                          : "0 4px 8px rgba(0,0,0,0.1)",
                        transition: "all 0.3s ease",
                        transform: isHovered
                          ? "translateY(-8px)"
                          : "translateY(0)",
                        cursor: "pointer",
                        borderRadius: "0.375rem",
                      }}
                      onMouseEnter={() => setHoveredCard(index)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      {record.photos && record.photos.length > 0 && (
                        <img
                          src={`${FILES_URL}/${record.photos[0].replace(
                            /\\/g,
                            "/"
                          )}`}
                          alt="Servicing"
                          className="servicing-image"
                        />
                      )}

                      <div className="card-body">
                        <h5 className="card-title">
                          Servicing #{record.servicingNumber}
                        </h5>
                        <p className="card-text text-muted servicing-remark">
                          {record.remark || "No remarks"}
                        </p>
                      </div>

                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                          <strong>Servicing Date:</strong>{" "}
                          {record.servicingDate
                            ? new Date(
                                record.servicingDate
                              ).toLocaleDateString()
                            : "Date not available"}
                        </li>
                      </ul>

                      <div className="card-body d-flex justify-content-between gap-2 flex-wrap">
                        <a
                          href={`${FILES_URL}/${record.receipt.replace(
                            /\\/g,
                            "/"
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline-primary view-receipt-btn"
                        >
                          📄 View Receipt
                        </a>

                        {record.photos && record.photos.length > 0 ? (
                          <button
                            className="btn btn-outline-secondary view-photos-btn"
                            onClick={() =>
                              handleViewPhotos(record.photos)
                            }
                          >
                            🖼️ View Photos ({record.photos.length})
                          </button>
                        ) : (
                          <span className="text-muted no-photo-text">
                            No photos available
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {showPhotosModal && (
                <div
                  className="modal fade show d-block"
                  style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                  onClick={closePhotosModal}
                >
                  <div
                    className="modal-dialog modal-lg modal-dialog-centered"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Servicing Photos</h5>
                        <button
                          className="btn-close"
                          onClick={closePhotosModal}
                        />
                      </div>

                      <div className="modal-body d-flex flex-wrap gap-3 justify-content-center">
                        {selectedPhotos.map((photoUrl, idx) => (
                          <img
                            key={idx}
                            src={photoUrl}
                            alt="Servicing"
                            className="modal-photo"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <h3 className="text-center">
              No contract found for your account.
            </h3>
          )}
        </div>
      </main>

      <style>{`
        .servicing-page-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .servicing-page-content {
          flex: 1;
        }

        .servicing-container {
          max-width: 1200px;
        }

        .servicing-image {
          width: 100%;
          height: 180px;
          object-fit: cover;
          border-top-left-radius: 0.375rem;
          border-top-right-radius: 0.375rem;
          box-shadow: 0 0 5px rgba(0,0,0,0.1);
        }

        .servicing-remark {
          font-size: 0.9rem;
        }

        .no-photo-text {
          font-size: 0.9rem;
          align-self: center;
        }

        .modal-photo {
          max-height: 250px;
          border-radius: 0.5rem;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
          object-fit: cover;
        }

        .view-receipt-btn:hover {
          background-color: #007bff !important;
          color: white !important;
          border-color: #007bff !important;
        }

        .view-photos-btn:hover {
          background-color: #28a745 !important;
          color: white !important;
          border-color: #28a745 !important;
        }

        @media (max-width: 576px) {
          .servicing-card {
            width: 100% !important;
          }
        }

        @media (min-width: 577px) and (max-width: 991px) {
          .servicing-card {
            width: 16rem !important;
          }
        }

        @media (min-width: 1200px) {
          .servicing-card {
            width: 18rem;
          }
        }
      `}</style>

      <CustomerFooter />
    </div>
  );
}

export default ServicingRecord;
