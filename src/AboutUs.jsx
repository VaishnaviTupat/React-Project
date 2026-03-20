import React from "react";
import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About VS Mart</h1>
        <p>Your trusted shopping partner</p>
      </div>

      <div className="about-content">
        <div className="about-card">
          <h3>Our Mission</h3>
          <p>
            To provide high-quality products at affordable prices while ensuring
            excellent customer service.
          </p>
        </div>

        <div className="about-card">
          <h3>Our Vision</h3>
          <p>
            To become a trusted and leading retail store known for quality,
            value, and customer satisfaction.
          </p>
        </div>

        <div className="about-card">
          <h3>Why Choose Us?</h3>
          <p>
            ✔ Affordable Prices <br />
            ✔ Trusted Service <br />
            ✔ Quality Products
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
