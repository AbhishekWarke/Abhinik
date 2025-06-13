import React from "react";
import { Link } from "react-router-dom";

function Stats() {
  return (
    <div className="container p-3">
      <div className="row p-5">
        <div className="col-8 p-5">
          <h1 className="fs-2 mb-5">Reliable Elevator Solutions</h1>

          <h2 className="fs-4">Customer-first approach</h2>
          <p className="text-muted">
            Thousands of satisfied clients rely on AbhiNik for seamless elevator maintenance, installation, and support services.
          </p>

          <h2 className="fs-4">Transparent & Reliable</h2>
          <p className="text-muted">
            No hidden charges or gimmicks. Just honest service and on-time support for all your lift needs.
          </p>

          <h2 className="fs-4">Complete Lift Ecosystem</h2>
          <p className="text-muted">
            From installation to annual contracts, service history to complaint resolution — manage everything in one place.
          </p>

          <h2 className="fs-4">Safety is Our Priority</h2>
          <p className="text-muted">
            With regular inspections, real-time updates, and responsive engineers, we ensure your lift journey stays safe and secure.
          </p>
        </div>

        <div className="col-4 p-5 text-center">
          <img src="/Media/EL2.jpg" style={{ width: "97%", borderRadius: "20%"}} alt="AbhiNik Ecosystem"  />
          <div className="text-center mt-3">
              <Link to='/services' style={{ textDecoration: "none" }}>
              Explore Our Services{" "}</Link>
              <i className="fa fa-long-arrow-right" aria-hidden="true"></i>            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
