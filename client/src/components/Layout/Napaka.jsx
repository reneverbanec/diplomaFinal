import React from "react";
import {
  MDBContainer,
  MDBTypography,
  MDBEdgeHeader,
  MDBFreeBird,
  MDBCard,
  MDBCardHeader,
  MDBAnimation,
  MDBCardBody,
} from "mdbreact";
import { Link } from "react-router-dom";

const Napaka = () => {
  return (
    <MDBContainer fluid className="napaka">
      <MDBEdgeHeader color="indigo darken-3"></MDBEdgeHeader>
      <MDBAnimation reveal type="zoomIn">
        <MDBFreeBird>
          <MDBCard className="z-depth-5">
            <MDBCardHeader>
              <MDBTypography tag="h1" variant="h1" className="text-center m-5">
                404 Stran ne obstaja
              </MDBTypography>
            </MDBCardHeader>

            <MDBCardBody>
              <MDBTypography tag="h3" variant="h3" className="text-center m-5">
                <Link className="black-text" to="/">
                  Vrni se na domačo stran
                </Link>
              </MDBTypography>
            </MDBCardBody>
          </MDBCard>
        </MDBFreeBird>
      </MDBAnimation>
    </MDBContainer>
  );
};

export default Napaka;
