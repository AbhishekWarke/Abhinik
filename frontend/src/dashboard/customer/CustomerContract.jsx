import React, { useState } from "react";
import { FaFilePdf } from "react-icons/fa";

function CustomerContract({ contract }) {
  const [showRenewMessage, setShowRenewMessage] = useState(false);

  if (!contract) {
    return (
      <p style={{ padding: "20px" }}>No contract assigned to your account.</p>
    );
  }

  const {
    customerName,
    contractNumber,
    contractType,
    startDate,
    endDate,
    numberOfServices,
    contractPDF,
  } = contract;

  const calculateDaysLeft = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = calculateDaysLeft(endDate);

  const daysColor =
    daysLeft > 300
      ? "green"
      : daysLeft > 200
      ? "orange"
      : daysLeft > 100
      ? "goldenrod"
      : "red";

  const handleRenewClick = (e) => {
    e.preventDefault();
    setShowRenewMessage(true);
  };

  return (
    <>
      <div
        style={{
          padding: "20px 20px",
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          flexWrap: "wrap",
          fontFamily: "Segoe UI, sans-serif",
          alignItems: "stretch",
        }}
      >
        {/* Left Card */}
        <div
          className="hover-card"
          style={{
            flex: "1 1 420px",
            maxWidth: "420px",
            backgroundColor: "#fff",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 8px 18px rgba(0, 0, 0, 0.12)",
            minWidth: "300px",
            display: "flex",
            flexDirection: "column",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
        >
          <img
            src="/Media/Services3.jpg"
            alt="Lift"
            style={{
              width: "100%",
              height: "180px",
              objectFit: "cover",
            }}
          />

          <div style={{ padding: "12px 16px" }}>
            <h5
              style={{ fontSize: "20px", marginBottom: "6px", color: "#2c3e50" }}
            >
              Welcome, {customerName}!
            </h5>
            <p style={{ fontSize: "15px", color: "#6c757d", marginBottom: 0 }}>
              Here are your contract details with{" "}
              <span>
                <span style={{ color: "red", fontWeight: "700" }}>Abhi</span>
                <span style={{ color: "blue", fontWeight: "700" }}>Nik</span>
              </span>
              . Stay safe and up to date with servicing!
            </p>
          </div>

          <ul style={{ margin: 0, padding: 0, listStyle: "none", flexGrow: 1 }}>
            <li style={listItemStyle}>
              <strong>Contract No:</strong> {contractNumber}
            </li>
            <li style={listItemStyle}>
              <strong>Type:</strong> {contractType}
            </li>
            <li style={listItemStyle}>
              <strong>Start Date:</strong>{" "}
              {new Date(startDate).toLocaleDateString()}
            </li>
            <li style={listItemStyle}>
              <strong>End Date:</strong> {new Date(endDate).toLocaleDateString()}
            </li>
            <li style={listItemStyle}>
              <strong>Services:</strong> {numberOfServices}
            </li>
            <li style={{ ...listItemStyle, color: daysColor }}>
              <strong>Days Left:</strong> {daysLeft}
            </li>
            {daysLeft < 30 && (
              <li
                style={{ ...listItemStyle, color: "#d9534f", fontWeight: "bold" }}
              >
                Please renew your contract soon.
              </li>
            )}
          </ul>

          <div style={{ padding: "12px 16px" }}>
            <a
              href={`http://localhost:5000/uploads/contracts/${contractPDF}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover-link"
            >
              <FaFilePdf style={{ marginRight: "6px" }} />
              View Contract PDF
            </a>
            <a href="#" onClick={handleRenewClick} className="hover-link">
              Renew Plan
            </a>
          </div>
        </div>

        {/* Right Info Panel */}
        <div
          className="hover-card"
          style={{
            flex: "1 1 300px",
            maxWidth: "350px",
            backgroundColor: "#f8f9fa",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            padding: "20px 16px",
            minWidth: "280px",
            color: "#333",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            gap: "14px",
            fontSize: "18px",
            fontWeight: "500",
            lineHeight: "1.5",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
        >
          <p style={{ fontSize: "22px", fontWeight: "700", margin: 0 }}>
            Your lift is protected with{" "}
            <span>
              <span style={{ color: "red", fontWeight: "700" }}>Abhi</span>
              <span style={{ color: "blue", fontWeight: "700" }}>Nik</span>
            </span>
            .
          </p>

          <p style={{ fontSize: "18px", margin: 0 }}>
            Regular servicing ensures maximum safety and peace of mind.
          </p>

          <p style={{ fontWeight: "700", fontSize: "24px", margin: 0 }}>
            <strong>
              <span style={{ color: daysColor }}>{daysLeft} days</span>
            </strong>{" "}
            left until contract expiry.
          </p>

          {daysLeft < 30 && (
            <p style={{ color: "#d9534f", fontWeight: "700", margin: 0 }}>
              Kindly renew your contract to ensure uninterrupted lift performance.
            </p>
          )}

          <p
            style={{
              marginTop: "20px",
              fontSize: "16px",
              fontWeight: "400",
              color: "#555",
              maxWidth: "300px",
            }}
          >
            Your contract ensures the proper working of your lift, so make sure
            your contract with{" "}
            <span>
              <span style={{ color: "red", fontWeight: "700" }}>Abhi</span>
              <span style={{ color: "blue", fontWeight: "700" }}>Nik</span>
            </span>{" "}
            stays constant.
          </p>
        </div>
      </div>

      {/* Modal Popup */}
      {showRenewMessage && (
        <div style={modalOverlayStyle} onClick={() => setShowRenewMessage(false)}>
          <div
            style={modalContentStyle}
            onClick={(e) => e.stopPropagation()}
          >
            <p style={{ fontSize: "16px", fontWeight: "500", color: "#333" }}>
              To renew your Lift AMC Contract with{" "}
              <span style={{ color: "red", fontWeight: "700" }}>Abhi</span>
              <span style={{ color: "blue", fontWeight: "700" }}>Nik</span>, please
              contact us at <strong>+91 998XX 30XX 15</strong> for a smooth and
              hassle-free renewal process.
            </p>
            <button
              onClick={() => setShowRenewMessage(false)}
              style={{
                marginTop: "20px",
                padding: "8px 16px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Hover Effects */}
      <style>{`
        .hover-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 28px rgba(0, 0, 0, 0.35);
        }

        .hover-link {
          display: inline-block;
          margin-right: 12px;
          color: #007bff;
          text-decoration: none;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .hover-link:hover {
          color: red;
        }
      `}</style>
    </>
  );
}

const listItemStyle = {
  padding: "12px 16px",
  borderTop: "1px solid #eee",
};

const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyle = {
  backgroundColor: "#fff",
  padding: "30px 24px",
  borderRadius: "12px",
  maxWidth: "500px",
  width: "90%",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
  textAlign: "center",
};

export default CustomerContract;
