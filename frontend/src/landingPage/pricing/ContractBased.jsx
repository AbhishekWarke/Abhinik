import React from "react";

function ContractBased() {
  return (
    <>
      <section className="contract-section">
        <div className="container contract-inner">
          <span className="contract-badge">Long-Term Protection</span>

          <h2 className="contract-title">
            Contract-Based Elevator Services
          </h2>

          <p className="contract-text">
            AbhiNik offers comprehensive contract-based elevator services through
            Annual Maintenance Contracts (AMC), with optional half-yearly plans
            based on customer preference. These contracts are designed to deliver
            consistent performance, long-term reliability, and reduced operational
            risks by ensuring your elevators receive regular, expert care throughout
            the year.
          </p>

          <p className="contract-text">
            AMC pricing depends on factors such as elevator type, capacity, usage,
            and technical specifications. To maintain complete transparency, our
            team conducts a detailed inspection before finalizing any contract.
            This assessment helps identify existing wear or risks, ensuring accurate
            pricing and enabling us to deliver a maintenance plan tailored to your
            lift’s exact requirements — without hidden costs or surprises.
          </p>
        </div>
      </section>

      {/* =========================
          CONTRACT BASED STYLES
      ========================== */}
      <style>{`
        .contract-section {
          background-color: #ffffff;
          padding: 4.5rem 0;
          border-top: 1px solid #e5e7eb;
        }

        .contract-inner {
          max-width: 820px;
          margin: 0 auto;
        }

        .contract-badge {
          display: inline-block;
          background-color: #f1f5f9;
          color: #0d6efd;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
          margin-bottom: 1.2rem;
        }

        .contract-title {
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 2rem;
          color: #212529;
        }

        .contract-text {
          font-size: 1.15rem;
          font-weight: 300;
          line-height: 1.8;
          color: #555;
          text-align: justify;
          margin-bottom: 1.6rem;
        }

        /* =========================
           MOBILE RESPONSIVE
        ========================== */
        @media (max-width: 576px) {
          .contract-section {
            padding: 3rem 0;
          }

          .contract-title {
            font-size: 1.6rem;
          }

          .contract-text {
            font-size: 1rem;
            line-height: 1.7;
          }
        }
      `}</style>
    </>
  );
}

export default ContractBased;
