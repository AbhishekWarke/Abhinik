import React from "react";

function Awards() {
  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-6 mt-5">
          <img
            src="/Media/award3.jpg"
            alt="Trusted Service"
            style={{
              width: "50%",
              height: "79%",
              objectFit: "cover",
              borderRadius: "22%",
            }}
          />
        </div>

        <div className="col-6 mt-5">
          <h1>One of the most trusted in Central India</h1>
          <br />
          <p>
            With hundreds of satisfied clients across Central India, AbhiNik has
            earned a reputation for delivering top-notch elevator solutions —
            from installation to service support.
          </p>

          <div className="row mt-5">
            <div className="col-6">
              <ul>
                <li>
                  <p>Residential Lift Installations</p>
                </li>
                <li>
                  <p>Annual Maintenance Contracts</p>
                </li>
                <li>
                  <p>Emergency Repair Services</p>
                </li>
              </ul>
            </div>

            <div className="col-6 ">
              <ul>
                <li>
                  <p>Modernization & Upgrades</p>
                </li>
                <li>
                  <p>Safety Inspections</p>
                </li>
                <li>
                  <p>24×7 Customer Support</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Awards;
