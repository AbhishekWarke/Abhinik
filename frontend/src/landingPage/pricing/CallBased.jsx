import React from "react";

function CallBased() {
  return (
    <>
      <section className="callbased-section">
        <div className="container callbased-inner">
          <span className="callbased-badge">Flexible & On-Demand</span>

          <h2 className="callbased-title">
            Call-Based Elevator Services
          </h2>

          <p className="callbased-text">
            AbhiNik Elevators provides reliable call-based elevator services
            delivered directly to your location. Pricing typically ranges between
            <strong> ₹2,000 </strong> and <strong> ₹2,500 </strong>, depending on
            your building’s location and service requirements. Our trained
            technicians ensure quick response times, accurate diagnostics, and
            cost-effective solutions tailored to your needs.
          </p>

          <p className="callbased-text">
            Whether it’s a minor repair, technical inspection, or urgent
            troubleshooting, our call-based services offer fast and efficient
            resolution with minimal disruption. Flexible pricing ensures fair
            service across residential and commercial properties while
            maintaining high service standards.
          </p>

          <p className="callbased-text">
            We believe elevator maintenance should be transparent, accessible,
            and stress-free. Contact AbhiNik today to schedule a service visit or
            receive a customized quote — your safety, uptime, and satisfaction
            remain our top priorities.
          </p>
        </div>
      </section>

      {/* =========================
          CALL BASED STYLES
      ========================== */}
      <style>{`
        .callbased-section {
          background-color: #ffffff;
          padding: 4.5rem 0;
          border-top: 1px solid #e5e7eb;
        }

        .callbased-inner {
          max-width: 820px;
          margin: 0 auto;
        }

        .callbased-badge {
          display: inline-block;
          background-color: #f1f5f9;
          color: #0d6efd;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
          margin-bottom: 1.2rem;
        }

        .callbased-title {
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 2rem;
          color: #212529;
        }

        .callbased-text {
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
          .callbased-section {
            padding: 3rem 0;
          }

          .callbased-title {
            font-size: 1.6rem;
          }

          .callbased-text {
            font-size: 1rem;
            line-height: 1.7;
          }
        }
      `}</style>
    </>
  );
}

export default CallBased;
