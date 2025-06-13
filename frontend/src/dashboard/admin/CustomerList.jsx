import React, { useEffect, useState } from "react";
import axios from "axios";
import { deleteContract } from "../../api/contracts";

function CustomerList() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/contracts");
        console.log(response.data); // <-- check if contractPrice is present and correct
        setContracts(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching contracts:", error);
        setError("Failed to load contracts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this contract?"
    );
    if (!confirmDelete) return;

    try {
      await deleteContract(id); // Use your reusable API function here
      setContracts((prevContracts) =>
        prevContracts.filter((contract) => contract._id !== id)
      );
      alert("Contract deleted successfully!");
    } catch (error) {
      console.error("Failed to delete contract:", error);
      alert("Failed to delete contract. Please try again.");
    }
  };

  return (
    <div className="container mt-4 mb-4">
      <h1 className="fs-2 text-center mb-4">Keep a track of your customers.</h1>

      <div
        className="row border-top p-3 text-muted"
        style={{ lineHeight: "1.65", fontSize: "1.05rem" }}
      >
        <div className="col-md-6 p-2">
          <p>
            Abhinik’s contract system offers two types of service agreements:
            Annual Maintenance Contracts (AMC) and Half Yearly Contracts. The
            AMC provides a full year of comprehensive maintenance...
          </p>
        </div>
        <div className="col-md-6 p-2">
          <p>
            Half Yearly Contracts are for shorter terms, typically six months.
            Both contract types include start/end dates and a PDF copy of the
            terms for reference.
          </p>
        </div>
      </div>

      <div className="table-responsive mt-4">
        {loading ? (
          <p className="text-center text-muted">Loading contracts...</p>
        ) : error ? (
          <p className="text-center text-danger">{error}</p>
        ) : contracts.length === 0 ? (
          <p className="text-center text-muted">
            No contracts available. Please add some from the Manage Contract
            page.
          </p>
        ) : (
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Serial No.</th>
                <th>Customer Name</th>
                <th>Email</th>
                <th>Contract Number</th>
                <th>Contract Price</th>
                <th>Start Date</th>          {/* Added */}
                <th>End Date</th>            {/* Added */}
                <th>Contract PDF</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract, index) => (
                <tr key={contract._id}>
                  <td>{index + 1}</td>
                  <td>{contract.customerName}</td>
                  <td>{contract.customerEmail}</td>
                  <td>{contract.contractNumber}</td>
                  <td>₹{contract.contractPrice}</td>
                  <td>{new Date(contract.startDate).toLocaleDateString()}</td> {/* Added */}
                  <td>{new Date(contract.endDate).toLocaleDateString()}</td>   {/* Added */}
                  <td>
                    <a
                      href={`http://localhost:5000/uploads/contracts/${contract.contractPDF}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-primary"
                    >
                      View/Download
                    </a>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(contract._id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default CustomerList;
