import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="container p-5">
      <div className="row text-center">
        <div className="col">
          <video
            src="/Media/LiftFinall.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="mb-3"
            style={{ width: "100%", height: "65%", objectFit: "cover" }}
          />
          <h1 className="mt-5 fs-2">Secure Your Elevators with AbhiNik</h1>
          <p>
            Your trusted partner for lift maintenance, repairing and breakdown.
          </p>
          <br />
           <Link to="/login">
         <button
            className="p-2 btn btn-primary fs-5"
            style={{ width: "21%", margin: "0 auto" }}
          >
             Get Started
          </button></Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
