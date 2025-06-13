import React from "react";
import { Link } from "react-router-dom";

function LeftSection({
  imageURL,
  productName,
  productDescription,
}) {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6 p-5 text-center">
          <img src={imageURL} alt={productName} style={{ maxWidth: "100%" }} />
        </div>
        <div className="col-6 p-5 mt-5">
          <h1>{productName}</h1>
          <p>{productDescription}</p>
          <div className="mt-4">
            <Link to="/contact" style={{ textDecoration: "none" }}>
              Contact Us →
            </Link>
            <Link to="/contact" style={{ marginLeft: "50px", textDecoration: "none" }}>
              Learn More →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;
