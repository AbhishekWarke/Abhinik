import React from "react";
import './Team.css';

function Team() {
  return (
    <div className="container">
      <div className="row p-3 mt-5">
        <h1
          style={{ textAlign: "center", color: "#424242", fontSize: "2rem" }}
        >
          People Behind AbhiNik
        </h1>
      </div>

      <div
        className="row p-5 text-muted"
        style={{ lineHeight: "1.85", fontSize: "1.17em" }}
      >
        <div className="col-5 p-5 text-center flip-container">
          <div className="flip-card">
            <img
              className="front"
              src="/Media/black.jpg"
              alt="Mr. X"
            />
            <div className="flip-card-back">
              <img
                className="back"
                src="/Media/colorman.jpg"
                alt="Mr. X Color"
              />
            </div>
          </div>
          <h4 className="mt-5">Mr. X</h4>
          <h6>Founder & Elevator Specialist</h6>
        </div>

        <div className="paranchorTeam col-7 p-5">
          <p>
            {/* 
            Mr. Ganesh Warke brings over 25 years of rich experience in the
            elevator and escalator industry. Throughout his career, he has worked
            with several leading companies that are pioneers in the field,
            gaining deep expertise and practical knowledge across diverse projects.
            */}
            Mr. X brings decades of hands-on experience in the elevator and escalator industry, having worked across several major companies and projects in the field.
          </p>
          <p>
            {/* 
            Having successfully led and contributed to countless installations and
            site operations, his expertise forms the strong foundation of AbhiNik’s
            mission — to deliver top-quality, safe, and reliable lift solutions.
            */}
            With a proven track record in installation and site operations, Mr. X's deep technical knowledge forms the backbone of AbhiNik’s promise of reliable and quality lift solutions.
          </p>
          <p>
            {/* 
            His vision to combine professional experience with customer-first
            service led to the formation of AbhiNik, with a commitment to raise the
            standards of lift services in Indore and beyond.
            */}
            Mr. X founded AbhiNik with a vision to integrate professional expertise and customer-first service, aiming to uplift the standards of lift services across regions.
          </p>
          <p>
            Explore more about <a href="#">AbhiNik</a> and how we are shaping the future of
            elevator services.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;
