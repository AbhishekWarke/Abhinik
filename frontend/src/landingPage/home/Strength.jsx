import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

function Strength() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <div className="container mt-5 mb-5" ref={ref}>
      <h2 className="text-center mb-5 fw-bold">
        💪 Strength
      </h2>
      <div className="row text-center">
        <div className="col">
          <h5 className="text-muted fw-light">Years of Experience</h5>
          <h2 className="text-dark">
            +{inView && <CountUp end={20} duration={2} />}
          </h2>
        </div>
        <div className="col">
          <h5 className="text-muted fw-light">Lifts Served</h5>
          <h2 className="text-dark">
            +{inView && <CountUp end={200} duration={2.5} />}
          </h2>
        </div>
        <div className="col">
          <h5 className="text-muted fw-light">People Moved Daily</h5>
          <h2 className="text-dark">
            +{inView && <CountUp end={2000} duration={3} separator="," />}
          </h2>
        </div>
        <div className="col">
          <h5 className="text-muted fw-light">Maintenance and Servicing Done</h5>
          <h2 className="text-dark">
            +{inView && <CountUp end={3000} duration={3} separator="," />}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Strength;
