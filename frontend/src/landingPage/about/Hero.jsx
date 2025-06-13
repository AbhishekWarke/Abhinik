import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container">
        <div className="row mt-5 mb-5">
          <h1 className="fs-2 mt-5 mb-5 text-center">
            We modernize lift services in India. <br />
            Reliable technology, transparent contracts.
          </h1>
        </div>

        <div
          className="row border-top p-5 mt-5 text-muted"
          style={{ lineHeight: "1.85", fontSize: "1.1rem" }}
        >
          <div className="col-md-6 p-4">
            <p>
              AbhiNik was established in 2022 with a simple goal — to provide the best
              and most affordable lift and elevator solutions to buildings across the
              country.
            </p>
            <p>
              Headquartered in Indore, Madhya Pradesh, we specialize in ensuring safety,
              reliability, and transparency in every service we offer.
            </p>
            <p>
              Our platform allows building owners and admins to access real-time updates,
              review service records, raise complaints, and manage contracts all from a
              single place.
            </p>
          </div>

          <div className="paranchor col-md-6 p-4">
            <p>
              What sets us apart is our commitment to innovation and simplicity. We've
              redefined how lift service companies connect with their clients using
              modern, intuitive tools.
            </p>
            <p>
              Learn more about our <Link>story</Link>, discover the <Link>people behind AbhiNik</Link>, 
              and find out how we're reshaping the lift and elevator industry.
            </p>
            <p>
              With each passing year, we continue to expand our footprint while staying
              rooted in our mission — making lift solutions accessible, affordable, and
              effortless for everyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
