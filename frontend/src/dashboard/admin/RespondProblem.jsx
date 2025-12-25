import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";
import "./OverlayMessage.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const FILES_BASE = import.meta.env.VITE_FILES_URL || "http://localhost:5000";

function RespondProblem() {
  const [complaints, setComplaints] = useState([]);
  const [responseStatus, setResponseStatus] = useState({});
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await fetch(`${API_BASE}/complaints`);
        const data = await res.json();
        if (res.ok) setComplaints(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchComplaints();
  }, []);

  const handleResponseChange = (id, value) => {
    setResponseStatus((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmitResponse = async (id) => {
    const value = responseStatus[id];
    if (!value) return alert("Please select Yes/No before submitting.");

    try {
      const res = await fetch(`${API_BASE}/complaints/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seenByAdmin: value === "yes" }),
      });

      if (!res.ok) return;

      setComplaints((prev) =>
        prev.map((c) =>
          c._id === id
            ? {
                ...c,
                seenByAdmin: value === "yes",
                respondedAt: new Date().toISOString(),
              }
            : c
        )
      );

      setShowOverlay(true);
      setTimeout(() => setShowOverlay(false), 3000);
    } catch (error) {
      console.error("Error updating complaint:", error);
    }
  };

  const formatDate = (isoDate) => {
    const d = new Date(isoDate);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <AdminNavbar />

      {showOverlay && (
        <div className="overlay-message">
          <h4>
            <span style={{ color: "red" }}>Abhi</span>
            <span style={{ color: "blue" }}>Nik</span>
          </h4>
          <p>Respond Sent Successfully!</p>
        </div>
      )}

      <main className="flex-grow-1">
        <div className="container mt-4">
          <h2 className="fw-bold text-center mb-4 text-primary">
            Complaints Received from Customers
          </h2>

          {complaints.map((complaint, index) => {
            const isEven = index % 2 === 0;
            const files = complaint.files || [];

            const mediaSection = (
              <div className="col-12 col-md-6 d-flex justify-content-center mb-3 mb-md-0">
                {files.length > 0 ? (
                  <div className="d-flex flex-wrap gap-3 justify-content-center">
                    {files.map((file, i) => (
                      <img
                        key={i}
                        src={`${FILES_BASE}/${file}`}
                        alt="complaint"
                        className="img-fluid"
                        style={{
                          maxWidth: "100%",
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          cursor: "pointer",
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted fst-italic">
                    No images uploaded by customer.
                  </p>
                )}
              </div>
            );

            const descSection = (
              <div className="col-12 col-md-6">
                <h5>
                  Customer:{" "}
                  <span className="text-primary">
                    {complaint.customerName}
                  </span>
                </h5>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(complaint.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <strong>Description:</strong>{" "}
                  {complaint.problemDescription}
                </p>

                <div className="mt-3">
                  <label className="form-label">Respond to Complaint:</label>

                  <div className="d-flex flex-column flex-sm-row gap-2">
                    <select
                      className="form-select"
                      value={responseStatus[complaint._id] || ""}
                      onChange={(e) =>
                        handleResponseChange(
                          complaint._id,
                          e.target.value
                        )
                      }
                    >
                      <option value="">Select...</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>

                    <button
                      onClick={() =>
                        handleSubmitResponse(complaint._id)
                      }
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "#0d6efd",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        minWidth: "120px",
                        fontSize: "14px",
                      }}
                    >
                      Submit
                    </button>
                  </div>

                  {complaint.respondedAt && (
                    <p
                      style={{
                        marginTop: "12px",
                        color: "gray",
                        fontStyle: "italic",
                      }}
                    >
                      You once responded to this complaint on{" "}
                      {formatDate(complaint.respondedAt)}
                    </p>
                  )}
                </div>
              </div>
            );

            return (
              <div className="row align-items-center mb-5" key={complaint._id}>
                {isEven ? (
                  <>
                    {descSection}
                    {mediaSection}
                  </>
                ) : (
                  <>
                    {mediaSection}
                    {descSection}
                  </>
                )}
                <hr className="my-4" />
              </div>
            );
          })}
        </div>
      </main>

      <AdminFooter />
    </div>
  );
}

export default RespondProblem;
