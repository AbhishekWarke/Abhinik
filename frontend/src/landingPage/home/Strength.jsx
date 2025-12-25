import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

function Strength() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <div className="container mt-5 mb-5 strength-container" ref={ref}>
      <h2 className="text-center mb-5 fw-bold">💪 Strength</h2>

      <div className="row justify-content-center">
        <div className="col-6 col-md-3 strength-item">
          <div className="strength-card">
            <h6 className="text-muted fw-light">Years of Experience</h6>
            <h2 className="text-dark">
              +{inView && <CountUp end={20} duration={2} />}
            </h2>
          </div>
        </div>

        <div className="col-6 col-md-3 strength-item">
          <div className="strength-card">
            <h6 className="text-muted fw-light">Lifts Served</h6>
            <h2 className="text-dark">
              +{inView && <CountUp end={200} duration={2.5} />}
            </h2>
          </div>
        </div>

        <div className="col-6 col-md-3 strength-item">
          <div className="strength-card">
            <h6 className="text-muted fw-light">People Moved Daily</h6>
            <h2 className="text-dark">
              +{inView && <CountUp end={2000} duration={3} separator="," />}
            </h2>
          </div>
        </div>

        <div className="col-6 col-md-3 strength-item">
          <div className="strength-card">
            <h6 className="text-muted fw-light">
              Maintenance & Servicing Done
            </h6>
            <h2 className="text-dark">
              +{inView && <CountUp end={3000} duration={3} separator="," />}
            </h2>
          </div>
        </div>
      </div>

      {/* 🎨 UI IMPROVEMENTS */}
      <style>{`
        .strength-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 1.5rem 1rem;
          text-align: center;
          height: 100%;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease;
        }

        .strength-card:hover {
          transform: translateY(-4px);
        }

        .strength-item {
          margin-bottom: 1.5rem;
        }

        /* Mobile fine-tuning */
        @media (max-width: 576px) {
          .strength-card h6 {
            font-size: 0.9rem;
            min-height: 40px; /* keeps cards equal height */
          }

          .strength-card h2 {
            font-size: 1.6rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Strength;
