import React from "react";
import BootstrapCarousel from "../components/Carousel/BootstrapCarousel";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactPlayer from "react-player";

const Home = () => {
  return (
    <div>
      <BootstrapCarousel></BootstrapCarousel>
      <div className="container-fluid">
        <div
          className="row-sm-12"
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            backgroundColor: "#9DC88D",
          }}
        >
          <div
            className="col-sm-6"
            style={{
              height: "360px",
              width: "90%",
              borderRadius: " 6px",
              margin: "40px 20px 30px 0px",
              fontSize: "20px",
            }}
          ></div>

          <div
            className="col-sm-6"
            style={{
              height: "360px",
              width: "90%",
              paddingTop: "80px",
              margin: "40px 20px 30px 0px",
              lineHeight: "20px",
              fontSize: "20px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            <h1>Our Vision</h1>
            <h3>
              We are committed to sustainably cultivate abandoned lands and
              empower the food sector to be a self-sufficient and an exporting
              sector
            </h3>
          </div>
        </div>
        <div className="row"></div>
      </div>
    </div>
  );
};

export default Home;
