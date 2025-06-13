import React, { useEffect, useState } from "react";
import CustomerNavbar from "./CustomerNavbar";
import CustomerFooter from "./CustomerFooter";

function ReportProblem() {
  const [problemText, setProblemText] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [submitMessage, setSubmitMessage] = useState("");
  const [allComplaints, setAllComplaints] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      }
    } catch (err) {
      console.error("Error loading user from localStorage:", err);
    }
  }, []);

  useEffect(() => {
    if (!user?.email) return;

    const fetchComplaints = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/complaints?email=${user.email}`);
        const data = await res.json();

        if (res.ok) setAllComplaints(data.reverse());
        else if (res.status === 404) setAllComplaints([]);
        else console.error("Error fetching complaints:", data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchComplaints();
  }, [user]);

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!problemText.trim()) {
      alert("Please describe the problem.");
      return;
    }

    if (!user || !user.email) {
      alert("User info not loaded yet. Please try again.");
      return;
    }

    const formData = new FormData();
    formData.append("email", user.email);
    formData.append("problemDescription", problemText);
    selectedFiles.forEach((file) => formData.append("files", file));

    try {
      const res = await fetch("http://localhost:5000/api/complaints", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitMessage("✅ Complaint submitted successfully.");
        setProblemText("");
        setSelectedFiles([]);
        setAllComplaints((prev) => [data.complaint, ...prev]);
      } else {
        setSubmitMessage(`❌ Error: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
      setSubmitMessage("❌ Error submitting complaint. Try again later.");
    }
  };

  return (
    <>
      <CustomerNavbar />
      <div className="container mt-5" style={{ fontFamily: "Segoe UI, sans-serif" }}>
        <h2 className="text-center fw-bold mb-3 text-primary">Report Your Lift Problem to Us</h2>

        <p className="text-center fs-5">
          For instant assistance, call{" "}
          <span style={{ color: "red", fontWeight: "bold" }}>998XX</span>
          <span style={{ color: "blue", fontWeight: "bold" }}>30XX5</span>.
        </p>

        <div className="mt-4 mb-5">
          <h5 className="fw-semibold text-decoration-underline text-dark">Key Points:</h5>
          <ul className="text-muted">
            <li>Provide clear and specific details of the issue.</li>
            <li>Mention when the problem started, if possible.</li>
            <li>Upload photos (optional).</li>
            <li>We'll respond within 24 hours of complaint submission.</li>
          </ul>
        </div>

        <hr className="my-5" />

        <h4 className="fw-semibold mb-3">
          Manually Tell Us About Your <span style={{ color: "red" }}>Problem</span>
        </h4>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <textarea
              className="form-control"
              rows="5"
              placeholder="Describe the issue..."
              value={problemText}
              onChange={(e) => setProblemText(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="fileUpload" className="form-label">
              Upload photo evidence (optional):
            </label>
            <input
              type="file"
              className="form-control"
              id="fileUpload"
              accept="image/*,video/*"
              multiple
              onChange={handleFileChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "green";
              e.target.style.borderColor = "green";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#007bff";
              e.target.style.borderColor = "#007bff";
            }}
          >
            Submit Complaint
          </button>

          {submitMessage && (
            <div className="mt-3 text-center fw-medium text-secondary">{submitMessage}</div>
          )}
        </form>

        {allComplaints.length > 0 && (
          <div className="mt-5">
            <h4 className="text-dark fw-semibold mb-3">Your Submitted Complaints</h4>
            <div className="table-responsive">
              <table
                className="table table-bordered table-hover"
                style={{
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease-in-out",
                }}
              >
                <thead className="table-light">
                  <tr>
                    <th>Complaint ID</th>
                    <th>Date</th>
                    <th>Details</th>
                    <th>Admin Response</th>
                  </tr>
                </thead>
                <tbody>
                  {allComplaints.map((item, index) => (
                    <tr key={index} style={{ transition: "background-color 0.3s ease" }}>
                      <td>{item.complaintId}</td>
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td>{item.problemDescription}</td>
                      <td>
                        {item.seenByAdmin ? (
                          <>
                            <span className="badge bg-success me-2">Acknowledged</span>
                            <span className="text-success">
                              AbhiNik Engineers have acknowledged your issue.
                            </span>
                          </>
                        ) : (
                          <>
                            <span style={{ fontSize: "1.3rem", marginRight: "8px" }}>🟡</span>
                            <span className="text-warning">
                              Complaint received. We’ll get back to you shortly.
                            </span>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <CustomerFooter />
    </>
  );
}

export default ReportProblem;
