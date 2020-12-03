import Carousel from "react-bootstrap/Carousel";
import React, { Component } from "react";



export class BootstrapCarousel extends Component {
  render() {
    return (
      
        
        <div className="container-fluid" style={{paddingLeft:"-15px",paddingRight:"-15px"}}>
          <Carousel>
            <Carousel.Item style={{ height: "500px" }}>
              <img
                style={{ height: "100%" }}
                className="d-block w-100"
                src={"assets/img/cattle2.jpg"}
              />

              <Carousel.Caption>
                <h1>We Are Your Land Proffessional Farmers</h1>
                <h5>Land Managment And Agricultural Services</h5>

              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item style={{ height: "500px" }}>
              <img
                style={{ height: "100%" }}
                className="d-block w-100"
                src={"assets/img/agriculture.jpg"}
              />

              <Carousel.Caption>
              <h1>We Are Your Land Proffessional Farmers</h1>
                <h5>Land  Managment  And  Agricultural  Services</h5>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item style={{ height: "500px" }}>
              <img
                style={{ height: "100%" }}
                className="d-block w-100"
                src={"assets/img/AgriTorism.jpg"}
              />

              <Carousel.Caption>
              <h1>We Are Your Land Proffessional Farmers</h1>
                <h5>Land Managment And Agricultural Services</h5>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          </div>
      
    );
  }
}

export default BootstrapCarousel;
