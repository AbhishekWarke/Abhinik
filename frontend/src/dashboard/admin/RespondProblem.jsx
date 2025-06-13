import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";
import "./OverlayMessage.css"; // Make sure this file exists and is styled

function RespondProblem() {
  const [complaints, setComplaints] = useState([]);
  const [responseStatus, setResponseStatus] = useState({});
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/complaints");
        const data = await res.json();
        if (res.ok) {
          setComplaints(data);
        } else {
          console.error("Error fetching complaints:", data);
        }
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
      const res = await fetch(`http://localhost:5000/api/complaints/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seenByAdmin: value === "yes" }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        alert("Error updating complaint: " + errorText);
        return;
      }

      const data = await res.json();

      // Update complaint state with timestamp
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
      alert("An unexpected error occurred.");
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
    <>
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

      <div
        className="container mt-5"
        style={{ fontFamily: "Segoe UI, sans-serif" }}
      >
        <h2 className="fw-bold text-center mb-4 text-primary">
          Complaints Received from Customers
        </h2>

        {complaints.map((complaint, index) => {
          const isEven = index % 2 === 0;
          const files = complaint.files || [];

          const mediaSection = (
            <div
              className="col-md-6 d-flex justify-content-center align-items-center"
              style={{ minHeight: "250px", position: "relative" }}
            >
              {files.length > 0 ? (
                <div className="d-flex flex-wrap gap-3">
                  {files.map((file, i) => (
                    <div
                      key={i}
                      style={{
                        position: "relative",
                        display: "inline-block",
                      }}
                    >
                      <img
                        src={`http://localhost:5000/${file}`}
                        alt="complaint"
                        style={{
                          width: "300px",
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          const preview = document.createElement("img");
                          preview.src = e.currentTarget.src;
                          preview.style.position = "absolute";
                          preview.style.top = "-10px";
                          preview.style.left = "310px";
                          preview.style.maxWidth = "400px";
                          preview.style.maxHeight = "300px";
                          preview.style.objectFit = "contain";
                          preview.style.border = "1px solid #ccc";
                          preview.style.borderRadius = "8px";
                          preview.style.background = "#fff";
                          preview.style.zIndex = 999;
                          preview.className = "image-preview-hover";

                          e.currentTarget.parentNode.appendChild(preview);
                        }}
                        onMouseLeave={(e) => {
                          const existingPreview =
                            e.currentTarget.parentNode.querySelector(
                              ".image-preview-hover"
                            );
                          if (existingPreview) {
                            existingPreview.remove();
                          }
                        }}
                      />
                    </div>
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
            <div
              className="col-md-6 d-flex flex-column justify-content-center"
              style={{ minHeight: "250px" }}
            >
              <h5>
                Customer:{" "}
                <span className="text-primary">{complaint.customerName}</span>
              </h5>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(complaint.createdAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Description:</strong> {complaint.problemDescription}
              </p>

              <div className="mt-3">
                <label className="form-label">Respond to Complaint:</label>
                <select
                  className="form-select w-50"
                  value={responseStatus[complaint._id] || ""}
                  onChange={(e) =>
                    handleResponseChange(complaint._id, e.target.value)
                  }
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                <button
                  onClick={() => handleSubmitResponse(complaint._id)}
                  style={{
                    marginTop: "10px",
                    marginLeft: "10px",
                    padding: "6px 12px",
                    backgroundColor: "#0d6efd",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    width: "150px",
                    fontSize: "14px",
                    transition: "background-color 0.3s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#198754")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#0d6efd")
                  }
                >
                  Submit
                </button>

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
      <AdminFooter />
    </>
  );
}

export default RespondProblem;
