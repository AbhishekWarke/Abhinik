import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

function RightSection({
  productName,
  productDescription,
  learnMore,
  imageURL,
}) {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6 p-5 mt-5">
          <h1 className="mb-4">{productName}</h1>
          <p>{productDescription}</p>
          <div>
            <Link to="/contact" style={{ textDecoration: 'none' }}>
              Learn More →
            </Link>
          </div>
        </div>
        <div className="col-6">
          <img src={imageURL} alt={productName} style={{ maxWidth: "80%" }}/>
        </div>
      </div>
    </div>
  );
}

export default RightSection;
