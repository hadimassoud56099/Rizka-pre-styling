import React from "react";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Signin/AboutUs.css";
import Jumbotron from "react-bootstrap/Jumbotron";

const AboutUs = () => {
  return (
    <div className="container-fluid">
      <div
        className="jumbotron"
        style={{
          height: "450px",
          backgroundImage: "url(assets/img/AboutUs.jpg)",
          backgroundSize: "100% 100%",
          textAlign: "center",
        }}
      >
        <div
          className="row"
          style={{ height: "100px", width: "1300px", textAlign: "center" }}
        >
          <div
            className="col-sm-12"
            style={{
              textAlign: "center",
              paddingTop: "100px",
              color: "white",
              fontSize: "70px",
              fontWeight: "bold",
            }}
          >
            About Us
          </div>
        </div>
        <div className="row"></div>
      </div>
    </div>
  );
};

export default AboutUs;
