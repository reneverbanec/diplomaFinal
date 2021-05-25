import React from "react";
import {
  MDBContainer,
  MDBFooter,
  MDBRow,
  MDBIcon,
  MDBCol,
  MDBTypography,
} from "mdbreact";

const Footer = () => {
  return (
    <MDBFooter color="indigo darken-1" className="font-small  pt-4 mt-4">
      <MDBContainer fluid className="text-center">
        <MDBRow center>
          <MDBCol md="6">
            <MDBTypography tag="h3" variant="h3" className="white-text">
              Sledite nam tudi na socialnih omrežjih
            </MDBTypography>
            <hr />
            <ul>
              <li className="list-unstyled">
                {" "}
                <MDBTypography tag="h5" variant="h5" className="white-text">
                  <MDBIcon fab icon="facebook" className="mr-2" />
                  <a href="https://www.facebook.com/viniskamalonogometnaliga/">
                    {" "}
                    Viniška Malo Nogometna Liga{" "}
                  </a>
                </MDBTypography>
              </li>
              <li className="list-unstyled">
                {" "}
                <MDBTypography tag="h5" variant="h5" className="white-text">
                  <MDBIcon fab icon="instagram" className="mr-2" />{" "}
                  <a href="https://www.instagram.com/viniskarepublika/">
                    viniskarepublika
                  </a>
                </MDBTypography>
              </li>
              <li className="list-unstyled">
                {" "}
                <MDBTypography tag="h5" variant="h5" className="white-text">
                  <MDBIcon fab icon="facebook" className="mr-2" />
                  <a href="https://www.facebook.com/stdvinica/">
                    Športno Turistično Društvo Vinica
                  </a>
                </MDBTypography>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright:{" "}
          <a
            href="http://www.facebook.com/stdvinica"
            rel="noreferrer"
            target="_blank"
          >
            {" "}
            Rene Verbanec{" "}
          </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default Footer;
